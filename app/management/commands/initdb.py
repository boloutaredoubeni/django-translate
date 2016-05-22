from django.core.management.base import BaseCommand
from app.tests import QueryFactory

import random


class Command(BaseCommand):

    help = 'Initialize the database with data'

    def handle(self, *args, **options):
        for i in range(0, random.randint(0, 20)):
            # todo: generate users with multiple queries
            QueryFactory.create()
