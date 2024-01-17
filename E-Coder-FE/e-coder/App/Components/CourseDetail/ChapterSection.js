import { StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { useEffect } from "react";
import { userContext } from "../../../Context/UserContext";
import { Ionicons } from '@expo/vector-icons';
import { useUser } from "@clerk/clerk-expo";
import Variable from "../../Utils/Variable";
import { getCurrentUser } from "../../Server";
import { useNavigation } from "@react-navigation/native";

const ChapterSection = ({chapterList}) => {

  const { isLoaded, isSignedIn, user } = useUser();
  const [info, setInfo] = useState('');
  const { data, loading, error, fetchData } = userContext();

  useEffect(() => {
    const fetchDataAsync = async () => {
      await fetchData(user.primaryEmailAddress.emailAddress, course._id);
    };
  
    fetchDataAsync();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getCurrentUser(user.primaryEmailAddress.emailAddress);
        if (res) {
          setInfo(res);
        }
      } catch (error) {
        console.error('Error fetching user information:', error);
        // Handle error if needed
      }
    };
  
    fetchData(); // Call the fetchData function
  
  }, [user.primaryEmailAddress.emailAddress]);

  const navigation = useNavigation();
  const onChapterPress = (content, idChapter) =>{
    if(!data){
      ToastAndroid.show('Please Enroll first', ToastAndroid.LONG);
      return;
    }else{
      navigation.navigate('chapter-content',{
        content: content,
        idChapter: idChapter
      })
    }
  }

  console.log('info', chapterList);

  return (
    <View style={{padding: 10, backgroundColor: Variable.WHITE, marginTop: 20, borderRadius: 15, marginBottom: 20}}>
      <Text style={{fontFamily: 'outfit-medium', fontSize:22}}>Chapters</Text>
      {chapterList?.map((item, index) => (
        <TouchableOpacity style={[{
          display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: 'space-between',
            padding: 15,
            borderWidth: 1,
            borderRadius: 10,
            marginTop: 10,
            borderColor: Variable.GRAY
        },{
          borderColor : item.markDown?.includes(info) ? Variable.GREEN : Variable.GRAY
        }]}
        onPress={()=>onChapterPress(item?.content, item?._id)}
        >
          <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
          key={index}
        >
          <Text
            style={{
              fontFamily: "outfit-medium",
              fontSize: 27,
              color: item.markDown?.includes(info) ? Variable.GREEN : Variable.GRAY
            }}
          >
            {index + 1}
          </Text>
          <Text
            style={{
              fontFamily: "outfit",
              fontSize: 21,
              color: item.markDown?.includes(info) ? Variable.GREEN : Variable.GRAY
            }}
          >
            {item?.title}
          </Text>
        </View>
        {
          !loading && data ? (
            <Ionicons name="play" size={25} color={item.markDown?.includes(info) ? Variable.GREEN : Variable.GRAY} />
          ) : (
            <Ionicons name="md-lock-closed-outline" size={25} color={Variable.GRAY} />
          )
        }
          </TouchableOpacity>
      ))}
    </View>
  );
};

export default ChapterSection;

const styles = StyleSheet.create({});
