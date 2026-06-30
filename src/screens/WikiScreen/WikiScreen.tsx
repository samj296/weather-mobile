import { useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator, TouchableOpacity, StyleSheet, ScrollView, Alert} from "react-native"
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { api } from "../../utils/api";
import { ozzWiki } from "../../data/fantasyCity";
import { RootStackParamList } from "../../navigation/type";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type WikiRoute = RouteProp<RootStackParamList, "WikiScreen">;
type WikiNav = NativeStackNavigationProp<RootStackParamList, "WikiScreen">;



type WikiInfo = {
    title: string,
    extract: string,
    originalimage?: {
        source: string | number,  //local image will be number
    },
    [key:string]: any,
};

export default function WikiScreen(){
    const route = useRoute<WikiRoute>();
    const navigation = useNavigation<WikiNav>();
    
    
    const {wikiUrl, city} = route.params || {};

    const [wikiInfo, setWikiInfo] = useState<WikiInfo | null>(null)
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchWiki(){
            setLoading(true);
            try{
                if(wikiUrl === "ozz"){
                    setWikiInfo(ozzWiki)
                }else{
                    const data = await api(wikiUrl,{method: "GET"});
                    setWikiInfo(data);
                }
            }catch(err){
                Alert.alert("Error", `Unable to fetch the info about the city - ${err}`)
            }finally{
                setLoading(false);
            };
        };
        fetchWiki();
    },[wikiUrl]);

    function handleBackScreen(){
       navigation.navigate("HomeScreen", {city} );
    };

    return(
        <ScrollView style = {styles.page}>
            {loading && (
                <ActivityIndicator size="large" color="#000" style={{ marginTop:20}} />
            )}
        
        {!loading && wikiInfo && (
            <View>
                <TouchableOpacity style={styles.card} onPress={handleBackScreen}>
                    <Text style={styles.title}>{wikiInfo.title}</Text>
                    <Text style={styles.about}>About</Text>
                    <Text style={styles.extract}>{wikiInfo.extract}</Text>
                </TouchableOpacity>
                {wikiInfo.originalimage?.source && (
                    <TouchableOpacity style={styles.card} onPress={handleBackScreen}>
                        <Image
                            source={
                                typeof wikiInfo.originalimage.source ==="string"?
                                { uri: wikiInfo.originalimage.source } : wikiInfo.originalimage.source}
                                // if its a string that means it has to fetch if its number then load
                                // the image that fatasyCity.js is giving
                            style={styles.image}
                            resizeMode="cover"
                        />
                    </TouchableOpacity>
                )}
            </View>
        )}

        </ScrollView>
    );

};

const styles = StyleSheet.create({
    page: {
          padding: 10,
        borderStyle:"solid",
        borderWidth: 5,
        margin:10,
        backgroundColor: "#ADD8E6",
        
    },
    title: {
        fontSize:30,
        alignSelf: "center",
    },
    card:{
        borderStyle: "solid",
        borderWidth: 5,
        padding: 10,
        margin: 10
    },
    about: {
        alignSelf:"center",
        fontSize:20,
        fontStyle: "italic"
    },
    extract: {
        alignSelf: "center"
    },
    image:{
        width: "auto",
        height: 300,
        borderRadius: 10,
    },

});