# Generated by Django 5.0.4 on 2024-05-27 14:22

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='carData',
            fields=[
                ('carDataId', models.CharField(default='', max_length=100, primary_key=True, serialize=False, unique=True)),
                ('carBrand', models.CharField(max_length=100)),
                ('carModel', models.CharField(max_length=100)),
                ('carImage', models.URLField()),
            ],
        ),
        migrations.CreateModel(
            name='carHistory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('noteId', models.CharField(max_length=100)),
                ('carId', models.CharField(max_length=100)),
                ('date', models.DateField()),
                ('amount', models.FloatField()),
                ('liters', models.FloatField()),
                ('gastype', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='carProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('carId', models.CharField(max_length=100)),
                ('carBrand', models.CharField(max_length=100)),
                ('carModel', models.CharField(max_length=100)),
                ('carPlateNumber', models.CharField(max_length=100)),
                ('carDescription', models.CharField(max_length=100)),
                ('carDataId', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='stationImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('station', models.CharField(max_length=100)),
                ('image', models.URLField()),
            ],
        ),
        migrations.CreateModel(
            name='stationLocation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('station', models.CharField(max_length=100)),
                ('latitude', models.FloatField()),
                ('longitude', models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name='userData',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('value', models.CharField(max_length=100)),
                ('label', models.CharField(max_length=100)),
                ('image', models.URLField()),
                ('data', models.JSONField()),
                ('favorite_station', models.JSONField()),
            ],
        ),
    ]
