import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import WikiScreen from './src/screens/WikiScreen/WikiScreen';
import HomeScreen from './src/screens/HomeScreen/HomeScreen';
import { RootStackParamList } from './src/navigation/type';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App(){
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="WikiScreen" component={WikiScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
};