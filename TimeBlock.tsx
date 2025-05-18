// components/TimeBlock.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type TimeBlockProps = {
  startHour: number; // 예: 9
  endHour: number;   // 예: 10.5 (10시 30분)
  subject: string;
  day: string;
  color?: string;
};

const TimeBlock: React.FC<TimeBlockProps> = ({ startHour, endHour, subject, day, color = '#FFA07A' }) => {
  const top = (startHour - 8) * 60; // 8AM을 기준으로 시작 (60px per hour)
  const height = (endHour - startHour) * 60;
  const dayColumn = {
    Mon : 0,
    Tue : 1,
    Wed : 2,
    Thu : 3,
    Fri : 4,
  };
  const left = dayColumn[day] * 70;
  return (
    <TouchableOpacity
    style={[styles.block, { top, height, backgroundColor: color }]}
    onPress={() => alert(`지유님 컴포넌트로 이동`)}
    activeOpacity={0.8}
  >
      <Text style={styles.text}>{subject}</Text>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  block: {
    position: 'absolute',
    left: 50,
    right: 250,
    borderRadius: 8,
    padding: 8,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 10,
    textAlign: 'center',
  },
});

export default TimeBlock;
