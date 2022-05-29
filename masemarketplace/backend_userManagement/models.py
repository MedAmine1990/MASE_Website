from django.db import models

# Create your models here.


class user(models.Model):
    useremail=models.CharField(max_length=80)
    username=models.CharField(max_length=80)
    password=models.CharField(max_length=80)