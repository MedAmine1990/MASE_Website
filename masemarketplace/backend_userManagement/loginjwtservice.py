from django.conf import settings
import requests
from rest_framework_simplejwt.tokens import RefreshToken

def jwt_login(_user,method):
    response={}
    print('in jwt_login')
    if method=='ManualInput':
        response=requests.post(
            settings.TOKEN_URL,
            data={"password":_user.password,
                    "email":_user.email}
        )
        return response.json()
    elif method=='GoogleAuth':
        print('in GoogleAuth')
        token = RefreshToken.for_user(_user)
        response['access']=str(token.access_token)
        response['refresh']=str(token)
        print(response['access'])
        return response