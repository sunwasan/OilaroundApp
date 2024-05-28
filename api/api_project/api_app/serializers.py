from rest_framework import serializers
from .models import stationLocation, userData, stationImage, carProfile, carData, carHistory

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

class carProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = carProfile
        fields = "__all__"
    
class carDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = carData
        fields = "__all__"
        
class carHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = carHistory
        fields = "__all__"