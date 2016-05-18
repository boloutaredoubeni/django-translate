from app.models import Query
from rest_framework import permissions, viewsets, status
from rest_framework.response import Response
from app.permissions import IsOwnerOrReadOnly
from app.serializers import QuerySerializer
from django.views.generic.base import TemplateView


class QueryViewSet(viewsets.ModelViewSet):
    queryset = Query.objects.all()
    serializer_class = QuerySerializer
    # permission_classes = (permissions.IsAuthenticatedOrReadOnly,
                          # IsOwnerOrReadOnly,)

    def create(self, request):
        if request.method == 'POST':
            data = {
                'source': request.data['source'],
                'lang': 'en',
                'translation': 'none',
            }
            serializer = self.serializer_class(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data,
                                status=status.HTTP_201_CREATED)

            return Response(serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        pass

    def destroy(self, request, pk=None):
        pass

# class UserViewSet(viewsets.ReadOnlyModelViewSet):
# g


class AngularView(TemplateView):
    template_name = 'index.html'
