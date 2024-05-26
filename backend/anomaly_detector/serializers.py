from rest_framework import serializers


class AnomalyDetectionSerializer(serializers.Serializer):
    value = serializers.FloatField()
    is_anomaly = serializers.BooleanField()
    probability = serializers.FloatField()


class DashboardSerializer(serializers.Serializer):
    columns = serializers.ListField(child=serializers.CharField())
    indexes = serializers.ListField(
        child=serializers.DateTimeField(format='%d.%m.%Y %H:%M:%S')
    )
    X = serializers.ListField(
        child=serializers.ListField(
            child=serializers.FloatField()
        )
    )
    Y = serializers.ListField(
        child=AnomalyDetectionSerializer()
    )
