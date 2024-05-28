from django.shortcuts import render
from rest_framework import viewsets
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpResponse
from .models import carHistory
from .serializers import carHistorySerializer
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.parsers import JSONParser

from .models import stationLocation, userData, stationImage, carProfile, carData, carHistory
from .serializers import stationLocationSerializer, userDataSerializer, stationImageSerializer, carProfileSerializer, carDataSerializer, carHistorySerializer
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

# if /carprofile/ endpoint is called, it will return all car profiles
# if /carprofile/{carId} endpoint is called, it will return the car profile with the given carId
class carProfileView(viewsets.ModelViewSet):
    queryset = carProfile.objects.all()
    serializer_class = carProfileSerializer
    lookup_field = 'carId'  # This is the field that will be used to filter the data
    
    
    
    
    
# Receive carId as a parameter endpoint like this: /cardata/{carId}
class carDataView(viewsets.ModelViewSet):
    queryset = carData.objects.all()
    serializer_class = carDataSerializer
    lookup_field = 'carDataId'
    

@csrf_exempt
def add_car_history(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = carHistorySerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
    
    else:
        return JsonResponse({"error": "Method not allowed"}, status=405)
    
@csrf_exempt
def get_car_history(request, car_id):
   if request.method == 'GET':
        car_history = carHistory.objects.filter(carId=car_id)
        print(car_history)
        serializer = carHistorySerializer(car_history, many=True)
        return JsonResponse(serializer.data, safe=False)
    

    
@csrf_exempt
def remove_car_history(request, car_id, date, note_id = None):

    if request.method == 'DELETE':
        if note_id:
            try:
                car_history = carHistory.objects.get(carId=car_id, date=date, noteId=note_id)
            except ObjectDoesNotExist:
                return JsonResponse({"error": "Car history not found"}, status=404)
            car_history.delete()
            return JsonResponse({"message": "Car history deleted successfully"}, status=204)
        else:
            # delete all data in the given date (can have multiple notes in a day)
            car_history = carHistory.objects.filter(carId=car_id, date=date)
            car_history.delete()
            return JsonResponse({"message": "Car history deleted successfully"}, status=204)
    
    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        try:
            car_history = carHistory.objects.get(carId=car_id, date=date, noteId=note_id)
        except ObjectDoesNotExist:
            return JsonResponse({"error": "Car history not found"}, status=404)
        serializer = carHistorySerializer(car_history, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)