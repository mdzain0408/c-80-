import React from 'react';
import { StyleSheet, Text, View,ImageBackground,Platform,StatusBar,Image,TouchableOpacity,SafeAreaView } from 'react-native';


export default class HomeScreeen extends React.Component{
render(){
return(
<View style = {{flex:1}}>
<SafeAreaView style = {styles.safeArea}/>

<ImageBackground
source = {require("../assets/bg_image.png")}
style = {styles.background}
>
<View style = {styles.view1}>
    <Text style = {styles.text1}>Iss Tracker App</Text>
</View>

<TouchableOpacity onPress = {()=>{this.props.navigation.navigate("IssLocationScreen")}} style = {styles.button1}>
<Text style = {styles.universal1}>Iss Tracker </Text>
<Text style = {styles.universal2}>"Know More....."</Text>
<Text style = {styles.universal3}>1</Text>
<Image source = {require('../assets/iss_icon.png')} style = {styles.imageUni}/>
</TouchableOpacity>

<TouchableOpacity onPress = {()=>{this.props.navigation.navigate("MeteorScreen")}} style = {styles.button1}>
<Text style = {styles.universal1}>Meteor Screen</Text>
<Text style = {styles.universal2}>"Know More....."</Text>
<Text style = {styles.universal3}>2</Text>
<Image source = {require('../assets/meteor_icon.png')} style = {styles.imageUni}/>
</TouchableOpacity>


</ImageBackground>







</View>

)

}


}

const styles = StyleSheet.create({
safeArea:{

 marginTop: Platform.OS == "android" ? Statusbar.currentHeight :0   
},
background:{
flex:1,
resizeMode:"cover"
},
view1:{
flex:0.5,
justifyContent:'center',
alignItems:'center'
},
text1:{
fontSize:30,
color:"lightblue",
fontWeight:'bold'

},
button1:{
flex:0.5,
marginLeft:30,
marginRight:30,
marginTop:10,
borderRadius:20,
backgroundColor:"white"
},
universal1:{
fontSize:50,
fontWeight:'bold',
color:"black",
marginTop:80,
},
universal2:{
fontSize:20,
color:"red"
},
universal3:{
position:'absolute',
color:"rgba(183,183,183,0.5)",
fontSize:100,
right:10,
bottom:-10,
},
imageUni:{
position:'absolute',
right:10,
width:200,
height:200,
top:-70,
},



})