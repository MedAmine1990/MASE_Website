from rest_framework import serializers
from .models import User



class userSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=('username','email', 'password','source', 'secret_key')