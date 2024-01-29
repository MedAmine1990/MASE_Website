from django.db import models
from django.db.models import *
# Create your models here.

class carsetup(models.Model):
    car=models.CharField(max_length=50, null=False)
    track=models.CharField(max_length=50, null=False)
    qualilaptime=models.CharField(max_length=20, null=True)
    racelaptime=models.CharField(max_length=20, null=True)
    thumbnailName=models.CharField(max_length=50, null=False)
    interests=models.IntegerField(default=0, null=False)
    setsbaseLink=CharField(max_length=100, null=True)
    popometerLink=CharField(max_length=100, null=True)
    published=BooleanField(null=False)

class setupnote(models.Model):
    setup=models.ForeignKey(carsetup, on_delete=models.CASCADE)
    noteName=models.CharField(max_length=50, null= False, unique= True)
    trackLocation=models.CharField(max_length=50, null= False, default="all track")
    note=models.TextField(null= False)
    thumbnailName=models.CharField(max_length=100, null= True)
    videopath=models.CharField(max_length=100, null= True)
    risks=models.TextField(null= True)
