from django.urls import path
from .views import index

app_name='frontend'

urlpatterns = [
    path('', index, name=''),
    path('Signup', index, name='Signup'),
    path('Infosight', index, name='Infosight')
]