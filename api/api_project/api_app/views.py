from django.shortcuts import render
from rest_framework import viewsets

from .models import stationLocation, userData, stationImage
from .serializers import stationLocationSerializer, userDataSerializer, stationImageSerializer
# Create your views here.

class stationLocationView(viewsets.ModelViewSet):
    queryset = stationLocation.objects.all()
    serializer_class = stationLocationSerializer
    
class userDataView(viewsets.ModelViewSet):
    queryset = userData.objects.all()
    serializer_class = userDataSerializer
    
class stationImageView(viewsets.ModelViewSet):
    queryset = stationImage.objects.all()
    serializer_class = stationImageSerializer