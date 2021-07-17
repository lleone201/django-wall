from django.db import models
from allauth.account.signals import user_signed_up
from django.dispatch import receiver
from django.core.mail import send_mail

# Create your models here.


def my_default():
    return {'foo': 1}


class Post(models.Model):
    title = models.CharField(max_length=120)
    content = models.TextField()
    date = models.DateField()
    likes = models.IntegerField()
    poster = models.TextField()

    def _str_(self):
        return self.title
