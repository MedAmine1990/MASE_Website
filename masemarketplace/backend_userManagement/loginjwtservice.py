from django.conf import settings
import requests

def jwt_login(_user):
    response=requests.post(
        settings.TOKEN_URL,
        data={"password":_user.password,
                "email":_user.email}
    )
    print(response.json())
    return response.json()