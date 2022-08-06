from django.conf import settings
import requests
from rest_framework_simplejwt.tokens import RefreshToken

def jwt_login(_user,method):
    response={}
    if method=='ManualInput':
        response=requests.post(
            settings.TOKEN_URL,
            data={"password":_user.password,
                    "email":_user.email}
        )
        return response.json()
    elif method=='GoogleAuth':
        token = RefreshToken.for_user(_user)
        response['access']=str(token.access_token)
        response['refresh']=str(token)
        return response

def jwt_login_onverification(_user):
    response={}
    token = RefreshToken.for_user(_user)
    response['access']=str(token.access_token)
    response['refresh']=str(token)
    return response

def jwt_refresh(refresh_token):
    response={}
    response=requests.post(
            settings.REFRESH_TOKEN_URL,
            data={"refresh":refresh_token}
        )
    return response.json()

def jwt_verify(token):
    response={}
    response=requests.post(
            settings.VERIFY_TOKEN_URL,
            data={"token":token}
        )
    return response.json()



