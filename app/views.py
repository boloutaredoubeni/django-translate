
from django.contrib.auth.models import User
from app.models import Query
from rest_framework import permissions, viewsets, status, renderers
from rest_framework.response import Response
from app.permissions import IsOwnerOrReadOnly, AppUserPermission
from app.serializers import QuerySerializer, UserSerializer
from django.views.generic.base import TemplateView
from django.conf import settings
from urllib.parse import urljoin
import jwt



class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = (permissions.AllowAny, AppUserPermission)
    renderer_classes = (renderers.JSONRenderer,)

    def get_queryset(self):
        if self.request.user.is_superuser:
            return User.objects.all()
        elif self.request.user is None:
            return User.objects.none()
        return User.objects.filter(id=self.request.user.id)

    # todo: return a token at login


class QueryViewSet(viewsets.ModelViewSet):
    queryset = Query.objects.all()
    serializer_class = QuerySerializer
    permission_classes = (IsOwnerOrReadOnly,)

    @staticmethod
    def get_user_from_token(token):
        payload = jwt.decode(token, settings.SECRET_KEY)
        del payload['exp']
        payload['id'] = payload['user_id']
        del payload['user_id']
        return User.objects.get(**payload).id

    def create(self, request):
        if request.method == 'POST':
            token = request.META.get('HTTP_AUTHORIZATION').split()[1]
            user_id = None
            try:
                user_id = self.get_user_from_token(token)
            except Exception:
                resp_data = {
                    'data': {
                        'detail': 'Token is expired',
                        'redirect': '/api/v1/login',
                    }
                }
                return Response(resp_data,
                                status=status.HTTP_401_UNAUTHORIZED)
            data = request.data
            data['creator_id'] = user_id
            serializer = self.serializer_class(data=data)

            if serializer.is_valid():
                serializer.save(creator_id=user_id)
                return Response(serializer.data,
                                status=status.HTTP_201_CREATED)

            return Response(serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        # Todo: prevent this
        pass

    def destroy(self, request, pk=None):
        # todo: enable this
        pass


class AngularView(TemplateView):
    template_name = 'index.html'

    def get_context_data(self, **kwargs):
        context = super(AngularView, self).get_context_data(**kwargs)
        api_version = "api/v{}/".format(settings.API_VERSION)
        api_url = urljoin('http://' + settings.IP_ADDR + ':8000', api_version)
        context['api_url'] = api_url
        context['ng_version'] = '1.5.5'
        context['ui_router_version'] = '0.3.0'
        context['ng_material_version'] = '1.0.0'
        context['app_name'] = 'django Translate'
        return context
