import { View, Text } from "react-native";
import React from "react";
import Content from "../Components/ChapterContent/Content";
import { useRoute } from "@react-navigation/native";

const ChapterContentScreen = () => {
  const params = useRoute().params;

  console.log(params);

  return (
    params.content && (
      <View>
        <Content content={params.content} idChapter={params.idChapter} />
      </View>
    )
  );
};

export default ChapterContentScreen;
