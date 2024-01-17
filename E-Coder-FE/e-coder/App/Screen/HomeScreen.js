import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Colors from '../Utils/Variable';
import Header from '../Components/HomeScreen/Header';
import CourseList from '../Components/HomeScreen/CourseList';
import CourseProgress from '../Components/HomeScreen/CourseProgress';
import { RefreshControl } from 'react-native';

const HomeScreen = () => {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);


  return (
    <ScrollView
     refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }>
    <View style={styles.container}> 
      <Header/>
    </View>
    <View style={{padding: 20}}>
      <View style={{marginTop: -100}}>
        <CourseProgress/>
      <CourseList level={'Basic'}/>
      <CourseList level={'Advantage'} />
      </View>
    </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.PRIMARY,
    height: 300,
    paddingTop: 50,
    paddingHorizontal: 10
  },
});

export default HomeScreen