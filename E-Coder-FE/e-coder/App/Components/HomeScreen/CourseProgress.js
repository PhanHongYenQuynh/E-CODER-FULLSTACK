import { View, TouchableOpacity, FlatList } from 'react-native'
import SubHeading from '../SubHeading'
import React from 'react'
import { getListProgress } from '../../Server'
import Variable from '../../Utils/Variable'
import { useUser } from "@clerk/clerk-expo";
import { useState, useEffect } from 'react';
import CourseItem from './CourseItem';
import { useNavigation } from '@react-navigation/native'

const CourseProgress = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [list, setList] = useState([]);
  const navigation = useNavigation();

  useEffect(()=>{
    if(user){
      new Promise(async()=>{
        await fetchUser(user.primaryEmailAddress.emailAddress)
      })
    }
  },[])

  const fetchUser = async(email)=>{
    const response = await getListProgress(email);
    if(response){
      setList(response);
    }
  }

  return (
    <View>
      <SubHeading text={`In Progress`} color={Variable.WHITE}/>
      <FlatList
        data={list}
        // key={courseList.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
            <TouchableOpacity onPress={()=> navigation.navigate('course-detail',{
                course: item
            })}>
                <CourseItem item={item} isShow={true}/>
            </TouchableOpacity>
        )}
      />
    </View>
  )
}

export default CourseProgress