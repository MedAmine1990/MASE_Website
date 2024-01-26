from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
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
            return Response({"request error": str(error)})
        try:
            _carsetup=carsetup(car=_car,
            track=_track,
            qualilaptime=_qualilaptime,
            racelaptime=_racelaptime,
            thumbnailName=_thumbnailName,
            interests=_interests,
            setsbaseLink=_setsbaseLink,
            popometerLink=_popometerLink,
            published=_published)
            _carsetup.save()
            return Response({"request success": "Setup information saved."})
        except Exception as error:
            return Response({"request error": str(error)})
        

class UpdateSetup(APIView):
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
            return Response({"request error": str(error)})
        try:
            check_cartrack_combo=carsetup.objects.filter(car=_car, track=_track)
            if not check_cartrack_combo:
                return Response({"request error": "This car track combo does not exist."})
            else:
                carsetup.objects.filter(car=_car, track=_track).update(
                    car=_car,
                    track=_track,
                    qualilaptime=_qualilaptime,
                    racelaptime=_racelaptime,
                    thumbnailName=_thumbnailName,
                    interests=_interests,
                    setsbaseLink=_setsbaseLink,
                    popometerLink=_popometerLink,
                    published=_published
                )
                return Response({"request success": "Setup information updated."})
        except Exception as error:
            return Response({"request error": str(error)})

class DeleteSetup(APIView):
    def post(self, request, format=None):
        try:
            _car=request.data["car"]
            _track=request.data["track"]
        except Exception as error:
            return Response({"request error": str(error)})
        try:
            check_cartrack_combo=carsetup.objects.filter(car=_car, track=_track)
            if not check_cartrack_combo:
                return Response({"request error": "This car track combo does not exist."})
            else:
                carsetup.objects.filter(car=_car, track=_track).delete()
        except Exception as error:
            return Response({"request error": str(error)})

class GetSetup(APIView):
    def get(self, request, format=None):
        try:
            _car=request.data["car"]
            _track=request.data["track"]
        except Exception as error:
            return Response({"request error": str(error)})
        try:
            _carsetup=carsetup.objects.filter(car=_car, track=_track)
            return Response({"request error": str(error)})

class GetAllSetups(APIView):
    def get(self, request, format=None):
        try:
            data=[]
            _carsetups=carsetup.objects.all()
            for _carsetup in carsetups:
                data.append({
                    "car":_carsetup.car,
                    "track":_carsetup.track,
                    "qualilaptime":_carsetup.qualilaptime,
                    "racelaptime":_carsetup.racelaptime,
                    "thumbnailName":_carsetup.thumbnailName,
                    "interests":_carsetup.interests,
                    "setsbaseLink":_carsetup.setsbaseLink,
                    "popometerLink":_carsetup.popometerLink,
                    "published":_carsetup.published
                })
            return Response({"carsetups":data})
        except Exception as error:
            print("request error:", str(error))