from django.apps import AppConfig
import csv
import os

class CoreConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'core'

    def ready(self):
        from .models import React
        csv_path = os.path.join(os.path.dirname(__file__), '..', 'merged_schedule.csv')

        if React.objects.exists():
            return  # Avoid duplicate inserts on every restart

        try:
            with open(csv_path, newline='') as f:
                reader = csv.DictReader(f)
                for row in reader:
                    React.objects.create(name=row['name'], detail=row['detail'])
        except Exception as e:
            import logging
            logging.getLogger(__name__).error(f"Failed to load CSV: {e}")
