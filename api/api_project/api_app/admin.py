from django.contrib import admin
from .models import stationLocation, userData, stationImage, carProfile, carData, carHistory
# Register your models here.

admin.site.register(stationLocation)
admin.site.register(userData)
admin.site.register(stationImage)
admin.site.register(carProfile)
admin.site.register(carData)
admin.site.register(carHistory)