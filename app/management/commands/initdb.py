from django.core.management.base import BaseCommand
from app.tests import UserFactory

import random
import string


class Command(BaseCommand):

    help = 'Initialize the database with data'

    def handle(self, *args, **options):
        for i in range(10):
            password = ''.join(
                random.SystemRandom()
                      .choice(string.ascii_letters + string.digits)
                       for _ in range(random.randint(6, 16)))
            UserFactory.create(password=password)
