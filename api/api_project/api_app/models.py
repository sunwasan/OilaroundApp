from django.db import models

# Create your models here.

class stationLocation(models.Model):
    station = models.CharField(max_length=100)
    latitude = models.FloatField()
    longitude = models.FloatField()