from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from .models import React
from .serializer import ReactSerializer
from django.db.models import Q

class ReactView(APIView):
    serializer_class = ReactSerializer

    def get(self, request):
        search_query = request.GET.get('search', '')  # get ?search=... if it exists

        queryset = React.objects.all().order_by("id")

        # Filter by search query if provided
        if search_query:
            queryset = queryset.filter(
                Q(detail__icontains=search_query) |
                Q(name__icontains=search_query)
            )

        # Pagination
        paginator = PageNumberPagination()
        paginator.page_size = 50
        paginator.page_size_query_param = 'page_size'  # allow user to control page size
        paginated_queryset = paginator.paginate_queryset(queryset, request)

        serializer = ReactSerializer(paginated_queryset, many=True)
        return paginator.get_paginated_response(serializer.data)

    def post(self, request):
        serializer = ReactSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
