from django.contrib.auth.models import User
from rest_framework import serializers
from app.models import Query


class UserSerializer(serializers.HyperlinkedModelSerializer):
    queries = serializers.PrimaryKeyRelatedField(many=True,
                                                 queryset=Query.objects.all())

    class Meta:
        model = User
        fields = ('username',
                  'first_name',
                  'last_name',
                  'email',
                  'queries',)


class QuerySerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Query
        fields = ('created',
                  'updated',
                  'creator',
                  'source',
                  'lang',
                  'translation',)
