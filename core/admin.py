from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from import_export import resources
from .models import React

# Create a resource class for React model
class ReactResource(resources.ModelResource):
    class Meta:
        model = React
        fields = ("id", "name", "detail")  # Match CSV headers and model fields exactly

@admin.register(React)
class ReactAdmin(ImportExportModelAdmin):
    resource_class = ReactResource
