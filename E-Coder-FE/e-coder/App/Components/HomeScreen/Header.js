import {
  View,
  StyleSheet,
  Image,
  Text,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { useUser } from "@clerk/clerk-expo";
import React, { useState } from "react";
import Variable from "../../Utils/Variable";
import CoinImg from "../../../assets/images/coin.png";
import { AntDesign } from "@expo/vector-icons";
import { signUpApp, getDetailPoint } from "../../Server";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

const Header = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [text, setText] = useState("");
  const [point, setPoint] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    const signUpUser = async () => {
      try {
        const res = await signUpApp({
          name: user.fullName,
          email: user.primaryEmailAddress.emailAddress,
          password: 123456,
        });

        console.log("Sign-up successful");

        if (res) {
          console.log("Response:", res);
        }
      } catch (error) {
        console.error("Error signing up:", error.message);
      }
    };

    signUpUser();
  }, [user]); // Add dependencies if needed

  useEffect(() => {
    if (user.primaryEmailAddress.emailAddress) {
      new Promise(async () => {
        await fetchPoint(user.primaryEmailAddress.emailAddress);
      });
    }
  }, []);

  const fetchPoint = async (email) => {
    const res = await getDetailPoint(email);
    if (res) {
      setPoint(res);
    }
  };

  const handleSearch = () => {
    if (text) {
      navigation.navigate("search-course", {
        text: text,
      });
    }
  };

  return (
    isLoaded && (
      <View>
        <View style={[styles.row, { justifyContent: "space-between" }]}>
          <View style={styles.row}>
            <Image style={styles.image} source={{ uri: user.imageUrl }} />
            <View>
              <Text
                style={{
                  color: Variable.WHITE,
                  fontFamily: "outfit",
                }}
              >
                Welcome
              </Text>
              <Text style={styles.mainTitle}>{user?.fullName}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <Image style={{ height: 30, width: 30 }} source={CoinImg} />
            <Text style={{ fontFamily: "outfit-bold", color: Variable.WHITE }}>
              {point}
            </Text>
          </View>
        </View>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              borderRadius: 99,
              marginTop: 30,
              padding: 10,
              marginHorizontal: 5,
              backgroundColor: Variable.WHITE,
            }}
          >
            <TextInput
              placeholder="Search..."
              value={text}
              onChangeText={(value) => setText(value)}
              style={{
                backgroundColor: Variable.WHITE,
                padding: 5,
                fontSize: Variable.FONT_SIZE,
              }}
            />

            <TouchableOpacity
              onPress={handleSearch}
              style={{
                backgroundColor: Variable.PRIMARY,
                padding: 5,
                borderRadius: 99,
              }}
            >
              <View
                style={{
                  backgroundColor: Variable.PRIMARY,
                  padding: 5,
                  borderRadius: 99,
                }}
              >
                <AntDesign name="search1" size={25} color={Variable.WHITE} />
              </View>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  row: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 99,
  },
  mainTitle: {
    fontFamily: "outfit-bold",
    fontSize: 16,
    color: Variable.WHITE,
  },
});

export default Header;
