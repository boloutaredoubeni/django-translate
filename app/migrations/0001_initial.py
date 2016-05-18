# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-05-18 20:39
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Query',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now_add=True)),
                ('source', models.TextField()),
                ('lang', models.CharField(max_length=4)),
                ('translation', models.TextField()),
            ],
            options={
                'ordering': ('created',),
            },
        ),
    ]
