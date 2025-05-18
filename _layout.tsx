import React from 'react';
import TimeBlock from '@/components/ui/TimeBlock';
import { View, StyleSheet, Text, ScrollView } from 'react-native';

const days = ['M', 'T', 'W', 'Th', 'F'];
const times = Array.from({ length: 14 }, (_, i) => `${String(i + 8).padStart(2)}`);


export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.gridContainer}>
        <View style={styles.headerRow}>
          <View style={styles.emptyCorner} />
          {days.map((day) => (
            <View key={day} style={styles.dayBox}>
              <Text style={styles.dayText}>{day}</Text>
            </View>
          ))}
        </View>
  
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          bounces={false}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.timeLine}>
            <View style={styles.timeColumn}>
              {times.map((time) => (
                <View key={time} style={styles.timeBox}>
                  <Text style={styles.timeText}>{time}</Text>
                </View>
              ))}
              <View style={styles.timeBoxLast}>
                <Text style={styles.timeText}>22</Text>
              </View>
            </View>
  
            {days.map((day) => (
              <View key={day} style={styles.dayColumn}>
                {times.map((time) => (
                  <View key={time} style={styles.timeBox} />
                ))}
                <View style={styles.timeBoxLast} />
              </View>
            ))}
  
            <View style={styles.blocksWrapper}>
              <TimeBlock startHour={9} endHour={10.5} subject="Econ 100A" day="Mon" />
              <TimeBlock startHour={13} endHour={14} subject="DSC 10" day="Wed" />
            </View>
          </View>
        </ScrollView>
      </View> {/* ✅ This now closes gridContainer properly */}
    </View>
  );
}
const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    paddingHorizontal: 20,
  },

  gridContainer: {
    flex: 1,
    backgroundColor: '#fff',
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#c5d1e5',
    borderRadius: 24,
    overflow: 'hidden',
  },

  headerRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#c5d1e5',
    backgroundColor: '#f8f9fa',
  },

  emptyCorner: {
    width: 30,
    borderRightWidth : 1,
    borderColor: '#c5d1e5',
  },

  dayBox: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRightWidth: 1,
    borderColor: '#c5d1e5',
  },

  dayText: {
    fontSize: 15,
    fontWeight: '500',
  },

  timeLine: {
    flexDirection: 'row',
    flex: 1,
    position: 'relative',
  },

  timeColumn: {
    width: 30,
    borderRightWidth: 1,
    borderColor: '#c5d1e5',
  },

  dayColumn: {
    flex: 1,
    borderRightWidth: 1,
    borderColor: '#c5d1e5',
  },

  timeBox: {
    height: 100,
    alignItems: 'flex-end',
    borderBottomWidth : 1,
    borderColor : '#c5d1e5',
    paddingTop: 10,
    paddingRight: 5,
  },

  timeBoxLast: {
    height: 100,
    alignItems: 'flex-end',
    paddingTop: 10,
    paddingRight: 5,
    borderBottomWidth: 1,
    borderColor: '#c5d1e5',
  },

  timeText: {
    fontSize: 12,
    fontWeight: '500',
  },

  blocksWrapper: {
    position: 'absolute',
    top: 0,
    left: 33, // 타임라인 시간 텍스트 칼럼 너비만큼 밀기
    width: '100%',
    height: '100%',
    zIndex: 10, // 격자보다 위에
  }
});
