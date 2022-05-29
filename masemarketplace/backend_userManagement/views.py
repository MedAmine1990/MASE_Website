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
            checkusername=user.objects.filter(username=username)
            checkemail=user.objects.filter(useremail=useremail)
            if checkusername.exists():
                return Response({'error': 'username already exists.'}, status=status.HTTP_200_OK)
            elif checkemail.exists():
                return Response({'error': 'user email already exists.'}, status=status.HTTP_200_OK)
            else:
                _user=user(useremail=useremail,
                username=username,
                password=password)
                _user.save()
                return Response({'success': 'template saved successfully'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'request body does not match.'}, status=status.HTTP_400_BAD_REQUEST)