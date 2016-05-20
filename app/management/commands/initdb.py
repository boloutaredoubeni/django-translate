from django.core.management.base import BaseCommand
from app.tests import UserFactory
from django.contrib.auth.models import User


class Command(BaseCommand):

    help = 'Initialize the database with data'

    def handle(self, *args, **options):
        for i in range(10):
            user = UserFactory.create()
            # user_fields = user._meta.get_fields()
            # user_obj = {field.name: getattr(user, field.name) for field in user_fields if hasattr(user, field.name)}
            # User.objects.get_or_create(**user_obj)
