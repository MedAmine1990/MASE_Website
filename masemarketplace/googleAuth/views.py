from django.shortcuts import render
from services import jwt_login, google_get_access_token, google_get_user_info
# Create your views here.


class getAccessToken(APIView)
    def get(self, request, *args, **kwargs):
        input_serializer = self.InputSerializer(data=request.GET)
        input_serializer.is_valid(raise_exception=True)

        validated_data = input_serializer.validated_data

        code = validated_data.get('code')
        error = validated_data.get('error')
