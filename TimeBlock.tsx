import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const HOUR_HEIGHT = 100;
const DAY_COLUMN_WIDTH = 70;
const START_HOUR = 8;
const date = new Date();
const datIndex = date.getDay();

const dayMap = {
  Mon: 0,
  Tue: 1,
  Wed: 2,
  Thu: 3,
  Fri: 4,
  M: 0,
  T: 1,
  W: 2,
  Th: 3,
  F: 4,
};

type TimeBlockProps = {
  startHour: number;
  endHour: number;
  subject: string;
  day: string; // e.g., 'Mon', 'Tue', etc.
  onPress?: () => void;
};

export default function TimeBlock({ startHour, endHour, subject, day }: TimeBlockProps) {
  const top = (startHour - START_HOUR) * HOUR_HEIGHT;
  const height = (endHour - startHour) * HOUR_HEIGHT;
  const left = dayMap[day] * DAY_COLUMN_WIDTH;

  return (
    <View style={[styles.block, { top, height, left }]}>
      <Text style={styles.text}>{subject}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    position: 'absolute',
    width: DAY_COLUMN_WIDTH,
    backgroundColor: '#87CEEB',
    borderRadius: 8,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
  },
  text: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
});


