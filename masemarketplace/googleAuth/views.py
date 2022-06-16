from django.shortcuts import render
from .services import google_get_access_token, google_get_user_info
from django.urls import reverse
from django.conf import settings
from django.shortcuts import redirect
from rest_framework import status, serializers
from rest_framework.views import APIView
# Create your views here.


class getUserData(APIView):
    class InputSerializer(serializers.Serializer):
        code = serializers.CharField(required=False)
        error = serializers.CharField(required=False)
    def get(self, request, *args, **kwargs):
        input_serializer = self.InputSerializer(data=request.GET)
        input_serializer.is_valid(raise_exception=True)

        validated_data = input_serializer.validated_data

        code = validated_data.get('code')
        error = validated_data.get('error')
        domain = settings.BASE_BACKEND_URL
        #api_uri = reverse('api:v1:auth:login-with-google')
        #redirect_uri = f'{domain}{api_uri}'

        access_token = google_get_access_token(code=code, redirect_uri='')
        user_data = google_get_user_info(access_token=access_token)

        profile_data = {
            'email': user_data['email'],
            'first_name': user_data.get('givenName', ''),
            'last_name': user_data.get('familyName', ''),
        }

        return Response(profile_data,status=status.HTTP_200_OK)
