import os
import csv

import pandas as pd

from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import HttpResponse

from anomaly_detector.serializers import DashboardSerializer
from anomaly_detector.utils import make_prediction


@api_view(['GET'])
def get_anomalies(request):
    '''
    Выгрузка текущих значений аномалий
    '''
    # Подгружаем входные данные
    file_path = os.path.join('.', 'data.csv')
    inputs = pd.read_csv(
        file_path,
        sep='\t',
        parse_dates=True,
        date_format='%d.%m.%Y',
        index_col=0
    )
    # Оцениваем аномалии
    Y = [make_prediction(x) for x in inputs]
    #     'Y_distribution': np.histogram(Y)

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


@api_view(['POST'])
def import_data(request):
    '''
    Загружаем данные
    '''
    # request.FIlES
    return Response({'good': True})


@api_view(['POST'])
def predict(requests):
    '''
    Прогнозируем изменение параметра
    '''
    return Response({'good': 'true'})
