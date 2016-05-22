from django.db import models
from .services import translate


# Create your models here.
class Query(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    creator = models.ForeignKey('auth.User', related_name='queries')
    source = models.TextField()
    lang = models.TextField(max_length=4)
    translation = models.TextField()

    class Meta:
        ordering = ('created',)

    def save(self, *args, **kwargs):
        # FIXME: do this some where else
        self.lang, self.translation = translate(self.source)
        super(Query, self).save(*args, **kwargs)
