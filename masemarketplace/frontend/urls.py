from django.urls import path
from .views import index, signup

app_name='frontend'

urlpatterns = [
    path('', index, name=''),
]