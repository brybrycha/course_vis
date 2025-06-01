import json
from core.models import React

with open('parsed_events.json', encoding='utf-8') as f:
    events = json.load(f)

for event in events:
    name = event['className']
    detail = f"{event['title']} from {event['starttime']} to {event['endtime']}"
    if not React.objects.filter(name=name, detail=detail).exists():
        React.objects.create(name=name, detail=detail)