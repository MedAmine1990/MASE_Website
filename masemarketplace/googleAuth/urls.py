from django.urls import path
from .views import *

app_name='googleAuth'

urlpatterns = [
    path('getuserdata', getUserData.as_view())
]