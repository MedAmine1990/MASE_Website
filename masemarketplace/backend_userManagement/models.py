from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.management.utils import get_random_secret_key


class user(AbstractUser):
    username = models.CharField(max_length=255)

    email = models.EmailField(unique=True, db_index=True)
    secret_key = models.CharField(max_length=255, default=get_random_secret_key)
    source= models.CharField(max_length=255)
    verified=models.BooleanField(default=False)
    verificationcode=models.CharField(max_length=9, default='undefined')

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    class Meta:
        swappable = 'AUTH_USER_MODEL'

    @property
    def name(self):
        if not self.last_name:
            return self.first_name.capitalize()

        return f'{self.first_name.capitalize()} {self.last_name.capitalize()}'