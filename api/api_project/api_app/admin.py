from django.contrib import admin
from .models import stationLocation, userData, stationImage
# Register your models here.

admin.site.register(stationLocation)
admin.site.register(userData)
admin.site.register(stationImage)