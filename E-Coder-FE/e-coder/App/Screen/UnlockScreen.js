import { View, Text, Image, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import Variable from '../Utils/Variable'
import Gift from '../../assets/images/Gift.png'
import { useRoute } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'
import { postErrolCourse } from '../Server'

const UnlockScreen = () => {
    const [option, setOption] = useState();
    const params = useRoute().params;
    const navigation = useNavigation();

    const onNextBtnPress = async() => {
        if(!option){
            showToast();
            return;
        }else{
            // params.idCourse, params.idUser
            const response = await postErrolCourse( params.idUser,params.idCourse);
            if(response){
                console.log(response);
                ToastAndroid.show('Upgrade success', ToastAndroid.LONG);
                navigation.navigate('Home');
            }
        }
    }

    const showToast = () => {
        ToastAndroid.show('Please choose option', ToastAndroid.SHORT);
    }

  return (
    <View>
        <View 
        onPress={()=> setOption(1)}
        style={{
        height: 260,
        backgroundColor: Variable.PRIMARY,
        padding: 30,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <Image style={{marginTop: 30}} source={Gift}/>
        <Text style={{
            fontFamily:'outfit-medium',
            fontSize: 22,
            color: Variable.WHITE
        }}>
        Unlock the All Courses 
        </Text>
        <Text style={{
            fontFamily:'outfit-medium',
            fontSize: 22,
            color: Variable.WHITE
        }}>
        wth CodeBox Pro
        </Text>
      </View>

      <View 
      
      style={{
        marginTop: 30,
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        padding: 20
      }}>
        <TouchableOpacity  
        onPress={()=> setOption(1)}
        style={{
            borderWidth:  option === 1  ? 2: 1,
            // width: 200,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: option === 1 ? Variable.PRIMARY : Variable.GRAY,
            borderRadius: 10,
            padding: 20
        }}>
            <Text 
            style={{
                fontFamily: 'outfit',
                fontSize: 18,
                padding: 10
                
            }}
            >
            1 Month
            </Text>
            <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 20,
                
            }}>
            $2.99 / Month
            </Text>
            <Text style={{
                fontFamily: 'outfit',
                fontSize: 18,
                padding: 10
            }}>
            Billed Monthly
            </Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={()=> setOption(2)}
        style={{
            borderWidth:  option === 2  ? 2: 1,
            // width: 200,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: option === 2 ? Variable.PRIMARY : Variable.GRAY,
            borderRadius: 10,
            padding: 20
        }}>
            <Text 
            style={{
                fontFamily: 'outfit',
                fontSize: 18,
                padding: 10
                
            }}
            >
            1 Year
            </Text>
            <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 20,
                
            }}>
            $23.99 / Year
            </Text>
            <Text style={{
                fontFamily: 'outfit',
                fontSize: 18,
                padding: 10
            }}>
            Billed Monthly
            </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
            onPress={()=> onNextBtnPress()}
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
                START TO ENROLL NOW
              </Text>
            </TouchableOpacity>
    </View>

    
  )
}

export default UnlockScreen