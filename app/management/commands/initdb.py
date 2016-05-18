from django.core.management.base import BaseCommand
from app.tests import QueryFactory
from app.models import Query


class Command(BaseCommand):

    help = 'Initialize the database with data'

    def handle(self, *args, **options):
        for i in range(10):
            query = QueryFactory.build()
            query_fields = query._meta.get_fields()
            query_obj = {field.name: getattr(query, field.name) for field in query_fields if hasattr(query, field.name)}
            Query.objects.get_or_create(**query_obj)
