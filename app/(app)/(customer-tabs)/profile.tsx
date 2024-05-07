import React from "react";
import { StyleSheet, View,Image,Text, ImageBackground } from "react-native";
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useContext } from "react";
import { userContext } from "@/lib/userContext";
import colors from "@/lib/colors";

const Profile = () => {

  const user=useContext(userContext);
  const image=(user.avatar ? user.avatar:"https://static.vecteezy.com/system/resources/previews/026/966/960/non_2x/default-avatar-profile-icon-of-social-media-user-vector.jpg")
  
  if (user.storeName) {
    return (

        <View style={styles.container}>
       <View style={{flexDirection:'row'} }>
       <Image style={styles.image} source={{ uri: image}} ></Image> 
       <Entypo name="camera" size={24} color="black" style={{marginTop:150}}/></View>
         
           <View style={{flexDirection:'row',alignItems:'center'}}>
        <Text style={{fontSize:22,}}>Store Name:<Text style={{fontSize:16}}>  {user.storeName}</Text></Text>
        <Feather name="edit-2" size={24} color="black" /></View>
        <View style={{flexDirection:'row',alignItems:'center',maxWidth:300,width:300,maxHeight:70}}>
        <Text  style={{fontSize:22,alignSelf: 'flex-start'}}>Address:<Text style={{fontSize:14}}> {user.address}</Text></Text>
        <Feather name="edit-2" size={24} color="black" />
        </View>
     </View>
      );
  }else{
    
  return (
    <View style={styles.container}>
        <View style={{flexDirection:'row'} }>
            
       <Image style={styles.image} source={{ uri: image}} ></Image> 
       <Entypo name="camera" size={24} color="black" style={{marginTop:150}}/></View>
      
          <View style={{flexDirection:'row',alignItems:'center'}}>
       <Text style={{fontSize:22,}}>Name:<Text style={{fontSize:16}}>  {user.firstName+" "+user.lastName+" "}</Text></Text>
       <Feather name="edit-2" size={24} color="black" /></View>
       <View style={{flexDirection:'row',alignItems:'center',maxWidth:300,width:300,maxHeight:70}}>
       <Text  style={{fontSize:22,alignSelf: 'flex-start'}}>Address:<Text style={{fontSize:14}}> {user.address}</Text></Text>
       <Feather name="edit-2" size={24} color="black" />
       </View>
    </View>
  );}
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:colors.primary
  },
  text:{

  },
  image:{width:168,height:168}
});

export default  Profile;
