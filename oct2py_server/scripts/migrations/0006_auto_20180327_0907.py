# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-03-27 09:07
from __future__ import unicode_literals

from django.db import migrations, models
import scripts.models


class Migration(migrations.Migration):

    dependencies = [
        ('scripts', '0005_scriptcode_input_number'),
    ]

    operations = [
        migrations.AddField(
            model_name='scriptcode',
            name='output_number',
            field=models.IntegerField(default=1, validators=[scripts.models.validate_positive]),
        ),
        migrations.AlterField(
            model_name='scriptcode',
            name='input_number',
            field=models.IntegerField(default=1, validators=[scripts.models.validate_positive]),
        ),
    ]
