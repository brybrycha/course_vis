import requests
from django.conf import settings

API_URL = 'https://<your-canvas-instance>.instructure.com/api/v1'
ACCESS_TOKEN = settings.CANVAS_API_TOKEN  # Store token in settings.py

headers = {
    'Authorization': f'Bearer {ACCESS_TOKEN}'
}

def get_canvas_user(user_id='self'):
    url = f'{API_URL}/users/{user_id}/profile'
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        return response.json()
    return {"error": f"Canvas API error: {response.status_code}"}
