from django.contrib.auth.models import User
from app.models import Query
from rest_framework import permissions, viewsets
from app.permissions import IsOwnerOrReadOnly
from app.serializers import QuerySerializer, UserSerializer
from django.views.generic.base import TemplateView


class QueryViewSet(viewsets.ModelViewSet):
    queryset = Query.objects.all()
    serializer_class = QuerySerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,
                          IsOwnerOrReadOnly,)


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class AngularView(TemplateView):
    template_name = 'base.html'
