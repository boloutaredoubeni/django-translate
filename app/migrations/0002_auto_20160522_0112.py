# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-05-22 01:12
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='query',
            name='lang',
            field=models.TextField(max_length=4),
        ),
    ]
