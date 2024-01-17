import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { getCourseList } from "../../Server";
import SubHeading from "../SubHeading";
import Variable from "../../Utils/Variable";
import CourseItem from "./CourseItem";
import { useNavigation } from "@react-navigation/native";

export default function CourseList({ level }) {
  const [courseList, setCourseList] = useState();
  const navigation =  useNavigation();

  useEffect(() => {
    new Promise(async () => {
      if(level){
        await getCourse(level);
      }
    });
  }, [level]);

  const getCourse = async (level) => {
    const response = await getCourseList(level);
    if (response) {
      setCourseList(response);
    }
  };

  return (
    <View style={{marginTop: 15}}>
      <SubHeading text={`${level} Course`} color={level == 'Basic' && Variable.BLACK}/>
      <FlatList
        data={courseList}
        // key={courseList.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
            <TouchableOpacity onPress={()=> navigation.navigate('course-detail',{
                course: item
            })}>
                <CourseItem item={item}/>
            </TouchableOpacity>
        )}
      />
    </View>
  );
}
