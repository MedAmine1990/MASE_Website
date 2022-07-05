from re import template
from django.shortcuts import render
from rest_framework.serializers import Serializer
from rest_framework.utils.representation import serializer_repr
from .serializers import *
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import JsonResponse
from .models import user
from .loginjwtservice import jwt_login
from django.shortcuts import redirect
from django.conf import settings
from django.contrib.auth import get_user_model
#from django.contrib.auth.models import user
# Create your views here.


class CreateUser(APIView):
    def post(self, request, format=None):
        useremail=request.data['email']
        username=request.data['username']
        password=request.data['password']
        source=request.data['source']
        checkusername=user.objects.filter(username=username)
        checkemail=user.objects.filter(email=useremail)
        if checkusername.exists():
            return Response({'error': 'username already exists.'}, status=status.HTTP_200_OK)
        elif checkemail.exists():
            return Response({'error': 'user email already exists.'}, status=status.HTTP_200_OK)
        else:
            _user=user(email=useremail,
                        username=username,
                        password=password,
                        source=source)
            _user.save()
            return Response({'success': 'user registred successfully'}, status=status.HTTP_200_OK)

class LoginUser(APIView):
    def post(self, request, format=None):
        checkusercredentials=None
        useremailorname=request.data['useremailorname']
        password=request.data['password']
        checkusercredentials=user.objects.filter(email=useremailorname).filter(password=password)
        if not checkusercredentials.exists():
            checkusercredentials=user.objects.filter(username=useremailorname).filter(password=password)
        if not checkusercredentials.exists():
            checkuser=user.objects.filter(email=useremailorname).filter(source='GoogleAuth')
            if checkuser.exists():
                return Response({'error':'user account registred with google.'})
        if checkusercredentials.exists():
            response = redirect(settings.BASE_FRONTEND_URL)
            _user=user.objects.get(email=useremailorname)
            print(jwt_login(response=response,user=_user))
            return Response({'success':'user credentials are correct.'})
        else:
            return Response({'error':'username, email or password mismatch.'})


class ggLoginUser(APIView):
    def post(self, request, format=None):
        try:
            useremail=request.data['email']
            checkuseremail=user.objects.filter(email=useremail).filter(source='GoogleAuth')
            if checkuseremail.exists():
                return Response({'success':'user email exisits. Login granted.'})
        except Exception as e:
            return Response({'error':'API call error happened.'})



            