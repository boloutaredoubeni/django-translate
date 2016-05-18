from app.models import Query
from rest_framework import permissions, viewsets
from app.permissions import IsOwnerOrReadOnly
from app.serializers import QuerySerializer
from django.views.generic.base import TemplateView


class QueryViewSet(viewsets.ModelViewSet):
    queryset = Query.objects.all()
    serializer_class = QuerySerializer
    # permission_classes = (permissions.IsAuthenticatedOrReadOnly,
                          # IsOwnerOrReadOnly,)

    def create(self, request):
        pass

    def update(self, request, pk=None):
        pass

    def destroy(self, request, pk=None):
        pass

# class UserViewSet(viewsets.ReadOnlyModelViewSet):
# g


class AngularView(TemplateView):
    template_name = 'index.html'
