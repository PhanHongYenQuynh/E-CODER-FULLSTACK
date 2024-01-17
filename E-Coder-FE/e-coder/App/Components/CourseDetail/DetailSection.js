import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import Variable from "../../Utils/Variable";
import OptionItem from "./OptionItem";
import { TouchableOpacity } from "react-native-gesture-handler";
import { postErrolCourse,checkingUser } from "../../Server";
import { userContext } from "../../../Context/UserContext";
import { useUser } from "@clerk/clerk-expo";
import Loading from "../Loading";
import { useNavigation } from "@react-navigation/native";

const DetailSection = ({ course }) => {
  const { isLoaded, isSignedIn, user } = useUser();
  const { data, loading, error, fetchData } = userContext();
  const navigation = useNavigation();
  
  useEffect(() => {
    const fetchDataAsync = async () => {
      await fetchData(user.primaryEmailAddress.emailAddress, course._id);
    };
  
    fetchDataAsync();
  }, []);
  

  const addEnrollMember = async(idCourse, idUser) =>{
    console.log('pookoko');
    try {
      const response = await postErrolCourse(idUser, idCourse);
      if(response){
        await fetchData(user.primaryEmailAddress.emailAddress, course._id);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const upgradeEnrollMember =  async(idCourse, idUser) =>{
    navigation.navigate('course-unlock',{
      idCourse, idUser
    })
  }
  
  if(loading){
    return (
      <Loading/>
    )
  }
  

  return (
    <View
      style={{ padding: 10, borderRadius: 15, backgroundColor: Variable.WHITE }}
    >
      <Image
        source={{ uri: course?.banner }}
        style={{
          width: Dimensions.get("screen").width * 0.9,
          height: 190,
          borderRadius: 15,
        }}
      />
      <View style={{ padding: 10 }}>
        <Text
          style={{
            fontFamily: "outfit-medium",
            fontSize: 24,
            marginTop: 10,
          }}
        >
          {course.name}
        </Text>

        <View>
          <View style={styles.rowStyle}>
            <OptionItem
              icon={"book-outline"}
              value={course?.chapterId?.length + "Chapters"}
            />
            <OptionItem icon={"md-time-outline"} value={course?.time} />
          </View>
          <View style={styles.rowStyle}>
            <OptionItem icon={"person-circle-outline"} value={"tac gia"} />
            <OptionItem icon={"cellular-outline"} value={course?.level} />
          </View>
          <View>
            <Text style={{ fontFamily: "outfit-medium", fontSize: 20 }}>
              Description
            </Text>
            <Text
              style={{
                fontFamily: "outfit",
                color: Variable.GRAY,
                lineHeight: 23,
                marginBottom: 20
              }}
            >
              {course?.description}
            </Text>
          </View>
        </View>
        
        <View style={{display: 'flex', flexDirection: 'row', gap: 20, justifyContent: 'space-evenly'}}>
              <TouchableOpacity onPress={()=>addEnrollMember(course._id, user.primaryEmailAddress.emailAddress)} style={{padding: 15, borderRadius: 15,  backgroundColor : !loading && data ? Variable.GRAY : Variable.PRIMARY}}>
                <Text style={{
                  fontFamily: 'outfit',
                  color: Variable.WHITE,
                  textAlign: 'center',
                  fontSize: 17,
                }}>Enroll for free</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={()=> upgradeEnrollMember(course._id, user.primaryEmailAddress.emailAddress)}
              style={{padding: 15 , borderRadius: 15,  backgroundColor : !loading && data ? Variable.GRAY : Variable.SECONDARY}}>
                <Text style={{
                  fontFamily: 'outfit',
                  color: Variable.WHITE,
                  textAlign: 'center',
                  fontSize: 17
                }}>Membership ${course?.price}</Text>
              </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DetailSection;

const styles = StyleSheet.create({
  rowStyle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
});
