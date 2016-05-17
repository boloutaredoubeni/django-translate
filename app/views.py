from django.contrib.auth.models import User
from rest_framework import permissions
from rest_framework import viewsets
from app.models import Query
from app.permissions import IsOwnerOrReadOnly
from app.serializers import QuerySerializer, UserSerializer


class QueryViewSet(viewsets.ModelViewSet):
    queryset = Query.objects.all()
    serializer_class = QuerySerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,
                          IsOwnerOrReadOnly,)


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
