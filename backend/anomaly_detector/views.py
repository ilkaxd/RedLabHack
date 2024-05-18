from rest_framework.decorators import api_view
from rest_framework.response import Response

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
