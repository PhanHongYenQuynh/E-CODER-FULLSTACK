import { View, Text } from 'react-native'
import React from 'react';
import Variable from '../../Utils/Variable';
import { Image } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import CourseProgressBar from './CourseProgressBar';

const CourseItem = ({item, isShow= false}) => {

  return (
    <View
    style={{
      padding: 10,
      backgroundColor: Variable.WHITE,
      marginRight: 15,
      borderRadius: 15,
    }}
  >
    <Image
      source={{ uri: item?.banner }}
      style={{ width: 210, height: 120, borderRadius: 15 }}
    />
    <View
      style={{
        padding: 7,
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-medium",
          fontSize: 17,
        }}
      >
        {item.name}
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            marginTop: 5,
          }}
        >
          <Ionicons name="book-outline" size={18} color="black" />
          <Text style={{fontFamily: 'outfit'}}>{item?.chapterId.length} Chapters</Text>
        </View>
        <View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              marginTop: 5,
            }}
          >
            <Ionicons name="md-time-outline" size={18} color="black" />
            <Text style={{fontFamily: 'outfit'}}>{item?.time}</Text>
          </View>
          <View></View>
        </View>
      </View>
      <View>
        <Text
          style={{
            marginTop: 5,
            color: Variable.PRIMARY,
            fontFamily: "outfit-medium",
          }}
        >
          {item?.price ? item.price : "Free"}
        </Text>
      </View>
    </View>
    {isShow && <CourseProgressBar totalChapter={item.step}/> }
  </View>
  )
}

export default CourseItem