from re import template
from django.shortcuts import render
from rest_framework.serializers import Serializer
from rest_framework.utils.representation import serializer_repr
from .serializers import *
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import JsonResponse
from .models import user
from .loginjwtservice import *
from django.shortcuts import redirect
from django.conf import settings
from django.contrib.auth import get_user_model, logout
from django.contrib.auth.hashers import make_password, check_password
import random
import requests

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
                        password=  make_password(user.objects.make_random_password()) if password==None else make_password(password),
                        source=source,
                        verificationcode=str(random.randrange(100000,999999)))
            _user.save()
            request.session['email']=_user.email
            return Response({'success': 'user registred successfully'}, status=status.HTTP_200_OK)

class LoginUser(APIView):
    def post(self, request, format=None):
        checkuser=None
        checkpassword=False
        _user=None
        useremailorname=request.data['useremailorname']
        password=request.data['password']
        checkuser=user.objects.filter(email=useremailorname)
        if checkuser.exists():
            _user=user.objects.get(email=useremailorname)
            checkpassword=check_password(password,_user.password)
        else:
            checkuser=user.objects.filter(username=useremailorname)
            if checkuser.exists():
                _user=user.objects.get(username=useremailorname)
                checkpassword=check_password(password,_user.password)
            if not checkuser.exists():
                checkuser_googleAuth=user.objects.filter(email=useremailorname).filter(source='GoogleAuth')
                if checkuser_googleAuth.exists():
                    return Response({'error':'user account registred with google.'})
        if checkpassword:
            _user.password=password
            if _user.verified is True:
                response=jwt_login(_user,'ManualInput')
                request.session['username']=_user.username
                request.session['email']=_user.email
                request.session['access_token']=response['access']
                request.session['refresh']=response['refresh']
                return Response({'success':'Login granted for user.'})
            else:
                request.session['email']=_user.email
                user.objects.filter(email=_user.email).update(verificationcode=str(random.randrange(100000,999999)))
                return Response({'alert':'User is not verified.'})
        else:
            return Response({'error':'username, email or password mismatch.'})

class getSessionCookie(APIView):
    def get(self, request, format=None):
        if 'username' in request.session:
            username=request.session['username']
            access_token=request.session['access_token']
            refresh=request.session['refresh']
            return Response ({
                'username':username,
                'access_token':access_token,
                'refresh':refresh
                })
        else:
            return Response ({
                'error':'Could not get session data.'
                })

class getSessionEmail(APIView):
        def get(self, request, format=None):
            try:
                return Response({
                    'email':request.session['email']
                })
            except Exception as e:
                return Response({'error':'API call error happened.'})


class ggLoginUser(APIView):
    def post(self, request, format=None):
        try:
            print('in gg login user')
            useremail=request.data['email']
            checkuseremail=user.objects.filter(email=useremail).filter(source='GoogleAuth')
            if checkuseremail.exists():
                print('in checkuseremail.exists()')
                _user=user.objects.get(username=useremail)
                response=jwt_login(_user,'GoogleAuth')
                request.session['username']=_user.username
                request.session['email']=_user.useremail
                request.session['access_token']=response['access']
                request.session['refresh']=response['refresh']
                return Response({'success':'user email exisits. Login granted.'})
        except Exception as e:
            print(str(e))
            return Response({'error':'API call error happened.'})

class logoutUser(APIView):
    def get(self, request, format=None):
        try:
            logout(request)
            return Response({'success': 'User logged out from session.'})
        except Exception as e:
            return Response({'error': str(e)})

class verifyUserEmail(APIView):
    def post(self, request, format=None):
        try:
            _email=request.session['email']
            _verificationCode=request.data['code']
            verifycode=user.objects.filter(email=_email).filter(verificationcode=_verificationCode)
            if verifycode.exists():
                user.objects.filter(email=_email).update(verified=True)
                return Response({'success': 'User email verified.'})
            else:
                return Response({'error':'Verification code mismatch.'})
        except Exception as e:
            return Response({'error': str(e)})

class checkUserVerified(APIView):
    def post(self, request, format=None):
        try:
            _email=request.data['email']
            checkuser=user.objects.filter(email=_email)
            if checkuser.exists():
                _user=user.objects.get(email=_email)
                return Response({'userverified':_user.verified})
            else:
                return Response({'error':'User does not exist.'})
        except Exception as e:
            return Response({'error': str(e)})

class testAccessToken(APIView):
    def get(self, request, format=None):
        try:
            response=jwt_verify(request.session['access_token'])
            return Response({'result':response})
        except:
            return Response({'error':'API call error happened.'})


class resendEmailConfirmationCode(APIView):
    def get(self, request, format=None):
        try:
            _email=request.session['email']
            user.objects.filter(email=_email).update(verificationcode=str(random.randrange(100000,999999)))
            return Response({'success': 'Verification code reset for email: '+_email})
        except Exception as e:
            return Response({'error': str(e)})



            