import React, { Component } from 'react';
import { Text, View, Alert ,SafeAreaView,StatusBar,FlatList,ImageBackground,Platform,Image,Dimensions,StyleSheet} from 'react-native';
import axios from "axios";



export default class MeteorScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            meteors: {},
        };
    }

    keyExtractor = (item,index)=>{
        index.toString();
    }

    renderItem = ({item})=>{
        let meteor = item;
        let bg_img,speed,size;

        if(meteor.threat_score <=30){
             bg_img = require("../assets/meteor_bg1.png")
             speed = require("../assets/meteor_speed1.gif")
             size = 100
        }else if (meteor.threat_score < 75){
            bg_img = require("../assets/meteor_bg2.png")
            speed = require("../assets/meteor_speed2.gif")
            size = 150
        }else {
            bg_img = require("../assets/meteor_bg3.png")
            speed = require("../assets/meteor_speed3.gif")
            size = 200
        }

        return(
            <View>
                 <ImageBackground source = {bg_img} style = {styles.background}>
                     <View>
                         <Image source = {speed} style = {{width:size,height:size,alignSelf:'center'}}/>
                         <View style = {styles.textView}>
                             <Text style = {styles.text1}>Name : {item.name}</Text>
                             <Text style = {styles.text1}>Closest To Earth : {item.close_approach_data[0].close_approach_date_full}</Text>
                             <Text style = {styles.text1}>Min diameter : {item.estimated_diameter.kilometers.estimated_diameter_min}</Text>
                             <Text style = {styles.text1}>Max diameter : {item.estimated_diameter.kilometers.estimated_diameter_max}</Text>
                             <Text style = {styles.text1}>Velocity(Km/Hr) : {item.close_approach_data[0].relative_velocity.kilometers_per_hour}</Text>
                             <Text style = {styles.text1}>Missing Erath By : {item.close_approach_data[0].miss_distance.kilometers}</Text>
                         </View> 
                     </View>
                 </ImageBackground>

            </View>
        )

    }

    componentDidMount() {
        this.getMeteors()
    }

    getMeteors = () => {
        axios
            .get("https://api.nasa.gov/neo/rest/v1/feed?api_key=1saFFt4dEedPdOzgvYzkGvKUQnG0CXsNyt0y8aOy")
            .then(response => {
                this.setState({ meteors: response.data.near_earth_objects })
            })
            .catch(error => {
                Alert.alert(error.message)
            })
    }

    render() {
        if (Object.keys(this.state.meteors).length === 0) {
            return (
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                    <Text>Loading</Text>
                </View>
            )
        } else {
            let meteor_arr = Object.keys(this.state.meteors).map(meteor_date => {
                return this.state.meteors[meteor_date]
            })
            let meteors = [].concat.apply([], meteor_arr);

            meteors.forEach(function (element) {
                let diameter = (element.estimated_diameter.kilometers.estimated_diameter_min + element.estimated_diameter.kilometers.estimated_diameter_max) / 2
                let threatScore = (diameter / element.close_approach_data[0].miss_distance.kilometers) * 1000000000
                element.threat_score = threatScore;
            });

            meteors.sort(function(a,b){
                return b.threat_score - a.threat_score
            })

            meteors = meteors.slice(0,5)

            return (
                <View
                    style={
                       styles.container
                    }>
                    <Text>Meteor Screen!</Text>
                    <SafeAreaView style = {styles.safeArea}/>

                    <FlatList
                    keyExtractor = {this.keyExtractor}
                    data = {meteors}
                    renderItem = {this.renderItem}
                    horizontal = {true}
                   
                    />
                
                    
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
   
   container:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
   },
    safeArea:{
     marginTop: Platform.OS == "android" ? Statusbar.currentHeight :0   
    },
    background:{
    flex:1,
    resizeMode:"cover",
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height
    },
    view1:{
    flex:0.5,
    justifyContent:'center',
    alignItems:'center'
    },
    text1:{
    fontSize:20,
    color:"lightblue",
    fontWeight:'bold',
   marginLeft:20,
   

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
    textView:{
   marginTop:500
    },
    
    
    
    })