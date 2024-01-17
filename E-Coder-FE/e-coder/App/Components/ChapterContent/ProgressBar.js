import { View, Text } from 'react-native'
import React from 'react'
import Variable from '../../Utils/Variable';

const ProgressBar = ({contentLength, contentIndex}) => {
    const arraySie = Array.from({length: contentLength}, (_, index)=> index);
    const width = 100/contentLength;
  
    return (
    <View style={{
        paddingTop: 50,
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'space-between'
        }}>
      {
        arraySie.map((item, index) =>(
            <View style={{
                backgroundColor: `${index <= contentIndex ? Variable.GREEN: Variable.GRAY}`,
                width: width +'%',
                borderRadius: 10,
                height: 10,
                margin: 5,
                flex: 1
            }}>

                </View>
        ))
      }
    </View>
  )
}

export default ProgressBar