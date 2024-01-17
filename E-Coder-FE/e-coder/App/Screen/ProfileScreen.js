import { View, Text, Image, TouchableOpacity,ActivityIndicator } from 'react-native'
import React, {useState, useEffect} from 'react';
import Variable from '../Utils/Variable';
import Coin from '../../assets/images/coin.png';
import { AntDesign } from '@expo/vector-icons';
import { useAuth, useUser } from "@clerk/clerk-expo";
import { useNavigation } from '@react-navigation/native';
import { getDetailPoint,getInfoByEmail } from '../Server';

const profile = [
  {
    id: 1,
    name: 'My Course',
    icon: 'book',
    nav: 'Home'
  },
  {
    id: 1,
    name: 'Upgrade Plan',
    icon: 'totop',
    nav: 'course-unlock'
  },
  {
    id: 1,
    name: 'Ranking',
    icon: 'piechart',
    nav: 'leaderboard'
  },
  {
    id: 1,
    name: 'Logout',
    icon: 'logout',
    nav: 'logout'
  },
]

const ProfileScreen = () => {
  const { signOut } = useAuth();
  const navigation = useNavigation();
  const { isLoaded, isSignedIn, user } = useUser();
  const [point,setPoint] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);

  const redirectPage = async(link)=>{
    if(link !=='logout'){
      navigation.navigate(link)
    }else{
      await signOut();
    }
  }

  useEffect(()=>{
    if(user.primaryEmailAddress.emailAddress){
      new Promise(async()=>{
        await fetchPoint(user.primaryEmailAddress.emailAddress)
        await getIsAdmin(user.primaryEmailAddress.emailAddress)
      })
    }
  },[])

  const fetchPoint = async(email) =>{
    const res = await getDetailPoint(email);
    if(res){
      setPoint(res);
    }
  }

  const getIsAdmin =  async(email) =>{
    const res = await getInfoByEmail(email);
    if(res){
      setIsAdmin(res.isAdmin || false);
    }
  }
  

  return (
    <View>
     <View style={{
        height: 200,
        backgroundColor: Variable.PRIMARY,
        padding: 30,

      }}>
      <Text style={{
        fontFamily: 'outfit-medium',
        color: Variable.WHITE,
        fontSize: 30,
        marginTop: 10
      }}>Profile</Text>
      </View>

     {
      user ? (
        <>
         <View style={{display:'flex', flexDirection: 'column', alignItems:'center', marginTop: -40}}>
        <Image 
        style={{
          height: 100,
          width: 100,
          borderRadius: 99
        }}
        source={{uri: user.imageUrl}}/>
        <Text style={{fontFamily: 'outfit-medium', fontSize: 24, margin: 8}}>{user.fullName}</Text>
        <Text style={{fontFamily: 'outfit-medium', fontSize: 20, margin: 8}}>{isAdmin}</Text>
        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 30}}>
          <Image source={Coin} style={{height: 30, width: 30}}/>
          <Text style={{
            fontFamily: 'outfit',
            fontSize: 16,
            color: Variable.GRAY
          }}>{point} Points</Text>
        </View>
      </View>

      <View>
        {
          profile?.map((item, index)=>(
            <TouchableOpacity 
            onPress={()=> redirectPage(item.nav)}
            key={index}
            style={{
              display: 'flex',
              flexDirection:'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              marginHorizontal: 32,
              paddingVertical: 16,
              // paddingVertical: 32,
              borderBottomWidth:1,
              borderBottomColor: Variable.GRAY
            }}>
            <AntDesign name={item.icon} size={40} color={Variable.PRIMARY} />
              <Text style={{
                fontFamily: 'outfit',
                fontSize: 23,
                color:Variable.BLACK,
                marginLeft: 40
              }}>
              {item.name}
              </Text>
            </TouchableOpacity>
          ))
        }
      </View>
        </>
      ) : (
        <ActivityIndicator size={'large'} style={{marginTop: 20}}/>
      )
     }

    </View>
  )
}

export default ProfileScreen