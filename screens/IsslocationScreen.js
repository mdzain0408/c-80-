import React from 'react';
import { StyleSheet, Text, View,ImageBackground,Platform,StatusBar,Image,TouchableOpacity,SafeAreaView,Alert } from 'react-native';
import MapView,{Marker} from 'react-native-maps';
import axios from 'axios'








export default class IssScreen extends React.Component{

    constructor(){
        super();
        this.state = {
           location:{}

        }
    }

    componentDidMount(){
           this.getLocation()

    }

    getLocation = ()=>{
         
        axios
           .get("https://api.wheretheiss.at/v1/satellites/25544")
           .then(response=>{
               this.setState({
                   location:response.data
               })
           }).catch(error=>{
               Alert.alert(error.message)
           })

          

    }

render(){

    if(Object.keys(this.state.location).length == 0){
       return(
           <Text style = {{marginTop:20,marginLeft:20,fontSize:10,fontWeight:'bold'}}>Loading.........</Text>
       )
    }else{
        return(
            <View style = {{marginTop:10}}>
                <SafeAreaView style = {styles.safeArea}/>
               <ImageBackground source = {require("../assets/iss_bg.jpg")} style = {styles.background}>
                   <View style = {styles.view1}>
                       <Text style = {styles.text1}>IssLocation</Text>
                   </View>
                   <View>
                       <MapView style = {styles.maps}
                       region = {{
                            
                        latitude:this.state.location.latitude,
                        longitude:this.state.location.longitude,
                        latitudeDelta:100,
                        longitudeDelta:100
                         
                       }}
                       >
                           <Marker coordinate = {{latitude:this.state.location.latitude,
                                                   longitude:this.state.location.longitude}}
                                                   >
                               <Image source = {require("../assets/iss_icon.png")} style = {styles.imageUni}/>
                           </Marker>


                            

                       </MapView>


                   </View>
                   <View style = {styles.universal1}>
                       <Text style = {styles.universal2}>latitude : {this.state.location.latitude}</Text>
                       <Text style = {styles.universal2}>longitude : {this.state.location.longitude}</Text>
                       <Text style = {styles.universal2}>Altitude (Km) : {this.state.location.altitude}</Text>
                       <Text style = {styles.universal2}> Velocity (Km/hr): {this.state.location.velocity}</Text>

                   </View>

               </ImageBackground>
            
            </View>
            
            )  

    }


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
    fontWeight:'bold',
    alignSelf:'center'

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
   flex:0.2,
   backgroundColor:'red'
    },
    universal2:{
    fontSize:10,
    color:"white",
    
    },
    universal3:{
    position:'absolute',
    color:"rgba(183,183,183,0.5)",
    fontSize:100,
    right:10,
    bottom:-10,
    },
    imageUni:{
   
    
    width:30,
    height:30,
    
    },
    maps:{
width:"100%",
height:'100%'
    },
    
    
    
    })