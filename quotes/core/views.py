from rest_framework.response import Response
from django.shortcuts import render
from rest_framework.views import APIView
from . models import *
from . serializer import *
import json
import os


# Create your views here.

class ReactView(APIView):
  
    serializer_class = ReactSerializer

    def get(self, request):
        detail = [ {"name": detail.name,"detail": detail.detail} 
        for detail in React.objects.all()]
        return Response(detail)

    def post(self, request):

        serializer = ReactSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return  Response(serializer.data)

class CalendarEventsView(APIView):
    def get(self, request):
        try:
            json_path = os.path.join(os.path.dirname(__file__), '..', 'parsed_events.json')
            with open(json_path, 'r', encoding='utf-8') as f:
                events = json.load(f)
            return Response(events)
        except FileNotFoundError:
            return Response({"error": "Calendar events not found"}, status=404)
