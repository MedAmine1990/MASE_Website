from django.urls import path
from .views import *


app_name='backend_userManagement'


urlpatterns = [
    path('createuser', CreateUser.as_view()),
    path('loginuser', LoginUser.as_view()),
    path('googleloginuser', ggLoginUser.as_view()),
    path('getuserdata',getSessionCookie.as_view()),
    path('logout',logoutUser.as_view()),
    path('verifyemail',verifyUserEmail.as_view()),
    path('resendverifyemail',resendEmailConfirmationCode.as_view()),
    path('getsessionemail',getSessionEmail.as_view()),
    path('checkuserverified',checkUserVerified.as_view()),
    path('testaccesstoken',testAccessToken.as_view())
]
