from django.db import models


# Create your models here.
class Query(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField()
    creator = models.ForeignKey('auth.User', related_name='queries')
    orignal_text = models.TextField()
    original_lang = models.CharField(max_length=4)
    translation = models.TextField()

    class Meta:
        ordering = ('created',)
