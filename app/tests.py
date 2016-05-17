from django.core.urlresolvers import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Query


class AccountTests(APITestCase):
    def test_create_query(self):
        """
        Ensure we can create a new account object.
        """
        url = reverse('users')
        data = {'name': 'DabApps'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Query.objects.count(), 1)
        self.assertEqual(Query.objects.get().name, 'DabApps')


