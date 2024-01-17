import {
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import RenderHTML from "react-native-render-html";
import Variable from "../../Utils/Variable";

const ContentItem = ({ description, output }) => {
  const width = useWindowDimensions().width;
  const [isRun, setIsRun] = useState(false);
  const descriptionSource = {
    html: description,
  };

  const outputSource = {
    html: output,
  };

  const tagsStyles = {
    body: {
      fontFamily: "outfit",
      fontSize: 17,
      marginTop: 20,
      borderRadius: 15,
    },
    code: {
      backgroundColor: Variable.BLACK,
      color: Variable.WHITE,
      padding: 20,
      borderRadius: 15,
    },
  };

  const outputStyles = {
    body: {
      fontFamily: "outfit",
      fontSize: 17,
      backgroundColor: Variable.BLACK,
      color: Variable.WHITE,
      padding: 20,
      borderRadius: 15,
    },
  };

  return (
    description && (
      <ScrollView style={{ padding: 20 }}>
        <RenderHTML
          contentWidth={width}
          tagsStyles={tagsStyles}
          source={descriptionSource}
        />
        {output !== null && (
          <TouchableOpacity
            onPress={() => setIsRun(!isRun)}
            style={{ width: 100 }}
          >
            <Text
              style={{
                padding: 12,
                backgroundColor: Variable.PRIMARY,
                borderRadius: 15,
                fontFamily: "outfit",
                fontSize: 14,
                marginTop: 10,
                color: Variable.WHITE,
                width: 100,
                textAlign: "center",
                marginBottom: 20,
              }}
            >
              {isRun ? "Back" : "Run"}
            </Text>
          </TouchableOpacity>
        )}
        {isRun ? (
          <>
            <Text
              style={{
                fontFamily: "outfit-medium",
                fontSize: 17,
                marginBottom: 10,
              }}
            >
              OutPut
            </Text>
            <RenderHTML
              contentWidth={width}
              tagsStyles={outputStyles}
              source={outputSource}
            />
          </>
        ) : null}
      </ScrollView>
    )
  );
};

export default ContentItem;
