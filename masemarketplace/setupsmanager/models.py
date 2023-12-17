from django.db import models

# Create your models here.

class carsetup(models.Model):
    car=models.CharField(max_length=50)
    track=models.CharField(max_length=50)
    qualilaptime=models.CharField(max_length=20, null=True)
    racelaptime=models.CharField(max_lenght=20, null=True)
    thumbnailName=models.CharField(max_lenght=50)
    interests=models.IntegerField(default=0)
    setsbaseLink=CharField(max_length=100, null=True)
    popometerLink=CharField(max_length=100, null=True)

class setupnote(models.Model):
    noteName=models.CharField(max_length=50, null= False)
    note=models.TextField(null= False)
    thumbnailName=models.CharField(max_lenght=50)

