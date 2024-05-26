import os
import csv

import pandas as pd

from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import HttpResponse

from anomaly_detector.serializers import DashboardSerializer
from anomaly_detector.utils import make_prediction


def load_data():
    '''
    Инициализируем данные
    '''
    data = pd.read_csv('metrics_collector.tsv', sep='\t', low_memory=False)
    data.columns = [
        'account_id',
        'name',
        'point',
        'call_count',
        'total_call_time',
        'total_exclusive_time',
        'min_call_time', 'max_call_time',
        'sum_of_squares',
        'instances',
        'language',
        'app_name',
        'app_id',
        'scope',
        'host',
        'display_host',
        'pid',
        'agent_version',
        'labels'
    ]
    data.point = pd.to_datetime(data.point)

    # Генерируем синтетику
    make_synthetic_metrics(data)
    # Определяем основные параметры
    return X_generator(data, [
        'Throughput',
        'WebResponse',
        'APDEX'
    ])


def make_synthetic_metrics(X):
    '''
    Инициируемся метриками от организаторов:
        - WebResponse - время ответа сервиса на внешний http-запрос
        - Throughput - пропускная способность сервиса (зарос/мин)
        - APDEX - синтетический показатель здоровья сервера [0 (болеет) - 1(здоров)]
        - Error - процент ошибок в обработанных запросах
    '''
    X['WebResponse'] = None
    X['Throughput'] = None
    X['APDEX'] = None
    X['Error'] = None

    # Определяем требуемые индексы
    dispatcher_index = X[(X['name'] == 'HttpDispatcher') & (X['scope'].isna())].index
    apdex_index = X[(X['name'] == 'Apdex') & (X['scope'].isna())].index
    # errors_index = X[(X['name'] == 'Errors/allWeb') & (data['scope'].isna())].index

    # вычисляем метрики
    X.loc[dispatcher_index, 'WebResponse'] = X.loc[dispatcher_index, 'total_call_time'] / X.loc[dispatcher_index, 'call_count']
    X.loc[dispatcher_index, 'Throughput'] = X.loc[dispatcher_index, 'call_count']
    X.loc[apdex_index, 'APDEX'] = (
        (X.loc[apdex_index, 'call_count'] + X.loc[apdex_index, 'total_call_time'] / 2)
        /
        (X.loc[apdex_index, 'call_count'] + X.loc[apdex_index, 'total_call_time'] + X.loc[apdex_index, 'total_exclusive_time'])
    )
    # X.loc[dispatcher_index, 'Error'] = X.loc[errors_index, 'call_count'] / X.loc[dispatcher_index, 'call_count']


def X_generator(data, columns):
    '''
    Формируем данные для обучения
    '''
    result = []
    for column in columns:
        X = data[['point', column]]
        result.append(X.dropna().set_index('point').sort_index())
    return pd.concat(result, axis=1)


data = load_data()


@api_view(['GET'])
def get_anomalies(request):
    '''
    Выгрузка текущих значений аномалий
    '''
    global data
    # Подгружаем параметры
    tag = request.GET.get('tag_name', '')
    start = request.GET.get('start', None)
    end = request.GET.get('end', None)

    # Подгружаем входные данные
    inputs = data[start:end]

    # Оцениваем аномалии
    Y = []
    for i in range(inputs.shape[0]):
        prediction = make_prediction(inputs.iloc[i], tag)
        Y.append(prediction)

    # Формируем ответ
    serializer = DashboardSerializer({
        'columns': inputs.columns.to_list(),
        'indexes': inputs.index.tolist(),
        'X': inputs.values,
        'Y': Y
    })

    return Response(serializer.data)


@api_view(['GET'])
def export_result(request):
    '''
    Выгружаем csv файл с результатами
    '''
    response = HttpResponse(
        content_type='text/csv',
        headers={
            'Content-Disposition': 'attachment; filename="result.csv"'
        },
    )

    writer = csv.writer(response, delimiter=';')
    writer.writerow(["First row", "Foo", "Bar", "Baz"])
    return response
