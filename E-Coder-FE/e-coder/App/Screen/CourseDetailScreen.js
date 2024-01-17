import { View, Text, RefreshControl, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DetailSection from '../Components/CourseDetail/DetailSection';
import ChapterSection from '../Components/CourseDetail/ChapterSection';
import { UserContextProvider } from '../../Context/UserContext';
import { getDetailCourse } from '../Server';

const CourseDetailScreen = () => {
    const navigate = useNavigation();
    const params = useRoute().params;
    const [detail, setDetail] = useState();
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      setTimeout(() => {
        fetchDetail(params?.course?._id);
        setRefreshing(false);
      }, 2000);
    }, []);

    useEffect(()=>{
      new Promise(async()=>{
        await fetchDetail(params?.course?._id);
      })
    },[])

    const fetchDetail = async(id) =>{
      const response  = await getDetailCourse(id);
      if(response){
        setDetail(response);
      }
    }

    console.log(detail?.chapterId);

  return  params.course && !refreshing && (
    <ScrollView 
    // contentContainerStyle
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }
    style={{paddingTop: 50, paddingLeft: 20}}
    >
        <TouchableOpacity onPress={()=> navigate.goBack()}>
      <Ionicons name="ios-arrow-back-circle" size={40} color="black" />
        </TouchableOpacity>
        <UserContextProvider>
      <DetailSection course={params.course}/>
      <ChapterSection chapterList={detail?.chapterId}/>
        </UserContextProvider>
    </ScrollView>
  )
}

export default CourseDetailScreen