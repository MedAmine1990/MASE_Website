# Generated by Django 4.0.2 on 2024-01-29 16:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('setupsmanager', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='setupnote',
            name='risks',
            field=models.TextField(null=True),
        ),
        migrations.AddField(
            model_name='setupnote',
            name='videopath',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='setupnote',
            name='thumbnailName',
            field=models.CharField(max_length=100, null=True),
        ),
    ]