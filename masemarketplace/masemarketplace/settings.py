"""
Django settings for masemarketplace project.

Generated by 'django-admin startproject' using Django 4.0.2.

For more information on this file, see
https://docs.djangoproject.com/en/4.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.0/ref/settings/
"""
import datetime
from datetime import timedelta
import environ
from pathlib import Path
import os
from django.core.management.utils import get_random_secret_key


env = environ.Env(
    DEBUG=(int, 0)
)
environ.Env.read_env('.env')
# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env.str('DJANGO_SECRET_KEY', default=get_random_secret_key())

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['*']

SECURE_CROSS_ORIGIN_OPENER_POLICY = "same-origin-allow-popups"

#Base backend URL
BASE_BACKEND_URL = env.str('DJANGO_BASE_BACKEND_URL', default='http://localhost:8000')
#Base frontend URL
BASE_FRONTEND_URL = env.str('DJANGO_BASE_FRONTEND_URL')
#Base token URL
#JWT token URL
TOKEN_URL=env.str('DJANGO_TOKEN_URL')
REFRESH_TOKEN_URL=env.str('DJANGO_REFRESH_TOKEN_URL')
VERIFY_TOKEN_URL=env.str('DJANGO_VERIFY_TOKEN_URL')
#SimpleJWT token settings
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=5),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    'ROTATE_REFRESH_TOKENS': False,
    'BLACKLIST_AFTER_ROTATION': False,
    'UPDATE_LAST_LOGIN': False,

    'ALGORITHM': 'HS256',
    'SIGNING_KEY': SECRET_KEY,
    'VERIFYING_KEY': None,
    'AUDIENCE': None,
    'ISSUER': None,
    'JWK_URL': None,
    'LEEWAY': 0,

    'AUTH_HEADER_TYPES': ('Bearer',),
    'AUTH_HEADER_NAME': 'HTTP_AUTHORIZATION',
    'USER_ID_FIELD': 'id',
    'USER_ID_CLAIM': 'user_id',
    'USER_AUTHENTICATION_RULE': 'rest_framework_simplejwt.authentication.default_user_authentication_rule',

    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
    'TOKEN_TYPE_CLAIM': 'token_type',
    'TOKEN_USER_CLASS': 'rest_framework_simplejwt.models.TokenUser',

    'JTI_CLAIM': 'jti',

    'SLIDING_TOKEN_REFRESH_EXP_CLAIM': 'refresh_exp',
    'SLIDING_TOKEN_LIFETIME': timedelta(minutes=5),
    'SLIDING_TOKEN_REFRESH_LIFETIME': timedelta(days=1),
}

#EMAIL settings
# gmail settings
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_HOST_USER =  env.str('DJANGO_SERVER_EMAIL')
EMAIL_HOST_PASSWORD = env.str('DJANGO_SERVER_EMAIL_PASSWORD')
EMAIL_PORT = 587
EMAIL_USE_TLS = True
DEFAULT_FROM_EMAIL = EMAIL_HOST_USER
# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    #'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'frontend.apps.FrontendConfig',
    'backend_userManagement.apps.BackendUsermanagementConfig',
    'rest_framework_jwt',
    'rest_framework_jwt.blacklist',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    )
}

ROOT_URLCONF = 'masemarketplace.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

#session engine setting
SESSION_ENGINE='django.contrib.sessions.backends.signed_cookies'
SESSION_COOKIE_HTTPONLY=False
# JWT settings
JWT_EXPIRATION_DELTA_DEFAULT = 2.628e+6  # 1 month in seconds
JWT_AUTH = {
    'JWT_EXPIRATION_DELTA': datetime.timedelta(
        seconds=env.int(
            'DJANGO_JWT_EXPIRATION_DELTA',
            default=JWT_EXPIRATION_DELTA_DEFAULT
        )
    ),
    'JWT_AUTH_HEADER_PREFIX': 'JWT',
    'JWT_GET_USER_SECRET_KEY': lambda user: user.secret_key,
    'JWT_RESPONSE_PAYLOAD_HANDLER': 'users.selectors.jwt_response_payload_handler',
    'JWT_AUTH_COOKIE': 'jwt_token',
    'JWT_AUTH_COOKIE_SAMESITE': 'None'
}

WSGI_APPLICATION = 'masemarketplace.wsgi.application'

# Custom user model
AUTH_USER_MODEL = 'backend_userManagement.user'

# Database
# https://docs.djangoproject.com/en/4.0/ref/settings/#databases

DATABASES = {
    #'default': {
     #   'ENGINE': 'django.db.backends.sqlite3',
     #  'NAME': BASE_DIR / 'db.sqlite3',
    #}
     'default': {

        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ.get('POSTGRES_NAME'),
        'USER': os.environ.get('POSTGRES_USER'),
        'PASSWORD': os.environ.get('POSTGRES_PASSWORD'),
        'HOST': 'db',
        'PORT': 5432,

    }
}
#print(os.environ.get('POSTGRES_NAME'))
#print(os.environ.get('POSTGRES_USER'))
#print(os.environ.get('POSTGRES_PASSWORD'))

# Password validation
# https://docs.djangoproject.com/en/4.0/ref/settings/#auth-password-validators

PASSWORD_HASHERS = [
    'django.contrib.auth.hashers.PBKDF2PasswordHasher',
    'django.contrib.auth.hashers.PBKDF2SHA1PasswordHasher',
    'django.contrib.auth.hashers.Argon2PasswordHasher',
    'django.contrib.auth.hashers.BCryptSHA256PasswordHasher',
]

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.0/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/4.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

GOOGLE_OAUTH2_CLIENT_ID = env.str('DJANGO_GOOGLE_OAUTH2_CLIENT_ID')
GOOGLE_OAUTH2_CLIENT_SECRET = env.str('DJANGO_GOOGLE_OAUTH2_CLIENT_SECRET')
