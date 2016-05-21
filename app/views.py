from django.contrib.auth.models import User
from app.models import Query
from rest_framework import permissions, viewsets, status
from rest_framework.response import Response
from app.permissions import IsOwnerOrReadOnly, AppUserPermission
from app.serializers import QuerySerializer, UserSerializer
from django.views.generic.base import TemplateView
from django.conf import settings
from urllib.parse import urljoin


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = (permissions.AllowAny, AppUserPermission)

    #fixme or override self.list()
    def get_queryset(self):
        if self.request.user.is_superuser:
            return User.objects.all()
        elif self.request.user is None:
            return User.objects.none()
        return User.objects.filter(id=self.request.user.id)

    # def create(self, request):
    #     serializer = self.serializer_class(data=request.data)
    #     import ipdb; ipdb.set_trace()
    #     if serializer.is_valid():
    #         try:
    #             User.objects.create_user(**serializer.validated_data)
    #             # todo: send token?
    #         except Exception:
    #             return Response(serializer.errors,
    #                             status=status.HTTP_400_BAD_REQUEST)

    #     return Response(serializer.errors,
    #                     status=status.HTTP_400_BAD_REQUEST)


class QueryViewSet(viewsets.ModelViewSet):
    queryset = Query.objects.all()
    serializer_class = QuerySerializer
    permission_classes = (IsOwnerOrReadOnly,)

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

    def get_context_data(self, **kwargs):
        context = super(AngularView, self).get_context_data(**kwargs)
        api_version = "api/v{}/".format(settings.API_VERSION)
        api_url = urljoin('http://' + settings.IP_ADDR + ':8000', api_version)
        context['api_url'] = api_url
        context['ng_version'] = '1.5.5'
        context['ui_router_version'] = '0.3.0'
        return context
