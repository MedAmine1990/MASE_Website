from django.shortcuts import render
from rest_framework.views import APIView
from .models import *
# Create your views here.

class CreateSetup(APIView):
    def post(self, request, format=None):
        _car=None
        _track=None
        _qualilaptime=None
        _racelaptime=None
        _thumbnailName=None
        _interests=None
        _setsbaseLink=None
        _popometerLink=None
        _published=None
        try:
            _car=request.data["car"]
            _track=request.data["track"]
            _qualilaptime=request.data["qualilaptime"]
            _racelaptime=request.data["racelaptime"]
            _thumbnailName=request.data["thumbnailName"]
            _interests=request.data["interests"]
            _setsbaseLink=request.data["setsbaseLink"]
            _popometerLink=request.data["popometerLink"]
            _published=request.data["published"]
        except Exception as error:
            print("request error:", str(error))
        try:
            _carsetup=carsetup(car=_car
            track=_track
            qualilaptime=_qualilaptime
            racelaptime=_racelaptime
            thumbnailName=_thumbnailName
            interests=_interests
            setsbaseLink=_setsbaseLink
            popometerLink=_popometerLink
            published=_published)
            _carsetup.save()
        except Exception as error:
            print("carsetup save error:", str(error))
        

class UpdateSetup(APIView):
    def post(self, request, format=None):
        try:
            _car=request.data["car"]
            _track=request.data["track"]
            _qualilaptime=request.data["qualilaptime"]
            _racelaptime=request.data["racelaptime"]
            _thumbnailName=request.data["thumbnailName"]
            _interests=request.data["interests"]
            _setsbaseLink=request.data["setsbaseLink"]
            _popometerLink=request.data["popometerLink"]
            _published=request.data["published"]
        except Exception as error:
            print("request error:", str(error))

class DeleteSetup(APIView):
    def post(self, request, format=None):
        try:
            _car=request.data["car"]
            _track=request.data["track"]
            _qualilaptime=request.data["qualilaptime"]
            _racelaptime=request.data["racelaptime"]
            _thumbnailName=request.data["thumbnailName"]
            _interests=request.data["interests"]
            _setsbaseLink=request.data["setsbaseLink"]
            _popometerLink=request.data["popometerLink"]
            _published=request.data["published"]
        except Exception as error:
            print("request error:", str(error))

class GetSetup(APIView):
    def get(self, request, format=None):
        try:
            continue
        except Exception as error:
            print("request error:", str(error))

class GetAllSetups(APIView):
    def get(self, request, format=None):
        try:
            continue
        except Exception as error:
            print("request error:", str(error))



