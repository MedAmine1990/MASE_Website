from django.urls import path
from .views import *


app_name='backend_userManagement'


urlpatterns = [
    path('createuser', CreateUser.as_view()),
    path('loginuser', LoginUser.as_view())
]