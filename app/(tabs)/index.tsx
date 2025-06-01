import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';

interface CalendarEvent {
  starttime: string;
  endtime: string;
  title: string;
  className: string;
}

export default function App() {
  const [details, setDetails] = useState([]);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [user, setUser] = useState('');
  const [quote, setQuote] = useState('');

  useEffect(() => {
    fetchQuotes();
    fetchCalendarEvents();
  }, []);

  const fetchQuotes = () => {
    axios.get('http://100.64.20.49:8000/wel/')  // Replace with LAN IP when using physical device
      .then(res => setDetails(res.data))
      .catch(err => console.log(err));
  };

  const fetchCalendarEvents = () => {
    axios.get('http://100.64.20.49:8000/calendar-events/')
      .then(res => setEvents(res.data))
      .catch(err => console.log('Calendar error:', err));
  };

  const handleSubmit = () => {
    axios.post('http://localhost:8000/wel/', {
      name: user,
      detail: quote,
    })
    .then(res => {
      setUser('');
      setQuote('');
      fetchQuotes(); // Refresh quotes
    })
    .catch(err => console.log(err));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      <Text style={styles.title}>Calendar Events</Text>
      {events.map((event, idx) => (
        <View key={idx} style={styles.eventCard}>
          <Text style={styles.eventTitle}>{event.title}</Text>
          <Text style={styles.eventTime}>Start: {event.starttime}</Text>
          <Text style={styles.eventTime}>End: {event.endtime}</Text>
          <Text style={styles.className}>{event.className}</Text>
        </View>
      ))}
        
      <Text style={styles.title}>Submit a Quote</Text>

      <TextInput
        style={styles.input}
        placeholder="Author"
        value={user}
        onChangeText={setUser}
      />
      <TextInput
        style={styles.input}
        placeholder="Your Quote"
        multiline
        numberOfLines={3}
        value={quote}
        onChangeText={setQuote}
      />
      <Button title="Submit" onPress={handleSubmit} />

      <View style={styles.divider} />

      {details.map((detail, idx) => (
        <View key={idx} style={styles.quoteCard}>
          <Text style={styles.quoteText}>{detail.detail}</Text>
          <Text style={styles.authorText}>— {detail.name}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  input: {
    borderColor: '#999',
    borderWidth: 1,
    padding: 12,
    borderRadius: 6,
    marginBottom: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 16,
  },
  quoteCard: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  quoteText: {
    fontSize: 18,
    fontStyle: 'italic',
  },
  authorText: {
    marginTop: 8,
    textAlign: 'right',
    fontWeight: '600',
  },
  eventCard: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  eventTime: {
    marginTop: 4,
    color: '#666',
  },
  className: {
    marginTop: 8,
    fontWeight: '600',
    color: '#0a7ea4',
  },
});
