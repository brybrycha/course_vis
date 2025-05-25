from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from import_export import resources
from .models import React
import logging

logger = logging.getLogger(__name__)
logger.info("Registering React admin...")

# Resource for import/export
class ReactResource(resources.ModelResource):
    class Meta:
        model = React
        fields = ("id", "name", "detail")  # Must match your model

# Register model in admin with import/export enabled
@admin.register(React)
class ReactAdmin(ImportExportModelAdmin):
    resource_class = ReactResource
