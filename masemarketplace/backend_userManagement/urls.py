from django.urls import path
from .views import *


app_name='backend_userManagement'


urlpatterns = [
    path('createuser', CreateUser.as_view()),
    path('loginuser', LoginUser.as_view()),
    path('googleloginuser', ggLoginUser.as_view()),
    path('tescookie',getSessionCookies.as_view()),
    path('logout',logoutUser.as_view()),
    path('verifyemail',verifyUserEmail.as_view()),
    path('resendverifyemail',resendEmailConfirmationCode.as_view()),
]
