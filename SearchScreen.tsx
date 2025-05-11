import React, { useState } from 'react';
import { View, TextInput, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const dummyCourses = ['CSE 100', 'CSE 101', 'MATH 109', 'PHYS 2A'];

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  
    const results = dummyCourses.filter((course => 
        course.toLowerCase().includes(query.toLowerCase()))
    );

    return (
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Search for courses"
            value={query}
            onChangeText={setQuery}
          />
    
          <FlatList
            data={results}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.resultBox}>
                <Text style={styles.resultText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      container: { flex: 1, padding: 20, backgroundColor: '#fff' },
      input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        borderRadius: 8,
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