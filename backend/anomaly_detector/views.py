import csv

from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import HttpResponse

import numpy as np

X = np.random.randint(0, 100, size=(15, 10))
Y = np.random.randint(0, 100, size=15)


@api_view(['GET'])
def get_anomalies(request):
    '''
    Выгрузка текущих значений аномалий
    '''
    return Response({
        'X': X,
        'Y': Y,
        'Y_distribution': np.histogram(Y)
    })


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
