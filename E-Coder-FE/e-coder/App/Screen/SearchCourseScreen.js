import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getSearch } from "../Server";
import CourseProgressItem from "../Components/MyCourse/CourseProgressItem";

const SearchCourseScreen = () => {
  const navigate = useNavigation();
  const routes = useRoute();
  const [listCourse, setListCourse] = useState([]);
  const [isSearch, setIsSearch] = useState(false);

  useEffect(() => {
    if (routes.params?.text) {
      new Promise(async () => {
        await search(routes.params?.text);
      });
    }
  }, [routes.params?.text]);

  const search = async (textName) => {
    const response = await getSearch(textName);
    setIsSearch(true);
      setListCourse(response);
  };

  return (
    <View>
      <View
        style={{
          padding: 50,
          paddingLeft: 20,
        }}
      >
        <TouchableOpacity onPress={() => navigate.goBack()}>
          <Ionicons name="ios-arrow-back-circle" size={40} color="black" />
        </TouchableOpacity>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: 30,
          }}
        >
          <Text style={{ fontFamily: "outfit", fontSize: 20 }}>Search :</Text>
          <Text
            style={{
              fontFamily: "outfit-medium",
              fontSize: 20,
              marginLeft: 20,
            }}
          >
            {routes.params?.text}
          </Text>
        </View>
        {
            isSearch ? (
                <>
                {listCourse.length > 0 && (
          <FlatList
            data={listCourse}
            style={{
              marginTop: 10,
              width: Dimensions.get('window').width - 20,
            }}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  margin: 8,
                  padding: 5,
                  width: '100%'
                }}
                onPress={() =>
                  navigate.navigate("course-detail", {
                    course: item,
                  })
                }
              >
                <CourseProgressItem item={item} />
              </TouchableOpacity>
            )}
          />
        )}
        {listCourse.length <= 0 &&
          isSearch && (
            <Text
              style={{
                marginTop: 50,
                textAlign: "center",
                fontFamily: "outfit",
                fontSize: 25,
                color: "red",
              }}
            >
              Not Found Item :((
            </Text>
          )}

                </>
            ) : (
                <ActivityIndicator size={'large'} style={{marginTop: 20}}/>
            )
        }
      </View>
    </View>
  );
};

export default SearchCourseScreen;