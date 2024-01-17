import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import Variable from '../Utils/Variable'
import { useUser } from "@clerk/clerk-expo";
import { useState, useEffect } from 'react';
import { getListProgress } from '../Server';
import { useNavigation } from '@react-navigation/native'
import CourseProgressItem from '../Components/MyCourse/CourseProgressItem';


const MyCourse = () => {

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
      <View style={{
        height: 160,
        backgroundColor: Variable.PRIMARY,
        padding: 30,

      }}>
      <Text style={{
        fontFamily: 'outfit-medium',
        color: Variable.WHITE,
        fontSize: 30,
        marginTop: 30
      }}>My Course</Text>
      </View>
      <FlatList
        data={list}
        style={{
          marginTop: -40
        }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
            <TouchableOpacity 
            style={{
              margin: 8,
              padding: 5,

            }}
            onPress={()=> navigation.navigate('course-detail',{
                course: item
            })}>
                <CourseProgressItem item={item} isShow={true}/>
            </TouchableOpacity>
        )}
      />
    </View>
  )
}

export default MyCourse