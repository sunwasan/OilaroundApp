from rest_framework import serializers
from .models import stationLocation

class stationLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = stationLocation
        fields = "__all__"
        