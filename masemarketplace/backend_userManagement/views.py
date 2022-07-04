from re import template
from django.shortcuts import render
from rest_framework.serializers import Serializer
from rest_framework.utils.representation import serializer_repr
from .serializers import *
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import JsonResponse
from .models import User
from .loginjwtservice import jwt_login
from django.shortcuts import redirect
from django.conf import settings
#from django.contrib.auth.models import User
# Create your views here.


class CreateUser(APIView):
    serializer_class=userSerializer
    def post(self, request, format=None):
        serializer=self.serializer_class(data=request.data)
        if serializer.is_valid():
            useremail=serializer.data.get('useremail')
            username=serializer.data.get('username')
            password=serializer.data.get('password')
            source=serializer.data.get('source')
            checkusername=User.objects.filter(username=username)
            checkemail=User.objects.filter(useremail=useremail)
            if checkusername.exists():
                return Response({'error': 'username already exists.'}, status=status.HTTP_200_OK)
            elif checkemail.exists():
                return Response({'error': 'user email already exists.'}, status=status.HTTP_200_OK)
            else:
                _user=User(useremail=useremail,
                username=username,
                password=password,
                source=source)
                _user.save()
                return Response({'success': 'user registred successfully'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'request body does not match.'}, status=status.HTTP_400_BAD_REQUEST)

class LoginUser(APIView):
    def post(self, request, format=None):
        checkusercredentials=None
        useremailorname=request.data['useremailorname']
        password=request.data['password']
        checkusercredentials=User.objects.filter(useremail=useremailorname).filter(password=password)
        if not checkusercredentials.exists():
            checkusercredentials=User.objects.filter(username=useremailorname).filter(password=password)
        if not checkusercredentials.exists():
            checkuser=User.objects.filter(useremail=useremailorname).filter(source='GoogleAuth')
            if checkuser.exists():
                return Response({'error':'User account registred with google.'})
        if checkusercredentials.exists():
            response = redirect(settings.BASE_FRONTEND_URL)
            print(jwt_login(response=response,user=_user))
            return Response({'success':'User credentials are correct.'})
        else:
            return Response({'error':'username, email or password mismatch.'})


class ggLoginUser(APIView):
    def post(self, request, format=None):
        try:
            useremail=request.data['useremail']
            checkuseremail=User.objects.filter(useremail=useremail).filter(source='GoogleAuth')
            if checkuseremail.exists():
                return Response({'success':'User email exisits. Login granted.'})
        except Exception as e:
            return Response({'error':'API call error happened.'})



            