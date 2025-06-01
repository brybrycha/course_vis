import React, { useState, useEffect} from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList, Course } from '../types/navigation';
import TimeBlock from './timeblock';

const days = ['M', 'T', 'W', 'Th', 'F'];
const times = Array.from({ length: 14 }, (_, i) => `${String(i + 8).padStart(2)}`);


/* 현황 : SearchScreen에서 course를 선택하면 그 course 정보들을 HomeScreen으로 넘기는 데 까진 했음.
    HomeScreen에서  화면에 표시하는 부분까진 구현 됐지만 배열이 엉망이고 다른 거를 추가하면 이전게 화면에서 사라짐(setCourses 부분이 잘못된듯??). 
    => Homescreen과 Timeblock 컴포넌트 사이의 관계를 정립해야 할 것 
*/

export default function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'Home'>>();
  const course: Course | undefined = route.params?.course;
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    if (course && !courses.some((c) => c.subject == course.subject)) {
      setCourses((prev) => [
        ...prev, 
        {
          subject : course.subject,
          startHour : course.startHour,
          endHour : course.endHour,
          day : course.day,
        },
      ]);
    }
  }, [course]);

  return (
    <View style={styles.container}>

        <View style={styles.header}>
          <Text style={styles.title}>SP25</Text>

          <Ionicons 
            name="add-outline" 
            size={25} 
            style={styles.addIcon}
            onPress={() => navigation.navigate('Search')}
          />
      </View>

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
          </View>
          {courses.map((course, index) => (
            <TimeBlock
            key={index}
            startHour={course.startHour}
            endHour={course.endHour}
            subject={course.subject}
            day={course.day}
            />
            ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 0,
    paddingHorizontal: 10,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 0,
    paddingHorizontal: 10,
  },

  addIcon: {
    padding: 5,
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
  
});
