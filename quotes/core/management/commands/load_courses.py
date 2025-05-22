# core/management/commands/load_courses.py

import csv
from django.core.management.base import BaseCommand
from core.models import React

class Command(BaseCommand):
    help = 'Load courses from merged_schedule.csv'

    def handle(self, *args, **kwargs):
        with open('merged_schedule.csv', newline='') as csvfile:
            reader = csv.DictReader(csvfile)

            for row in reader:
                name = row['subj_course_id_x']  # use whatever uniquely identifies the course
                instructor = row['instructor_x']
                time = row['time']
                days = row['days']
                location = row['location']

                # Combine into a detail string
                detail = f"{days} {time} at {location} by {instructor}"

                React.objects.create(
                    name=name,
                    detail=detail
                )

        self.stdout.write(self.style.SUCCESS('✅ Successfully loaded courses.'))
