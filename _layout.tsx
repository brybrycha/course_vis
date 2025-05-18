import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import TimeBlock from '@/components/ui/TimeBlock';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { View, StyleSheet, Text, ScrollView } from 'react-native';


export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}

export default function ScheduleScreen() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

  return (
    <ScrollView horizontal>
      <View>
        {/* 요일 헤더 */}
        <View style={styles.dayHeaderRow}>
          <View style={styles.timeLabelCell} /> {/* 비어있는 시간 라벨 칸 */}
          {days.map((day, idx) => (
            <View key={idx} style={styles.dayCell}>
              <Text style={styles.dayText}>{day}</Text>
            </View>
          ))}
        </View>

        <View style={styles.scheduleBody}>
          {/* 시간 라벨 (8AM~5PM) */}
          <View style={styles.timeColumn}>
            {Array.from({ length: 15 }, (_, i) => (
              <View key={i} style={styles.timeRow}>
                <Text>{`${8 + i}:00`}</Text>
              </View>
            ))}
          </View>

          {/* 과목 블록 (TimeBlock들) */}
          <View style={styles.blocksWrapper}>
            <TimeBlock startHour={9} endHour={10.5} subject="Econ 100A" day="Mon" />
            <TimeBlock startHour={13} endHour={14} subject="DSC 10" day="Wed" />
            {/* 추가 TimeBlock들 */}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  dayHeaderRow: {
    flexDirection: 'row',
    marginBottom: 5,
    marginLeft: 50,
    marginTop: 55, // time label column offset
  },
  dayCell: {
    width: 50,
    alignItems: 'center',
  },
  dayText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  timeLabelCell: {
    width: 50,
  },
  scheduleBody: {
    flexDirection: 'row',
  },
  timeColumn: {
    width: 50,
  },
  timeRow: {
    height: 60,
    marginLeft: 5,
    justifyContent: 'center',
  },
  blocksWrapper: {
    position: 'relative',
    width: 70 * 5,
  },
});