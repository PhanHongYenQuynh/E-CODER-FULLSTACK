import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screen/HomeScreen';
import CourseDetailScreen from '../Screen/CourseDetailScreen';
import ChapterContentScreen from '../Screen/ChapterContentScreen';
import UnlockScreen from '../Screen/UnlockScreen';
import SearchCourseScreen from '../Screen/SearchCourseScreen';


const Stack = createStackNavigator();
export default function HomeScreenNavigation() {
  return (
    <Stack.Navigator screenOptions={{
        headerShown: false 
    }}>
        <Stack.Screen name='Home' component={HomeScreen}/>
        <Stack.Screen name='chapter-content' component={ChapterContentScreen}/>
        <Stack.Screen name='course-detail' component={CourseDetailScreen}/>
        <Stack.Screen name='course-unlock' component={UnlockScreen}/>
        <Stack.Screen name='search-course' component={SearchCourseScreen}/>
    </Stack.Navigator>
  )
}