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

class carData(models.Model):
    carDataId = models.CharField(max_length=100, primary_key=True, unique=True, null=False, blank=False, default="")
    carBrand = models.CharField(max_length=100)
    carModel = models.CharField(max_length=100)
    carImage = models.URLField()
    
class carProfile(models.Model):
    carId = models.CharField(max_length=100)
    carBrand = models.CharField(max_length=100)
    carModel = models.CharField(max_length=100)
    carPlateNumber = models.CharField(max_length=100)
    carDescription = models.CharField(max_length=100)
    carDataId = models.CharField(max_length=100)
    
class carHistory(models.Model):
    noteId = models.CharField(max_length=100)
    carId = models.CharField(max_length=100)
    date = models.DateField()
    amount = models.FloatField()
    liters = models.FloatField()
    gastype = models.CharField(max_length=100)
    
    def as_json(self):
        return dict(
            noteId = self.noteId,
            carId=self.carId,
            date=self.date,
            amount=self.amount,
            liters=self.liters,
            gastype=self.gastype
        )