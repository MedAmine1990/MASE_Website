# Generated by Django 4.0.2 on 2024-01-29 16:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('setupsmanager', '0002_setupnote_risks_setupnote_videopath_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='setupnote',
            name='noteName',
            field=models.CharField(max_length=50, unique=True),
        ),
    ]
