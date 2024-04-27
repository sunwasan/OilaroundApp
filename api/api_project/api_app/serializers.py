from rest_framework import serializers
from .models import stationLocation, userData, stationImage

class stationLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = stationLocation
        fields = "__all__"
        
class userDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = userData
        fields = "__all__"
        
class stationImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = stationImage
        fields = "__all__"