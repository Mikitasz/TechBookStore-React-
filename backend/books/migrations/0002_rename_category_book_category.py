# Generated by Django 4.2.6 on 2023-10-20 18:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='book',
            old_name='Category',
            new_name='category',
        ),
    ]