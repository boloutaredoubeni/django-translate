"""
WSGI config for translator project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/1.9/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application

from dotenv import load_dotenv

dot_env = os.path.join(os.path.dirname(__file__), '..', '.env')
load_dotenv(dot_env)

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "translator.settings")

application = get_wsgi_application()
