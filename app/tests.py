from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Query
import factory
from factory import fuzzy


class UserFactory(factory.DjangoModelFactory):
    username = factory.fuzzy.FuzzyText()
    first_name = factory.Faker('first_name')
    last_name = factory.Faker('last_name')
    email = fuzzy.FuzzyText(chars='abcdefghijklmnopqrstuvwxyz',
                                    length=12,
                                    suffix='@example.com')

    class Meta:
        model = User

    # @factory.post_generation
    # def add_queries(self, create, extracted, **kwargs):
    #     if not create:
    #         return
    #     n = kwargs['queries'] if 'queries' in kwargs else 2
    #     # TODO add queries
    #     for q in range(n):
    #         self.queries.add(QueryFactory(user=self))


class QueryFactory(factory.DjangoModelFactory):
    source = fuzzy.FuzzyChoice([
        'Bonjour, ca va?',
        'Hola, como estas?',
        "Hallo, wie geht's dir",
        "Comment tu t'appelles ?",
        '我不明白',
        '這個多少錢?',
        '你係邊國人呀',
        '英語はできますか',
        '日本語を話しますか',
        'Voudriez-vous danser avec moi?',
        'Parlez-vous français?',
        '¡Tanto tiempo sin verte!',
        'Puede hablar español conmigo',
        'Es freut mich, dich kennen zu lernen',
        'Parlez-vous francais?',
        'Tu habla espangol?',
        'Sprechen sie  deutsch'])
    creator = factory.SubFactory(UserFactory)

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
