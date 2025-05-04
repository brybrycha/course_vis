import logging
import requests

from rest_framework.response import Response
from django.shortcuts import render
from rest_framework.views import APIView
from . models import *
from . serializer import *



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

logger = logging.getLogger(__name__)
# Fetch data from Canvas API
class CanvasEventsView(APIView):
    def get(self, request):
        # Replace with your actual Canvas API endpoint and access token
        canvas_base_URL = "https://canvas.ucsd.edu/api/v1"
        endpoint = f"{canvas_base_URL}/calendar_events"
        
        access_token = "13171~L8K8mUuHkfEr9DGLKzFKNZM9DtzJ9Pa9YQMFHWU4axkkKvCMcDZVVLEYw3Uu7Bwf"
        
        params = {
            "start_date": request.query_params.get("start_date", None),
            "end_date": request.query_params.get("end_date", None),
        }
        logger.debug("Query parameters: %s", params)
        
        response = requests.get(
            endpoint,
            headers={"Authorization": f"Bearer {access_token}"},
            params={k: v for k, v in params.items() if v is not None},
            timeout = 10
        )
        
        logger.debug("Canvas API response: %s - %s", response.status_code, response.text)
        
        # Handle the response
        if response.status_code == 200:
            try:
                events = response.json()
                # Extract title, time, and location
                filtered_events = [
                    {
                        "title": event.get("title"),
                        "time": event.get("start_at"),
                        "location": event.get("location_name"),
                    }
                    for event in events
                ]
                return Response(filtered_events)
            except ValueError as e:
                logger.error("JSON decode Error: %s", e, exc_info=True)
                return Response({"error": "Invalid JSON response"}, status=500)
        else:
            return Response(
                {"error": "Failed to fetch events", "details": response.text},
                status=response.status_code,
            )
