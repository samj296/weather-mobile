import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native'

/* 
FlatList is like a LazyColumn in Kotlin it will renders only 
what is on the screen the rest will be rendered when we scroll down 
I was looking for something similar like LazyColumn and found this
*/
type CityItem = {
    place_id: string,
    display_name: string,
    addresstype: string
    [key: string]: any,
};

/* [key: string]: any // this line tells the TypeScript 
// that this object can have additional properties each with a string key and each value can be anything */

type Props = {
    list: CityItem[] | null,
    onSelect: (item: CityItem) => void, 
};

/* onSelect : (item: CityItem) => void 

//This is the TypeScript's way of saying onSelect is a function. 
// It takes one argument called item. That argument must be a CityItem and function returns nothing */

export default function CityList({ list, onSelect }: Props){
    const [cityList, setCityList] = useState<CityItem[]>([]);

    useEffect(() => {
        if(!Array.isArray(list)){
            setCityList([]);
            return;
        };

        if(list.length ===0) return;

        const filtered = list.filter(item => ["city", "town", "village"].includes(item.addresstype));

        setCityList(filtered)

    },[list])


    return(
        <FlatList
            data={cityList}
            keyExtractor={(item) => item.place_id}
            renderItem={({item}) => (
                <TouchableOpacity
                    style={styles.item}
                    onPress={() => onSelect(item)}
                >
                    <Text style={styles.text}>
                        {item.display_name}
                    </Text>
                </TouchableOpacity>
            )}
        />
    )
};

const styles = StyleSheet.create({
    item: {},
    text: {},

})