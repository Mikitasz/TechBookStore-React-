# Generated by Django 4.1.3 on 2023-11-01 21:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0010_delete_userlikedbook'),
    ]

    operations = [
        migrations.RenameField(
            model_name='addedbooks',
            old_name='user_id',
            new_name='user',
        ),
    ]
