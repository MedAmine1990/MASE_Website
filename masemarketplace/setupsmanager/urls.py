from django.urls import path
from .views import *


app_name='setupsmanager'


urlpatterns = [
    path('createsetup', CreateSetup.as_view()),
    path('updatesetup', UpdateSetup.as_view()),
    path('deletesetup', DeleteSetup.as_view()),
    path('getsetup',GetSetup.as_view()),
    path('getallsetups',GetAllSetups.as_view()),
    path('createsetupnote',CreateNote.as_view()),
    path('updatesetupnote',UpdateNote.as_view()),
    path('getsetupnotes',GetSetupNotes.as_view()),
    path('deletesetupnote',DeleteSetupNote.as_view())
]