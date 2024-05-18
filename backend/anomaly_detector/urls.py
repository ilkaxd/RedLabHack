from django.urls import path

from anomaly_detector import views


app_name = 'anomaly_detector'

urlpatterns = [
    # Оценка текущего времененного ряда (GET)
    path('', views.get_anomalies, name='get_anomalies'),
]