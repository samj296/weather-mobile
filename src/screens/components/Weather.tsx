import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "../../navigation/type";
import { ozzWeather } from "../../data/fantasyCity";


type WeatherNav = NativeStackNavigationProp<RootStackParamList, "HomeScreen">;

type Props = {
    city: any,
};

export default function City({city}:Props){
    const navigation = useNavigation<WeatherNav>();
    const [loading, setLoading] = useState(false);
    const [cityData, setCityData] = useState<any>(null);
    const [aboutCity, setAboutCity] = useState("");
    const [wikiUrl, setWikiUrl] = useState("");

    const API_KEY = process.env.EXPO_PUBLIC_WEATHERAPIKEY

    useEffect(() => {
        if(!city || city.lat === undefined || city.lon === undefined) {
            setCityData(null)
            return
        };
        setLoading(true);
        setAboutCity("");

        async function fetchWeather(){
            try{
                let data;
                if(city?.customCity){
                    data = ozzWeather;
                    setWikiUrl("ozz")
                }else{
                    const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${API_KEY}&units=metric`;
                    setWikiUrl(`https://en.wikipedia.org/api/rest_v1/page/summary/${city.name}`);
                    const response = await fetch(URL);
                     data = await response.json();
                }
               
                if(data.cod === 404){
                    setCityData(null);
                    setAboutCity("City not found")
                    return;
                };
                setAboutCity(`${data.weather[0].description}`);
                setCityData(data);

            }catch(err: any){
                setAboutCity(err.message);
            }finally{
                setLoading(false);
            }
        };
        fetchWeather();
    },[city]);

    function handlePress(){
        navigation.navigate("WikiScreen", {
            wikiUrl,
            city
        } )
    };

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={handlePress}
        >
            {loading && <ActivityIndicator size="large" color="#00008B"/>}
            {!loading && (
                <View>
                    <Text style={styles.temp}>
                        {loading? "loading...": cityData !== null ? `Temp \n ${cityData["main"]["temp"]}°C \n`:  "Temp \n -- \n"}
                    </Text>
                    <Text style={styles.temp}>
                        {loading? "Feels like" : cityData !== null ? `Feels-like \n ${cityData["main"]["feels_like"]}°C \n` : `Feels like \n -- \n`}
                    </Text>
                    <Text style={styles.temp}>
                        {loading? "Min Temp" : cityData !== null ? `Min-Temp \n ${cityData["main"]["temp_min"]}°C \n`: "Min-Temp \n -- \n"}
                    </Text>
                    <Text style={styles.temp}>
                        {loading? "Max-Tep" : cityData !==null ? `Max-Temp \n ${cityData["main"]["temp_max"]}°C \n`: "Max-Temp \n --"}
                    </Text>
                    <Text style={styles.aboutCity}>
                        {aboutCity}
                    </Text>
                    <Text style={styles.cityName}>
                        {city ? city.display_name : "Select a city"}
                    </Text>
                </View>
            )}
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    container:{},
    temp: {},
    aboutCity: {},
    cityName: {},
});