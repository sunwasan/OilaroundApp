from django.shortcuts import render
from rest_framework import viewsets

from .models import stationLocation
from .serializers import stationLocationSerializer
# Create your views here.

class stationLocationView(viewsets.ModelViewSet):
    queryset = stationLocation.objects.all()
    serializer_class = stationLocationSerializer