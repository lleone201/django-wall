# Generated by Django 3.2.5 on 2021-07-09 02:34

from django.db import migrations, models
import wall.models


class Migration(migrations.Migration):

    dependencies = [
        ('wall', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='likedBy',
            field=models.JSONField(default=wall.models.my_default),
        ),
    ]
