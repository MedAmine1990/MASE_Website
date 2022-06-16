from django.shortcuts import render
from .services import google_get_access_token, google_get_user_info
from django.urls import reverse
from django.conf import settings
from django.shortcuts import redirect
from rest_framework import status, serializers
from rest_framework.views import APIView
from rest_framework.response import Response
# Create your views here.


class getUserData(APIView):
    class InputSerializer(serializers.Serializer):
        code = serializers.CharField(required=False)
        error = serializers.CharField(required=False)
    def get(self, request, *args, **kwargs):
        input_serializer = self.InputSerializer(data=request.data)
        input_serializer.is_valid(raise_exception=True)

        validated_data = input_serializer.validated_data
        print(validated_data)
        code = validated_data.get('code')
        error = validated_data.get('error')
        domain = settings.BASE_BACKEND_URL
        #api_uri = reverse('api:v1:auth:login-with-google')
        #redirect_uri = f'{domain}{api_uri}'

        access_token = google_get_access_token(code=code, redirect_uri='http://localhost:8000')
        user_data = google_get_user_info(access_token=access_token)
        print(user_data)
        profile_data = {
            'email': user_data['email'],
            'first_name': user_data.get('given_name', ''),
            'last_name': user_data.get('family_name', ''),
        }

        return Response(profile_data,status=status.HTTP_200_OK)
