# Generated by Django 4.0.2 on 2022-07-14 17:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend_userManagement', '0007_user_verified'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='verficationcode',
            field=models.CharField(default='undefined', max_length=9),
        ),
    ]
