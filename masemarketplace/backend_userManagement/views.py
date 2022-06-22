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
            checkusername=user.objects.filter(username=username)
            checkemail=user.objects.filter(useremail=useremail)
            if checkusername.exists():
                return Response({'error': 'username already exists.'}, status=status.HTTP_200_OK)
            elif checkemail.exists():
                return Response({'error': 'user email already exists.'}, status=status.HTTP_200_OK)
            else:
                _user=user(useremail=useremail,
                username=username,
                password=password,
                source=source)
                _user.save()
                return Response({'success': 'user registred successfully'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'request body does not match.'}, status=status.HTTP_400_BAD_REQUEST)

class LoginUser(APIView):
    def post(self, request, format=None):
        useremail=None
        username=None
        checkusercredentials=None
        if 'useremail' in request.data:
            useremail=request.data['useremail']
            password=request.data['password']
            checkusercredentials=user.objects.filter(useremail=useremail).filter(password=password)
        if 'username' in request.data:
            username=request.data['username']
            password=request.data['password']
            checkusercredentials=user.objects.filter(username=username).filter(password=password)
        if checkusercredentials.exists():
            return Response({'success':'User credentials are correct.'})
        else:
            return Response({'error':'username, email or password mismatch.'})
            