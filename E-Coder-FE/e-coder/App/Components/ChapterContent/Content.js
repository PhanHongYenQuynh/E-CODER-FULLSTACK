import {
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import ProgressBar from "./ProgressBar";
import { useUser } from "@clerk/clerk-expo";
import ContentItem from "./ContentItem";
import Variable from "../../Utils/Variable";
import { postLearnChapter } from "../../Server";
import { useNavigation } from "@react-navigation/native";

const Content = ({ content, idChapter }) => {
  const { isLoaded, isSignedIn, user } = useUser();


  let contentRef;
  const navigation = useNavigation();
  const [activeIndex, setActiveIndex] = useState(0);

  const onNextBtnPress = async(index) => {
    if(content?.length <= index+1) {
      const response = await postLearnChapter(user.primaryEmailAddress.emailAddress,idChapter);
        if(response){
          navigation.goBack();
          return;
        }
    }
    setActiveIndex(index +1)
    contentRef.scrollToIndex({ animated: true, index: index + 1 });
  };
  

  return (
    <View style={{ padding: 20 }}>
      <ProgressBar contentLength={content?.length} contentIndex={activeIndex} />

      <FlatList
        data={content}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        ref={(ref) =>{
          contentRef = ref;
        }}
        renderItem={({ item ,index}) => (
          <View
            style={{
              width: Dimensions.get("screen").width * 0.897,
            }}
          >
            <Text
              style={{
                fontFamily: "outfit-medium",
                fontSize: 22,
                marginTop: 15,
              }}
            >
              {item.heading}
            </Text>
            <ContentItem
              description={item?.description}
              output={item?.output}
            />
            <TouchableOpacity
            onPress={()=> onNextBtnPress(index)}
              style={{
                padding: 10,
                backgroundColor: Variable.PRIMARY,
                color: Variable.WHITE,
                borderRadius: 10,
                margin: 20,
              }}
            >
              <Text
                style={{
                  color: Variable.WHITE,
                  textAlign: "center",
                  fontSize: 17,
                  fontFamily: "outfit",
                }}
              >
                {
                content?.length <= index+1 ? 'Finish': 'Next'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default Content;
