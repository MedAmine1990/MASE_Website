from django.shortcuts import render
from rest_framework.views import APIView
# Create your views here.

class CreateSetup(APIView):
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
            print("Object parse error:", str(error))


