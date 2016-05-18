from django.core.urlresolvers import reverse, resolve
from rest_framework import status
from rest_framework.test import APITestCase, APIRequestFactory
from .models import Query
from .views import QueryViewSet
import factory
from factory import fuzzy
import random


# class UserFactory(factory.DjangoModelFactory):
#     username = fuzzy.FuzzyText()
#     first_name = factory.Faker('first_name')
#     last_name = factory.Faker('last_name')
#     email = factory.LazyAttribute(
#         lambda a: '{0}.{1}@example.com'
#         .format(a.first_name, a.last_name).lower())

#     class Meta:
#         model = User


class QueryFactory(factory.DjangoModelFactory):
    source = random.choice([
        'Bonjour, ca va?',
        'Hola, como estas?',
        "Hallo, wie geht's dir",
        'Parlez-vous francais?'
        'Tu habla espangol?',
        'Sprechen sie  deutsch'])

    class Meta:
        model = Query


class RootAPITest(APITestCase):

    def test_get(self):
        url = '/api/v1/'
        response = self.client.get(url, content_type="application/json")
        code = response.status_code
        self.assertTrue(
            status.is_success(code),
            msg="For {}, The server responded with {}, instead of {}xx"
                .format(url, code, 2))


class QueryTests(APITestCase):

    def test_get(self):
        url = '/api/v1/queries'
        response = self.client.get(url, content_type="application/json")
        code = response.status_code
        self.assertTrue(
            status.is_success(code),
            msg="For {}, The server responded with {}, instead of {}xx"
                .format(url, code, 2))


class UserTests(APITestCase):

    def setUp(self):
        self.default_user = UserFactory.create()

    def test_get(self):
        url = '/api/v1/users'
        response = self.client.get(url, content_type="application/json")
        code = response.status_code
        print(response)
        self.assertTrue(
            status.is_success(code),
            msg="For {}, The server responded with {}, instead of {}xx"
                .format(url, code, 2))

    def test_get_user(self):
        url = '/api/v1/users/1'
        response = self.client.get(url, content_type="application/json")
