# Generated by Django 4.0.2 on 2022-07-14 17:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend_userManagement', '0006_user_username'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='verified',
            field=models.BooleanField(default=False),
        ),
    ]
