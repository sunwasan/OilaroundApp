from django.db import models

# Create your models here.

class stationLocation(models.Model):
    station = models.CharField(max_length=100)
    latitude = models.FloatField()
    longitude = models.FloatField()
    
class userData(models.Model):
    value = models.CharField(max_length=100)
    label = models.CharField(max_length=100)
    image = models.URLField()
    data = models.JSONField()
    favorite_station = models.JSONField()

class stationImage(models.Model):
    station = models.CharField(max_length=100)
    image = models.URLField()