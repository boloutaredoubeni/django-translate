from rest_framework import serializers
from app.models import Query
from django.contrib.auth.models import User


class UserSerializer(serializers.HyperlinkedModelSerializer):
    creator = serializers.ReadOnlyField(source='creator.username')

    class Meta:
        model = User
        fields = ('url', 'username', 'queries')


class QuerySerializer(serializers.HyperlinkedModelSerializer):
    queries = serializers.HyperlinkedRelatedField(queryset=Query.objects.all(),
                                                  view_name='query-detail',
                                                  many=True)

    class Meta:
        model = Query
        fields = ('created',
                  'updated',
                  'creator',
                  'orignal_text',
                  'original_lang',
                  'translation',
                  'translated_lang',)
