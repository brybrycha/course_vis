import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons'; 
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
           <Stack.Navigator>
                <Stack.Screen 
                    name="Home" 
                    component={HomeScreen} 
                    options = {({ navigation }) => ({
                        headerTitle: () => (
                            <Text style={{ fontSize: 18, fontWeight: 'bold', paddingLeft: 10 }}>
                                SP25
                            </Text>
                        ),
                        headerRight: () => (
                            <Ionicons
                                name="add-outline"
                                size={25}
                                style={{ paddingRight : 0, marginTop : -5}}
                                onPress={() => navigation.navigate('Search')} 
                            />   
                        ),
                        headerStyle: {
                            backgroundColor : 'white',
                            elevation : 0,
                            shadowColor : 'transparent',      
                        },
                        })}
                />
                <Stack.Screen 
                    name="Search" 
                    component={SearchScreen} 
                    options={{ title : 'Courses' }}
                />
            </Stack.Navigator> 
        </NavigationContainer>
    );
}
