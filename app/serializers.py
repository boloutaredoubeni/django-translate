from rest_framework import serializers
from app.models import Query


# class UserSerializer(serializers.HyperlinkedModelSerializer):

#     class Meta:
#         model = User
#         fields = ('url', 'username', 'first_name', 'last_name',)


class QuerySerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Query
        fields = ('created',
                  'updated',
                  # 'creator',
                  'source',
                  'lang',
                  'translation',)
