from django.contrib.auth.models import User
from rest_framework import serializers
from app.models import Query


class UserSerializer(serializers.HyperlinkedModelSerializer):
    email = serializers.EmailField()
    queries = serializers.PrimaryKeyRelatedField(required=False, many=True,
                                                 queryset=Query.objects.all())
    password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('username',
                  'email',
                  'queries',
                  'password',)

    def create(self, validated_data):
        user = User(email=validated_data['email'],
                    username=validated_data['username'])
        user.set_password(validated_data['password'])
        user.save()
        return user


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
