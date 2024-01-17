import { View, Text } from 'react-native'
import React from 'react'
import Variable from '../Utils/Variable'

export default function SubHeading({text, color=Variable.BLACK}) {
  return (
    <View style={{marginBottom: 10}}>
      <Text style={{
        fontFamily: 'outfit-bold',
        fontSize: 24,
        color: color
    }}>{text}</Text>
    </View>
  )
}