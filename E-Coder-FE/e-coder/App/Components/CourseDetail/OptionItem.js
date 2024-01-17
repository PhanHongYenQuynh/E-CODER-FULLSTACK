import { StyleSheet, Text, View } from 'react-native'
import { Ionicons } from "@expo/vector-icons";
import React from 'react'

const OptionItem = ({icon,value}) => {
  return (
    <View
    style={{
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
      marginTop: 5,
    }}
  >
    <Ionicons name={icon} size={18} color="black" />
    <Text style={{fontFamily: 'outfit'}}>{value}</Text>
  </View>
  )
}

export default OptionItem

const styles = StyleSheet.create({})