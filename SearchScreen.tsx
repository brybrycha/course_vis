import React, { useState } from 'react';
import { View, TextInput, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, Course } from '../types/navigation';

const dummyCourses : Course[] = [
  { subject: 'CS100', startHour: 9, endHour: 10, day: 'MON' },
  { subject: 'DOC20', startHour: 10, endHour: 11, day: 'TUE' },
  { subject: 'MATH20D', startHour: 11, endHour: 12, day: 'WED' },
  { subject: 'PHYS 2A', startHour: 12, endHour: 13, day: 'THU' },
];

export default function SearchScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [query, setQuery] = useState('');
  
    const results = dummyCourses.filter((course => 
        course.subject.toLowerCase().includes(query.toLowerCase()))
    );

    return (
        <View style={styles.container}>

          <View style={styles.header}>
            <Ionicons
              name = "chevron-back-outline"
              size={22} 
              style={styles.addIcon}
              onPress={() => navigation.goBack()}
            />
          </View>

          <TextInput
            style={styles.input}
            placeholder="Search for courses"
            value={query}
            onChangeText={setQuery}
          />
    
          <FlatList
            data={results}
            keyExtractor={(item) => item.subject}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={styles.resultBox}
                onPress={() => 
                  Alert.alert(
                    'Do you want to add the course?', '',
                  [
                    { text: 'Cancel', 
                      style: 'cancel' 
                    },
                    { text: 'Add', 
                      onPress : () => navigation.navigate('Home', { course: item }),
                    },
                  ]
                )
              }
              >
                <Text style={styles.resultText}>{item.subject}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      container: { flex: 1, padding: 20, backgroundColor: '#fff' },

      header : {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 0,
      },

      addIcon: {
        marginTop: 35,
        marginLeft : -5
      },

      input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        borderRadius: 8,
        marginTop : 15,
        marginBottom: 15,
        fontSize: 16,
      },

      resultBox: {
        padding: 12,
        backgroundColor: '#f2f4f8',
        marginBottom: 10,
        borderRadius: 8,
      },

      resultText: {
        fontSize: 16,
      },

});
