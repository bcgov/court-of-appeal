# Generated by Django 3.2.8 on 2021-11-08 21:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_efilingsubmission'),
    ]

    operations = [
        migrations.AddField(
            model_name='case',
            name='description',
            field=models.CharField(blank=True, default='', max_length=200),
        ),
    ]
