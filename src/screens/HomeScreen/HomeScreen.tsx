import { useEffect, useState } from "react";
import { 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    StyleSheet, 
    ScrollView, 
    Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import CityList from "../components/CityList";
import City from "../components/Weather";
import { api } from "../../utils/api";
import { ozzCity } from "../../data/fantasyCity";

type CityItem = {
    place_id: string,
    display_name: string,
    lat: string,
    lon: string,
    addresstype: string,
    [key: string]: any,
};

/* [key: string]: any // this line tells the TypeScript 
// that this object can have additional properties each with a string key and each value can be anything */


export default function HomeScreen(){
    const navigation = useNavigation();
    const route = useRoute<any>();

    const [city, setCity] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [searchCity, setSearchCity] = useState("");
    const [cityList, setCityList] = useState(null);
    
    useEffect(() => {
        if(route.params?.city){
            setCity(route.params.city);
        }
    },[route.params]);

    async function fetchCity(cityName: string){
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${cityName}&limit=5`;
        try{
            const res = await api(
                url,
                {
                    headers: {
                        "User-Agent": "WeatherAppStudentProject/1.0 (sam_joseph@live.com)"
                    }
                })
                return res;
        }catch(err){
            Alert.alert(`Unable to fetch the weather - ${err}`)
        };
    };

    async function handleSubmit(){
        setLoading(true);

        if(!searchCity.trim()){
            setLoading(false);
            setSearchCity("");
            return;
        };

        const res = await fetchCity(searchCity);
        setLoading(false);
        setCityList(res);
    };

    function cityOfOzz(){
        setCity(ozzCity);
        setSearchCity("");
        setCityList(null);
    };

    useEffect(() => {
        if(!searchCity){
            setCityList(null)
            return;
        };

        const timer = setTimeout(() => {
            handleSubmit();
        }, 3000);

        return () => clearTimeout(timer);
    },[searchCity]);

    return (
        <View style={styles.screen}>
            <View style = {styles.card}>
                <Text style = {styles.title}>
                    Welcome to Weather App
                </Text>
                <TouchableOpacity 
                style = {styles.btn}
                onPress={cityOfOzz}
                >
                    <Text style = {styles.btnText}>
                        🏢 City of OZZ
                    </Text>
                </TouchableOpacity>

                <TextInput
                    placeholder="Enter the city name"
                    value={searchCity}
                    onChangeText={(text) => setSearchCity(text.trim())}
                    style={styles.input}
                />

                {cityList && <Text style={styles.lable}>Select City from the list below</Text>}
                <ScrollView style={styles.scroll}>
                    <CityList
                        list={cityList}
                        onSelect={(city) => {
                            setCity(city);
                            setSearchCity("");
                            setCityList(null);
                        }}
                    />
                </ScrollView>
                

                <Text style={styles.lable}>
                    {city ? city.display_name : "Search City"}
                </Text>
            </View>

            <ScrollView style={styles.scroll}>
                <View style={styles.card}>
                    <City city={city} />
                </View>
            </ScrollView>

        </View>
    )

};

const styles = StyleSheet.create({
    screen: {
        backgroundColor: "#98AFC7",
        
        
    },
    card: {
        padding: 10,
        borderStyle:"solid",
        borderWidth: 5,
        margin:10,
        backgroundColor: "#ADD8E6",
        
    },
    title: {
        fontSize: 30,
        fontStyle:"italic",
        alignSelf: "center"
    },
    btn: {
        padding: 5,
        alignSelf: "center",
        borderStyle: "solid",
        borderWidth: 3,
        borderRadius: 10,
        backgroundColor: "#3B3131",
    },
    btnText: {
        color: "#EEEE"
    },
    input: {
        margin: 10,
        padding: 5,
        borderStyle: "solid",
        borderColor: "#000",
        alignSelf: "center"
    },
    lable: {
        margin: 10,
        borderStyle: "solid",
        alignSelf: "center"
    },
    scroll: {},
});