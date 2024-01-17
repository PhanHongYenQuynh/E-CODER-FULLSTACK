import { View, Text } from 'react-native'
import React from 'react'
import Variable from '../../Utils/Variable'

const CourseProgressBar = ({totalChapter}) => {

  return (
    <View
     style={{
        width: '100%',
        height: 7,
        backgroundColor: Variable.GRAY,
        borderRadius: 99,

     }}
    >
      <View style={{
         width: `${totalChapter ?? 0}%`,
         height: 7,
         backgroundColor: Variable.PRIMARY,
         borderRadius: 99,
      }}>

      </View>
    </View>
  )
}

export default CourseProgressBar