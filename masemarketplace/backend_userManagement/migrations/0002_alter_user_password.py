# Generated by Django 4.0.2 on 2022-06-18 16:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend_userManagement', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='password',
            field=models.CharField(max_length=80, null=True),
        ),
    ]
