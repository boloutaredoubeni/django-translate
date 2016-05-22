from rest_framework import permissions


class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request
        if request.method in permissions.SAFE_METHODS:
            return True

        # Write permissions are only allowed to the owner of the snippet
        return obj.creator == request.user


class AppUserPermission(permissions.BasePermission):

    def has_permission(self, request, view):
        # Allow reading
        if request.method in permissions.SAFE_METHODS:
            return True

        elif view.action == 'create':
            # todo: prevent auth users from creating new ones
            # return request.user is not None
            # NOTE: create already requires a POST request
            return request.method == 'POST'

        return request.user is not None
