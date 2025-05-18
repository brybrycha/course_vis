import fetch from 'node-fetch';
import ical from 'ical';
import { formatInTimeZone } from 'date-fns-tz';

const ICS_URL = 'https://canvas.ucsd.edu/feeds/calendars/user_H0VROqlmlxzHT8Ei1Jt0JJubFmNFEuLfTtYryGj2.ics';

async function fetchAndParseICS() {
  try {
    const response = await fetch(ICS_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch ICS file: ${response.statusText}`);
    }

    const icsText = await response.text();
    const events = ical.parseICS(icsText);

    const parsedEvents = Object.values(events)
      .filter(event => event.type === 'VEVENT')
      .map(event => ({
        starttime: formatInTimeZone(
          event.start,
          'America/Los_Angeles',
          'yyyy-MM-dd hh:mm a zzz'
        ),
        endtime: event.end ? formatInTimeZone(
          event.end,
          'America/Los_Angeles',
          'yyyy-MM-dd hh:mm a zzz'
        ) : 'N/A',
        title: event.summary.match(/^(.*?(?:\)|(?=\[)))/)?.[1]?.trim() || 'Untitled',
        className: event.summary.match(/\[([A-Z]+\d+[A-Z]*?)_/)?.[1] || 'Unknown',
      }));

    console.log('Parsed Events:', parsedEvents);
    return parsedEvents;
  } catch (error) {
    console.error('Error:', error.message);
  }
}

fetchAndParseICS();