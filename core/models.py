from django.db import models

class React(models.Model):
    name = models.CharField(max_length=200)
    detail = models.TextField()

    def __str__(self):
        return self.name
