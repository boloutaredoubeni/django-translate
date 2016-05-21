from django.contrib.auth.models import User
from rest_framework import serializers
from app.models import Query


class UserSerializer(serializers.HyperlinkedModelSerializer):
    email = serializers.EmailField()
    queries = serializers.PrimaryKeyRelatedField(required=False, many=True,
                                                 queryset=Query.objects.all())
    password = serializers.CharField(write_only=True, required=True)

    # fixme: encrypt password and make sure it is stored correctly
    class Meta:
        model = User
        fields = ('username',
                  'email',
                  'queries',
                  'password',)



class QuerySerializer(serializers.HyperlinkedModelSerializer):
    creator = serializers.ReadOnlyField(source='creator.username')

    class Meta:
        model = Query
        fields = ('created',
                  'updated',
                  'creator',
                  'source',
                  'lang',
                  'creator',
                  'translation',)
