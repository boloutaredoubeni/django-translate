from django.db import models
from .services import translate
from django.contrib.auth.models import User as auth_user


# class User(auth_user):
#     pass


# Create your models here.
class Query(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now_add=True)
    source = models.TextField()
    lang = models.CharField(max_length=4)
    translation = models.TextField()

    class Meta:
        ordering = ('created',)

    def save(self, *args, **kwargs):
        self.lang, self.translation = translate(self.source)
        super(Query, self).save(*args, **kwargs)
