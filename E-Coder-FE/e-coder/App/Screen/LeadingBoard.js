import { View, Text, FlatList, Image, ScrollView,RefreshControl } from 'react-native'
import { useState, useEffect } from 'react'
import { getLeaderTop } from '../Server'
import React from 'react'
import Gold from '../../assets/images/gold-medal.png';
import Silver from '../../assets/images/silver-medal.png'
import Bronze from '../../assets/images/bronze-medal.png'
import Variable from '../Utils/Variable'


const LeadingBoard = () => {
  const [listTop, setListTop] = useState([]);

  useEffect(()=>{
    new Promise(async()=>{
      await fetchList();
    })
  },[])

  const fetchList = async() =>{
    const response = await getLeaderTop();
    if(response){
      setListTop(response);
    }
  };

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      fetchList();
      setRefreshing(false);
    }, 2000);
  }, []);


  return (
    <View>
      <View style={{
        height: 160,
        backgroundColor: Variable.PRIMARY,
        padding: 30,

      }}>
      <Text style={{
        fontFamily: 'outfit-medium',
        color: Variable.WHITE,
        fontSize: 30,
        marginTop: 30
      }}>LeadingBoard</Text>
      </View>
      <ScrollView
      
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={{
        marginTop: -40,
        height: '85%'
      }}>
        <FlatList
          data={listTop}
          renderItem={({item, index})=>(
            <View style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 20,
              backgroundColor: Variable.WHITE,
              marginRight: 8,
              marginLeft: 15,
              borderRadius: 15,
              marginBottom: 10
            }}>
              <View style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10
            }}>
              <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 24,
                color: Variable.GRAY
              }}>
                {index+1}
              </Text>
              <Image source={{uri: item.image}}
              style={{
                width: 60,
                height: 60,
                borderRadius: 99
              }}
              />
              <View>
                <Text style={{
                  fontFamily: 'outfit-medium',
                  fontSize: 20
                }}>
                  {item.name}
                </Text>
                <Text style={{
                  fontFamily: 'outfit',
                  fontSize: 16, color: Variable.GRAY
                }}>
                  {item.point}
                </Text>
                </View>
              </View>
              {
                index < 3 ?
                <Image 
                style={{
                  width: 40,
                  height: 40
                }}
                source={index+1 ===1 ? Gold
                : index+1 === 2 ? Silver
                : index +1 === 3 ? Bronze
                : null
                
                }/> : 
                null
              }
              </View>
          )}
        />
      </ScrollView>
    </View>
  )
}

export default LeadingBoard