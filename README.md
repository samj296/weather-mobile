# Weather Mobile App
A simple React Native + Expo mobile application that displays weather information for selected cities and provides quick access to a Wikipedia summary for each location.
---

##  Features

- Search and select a city  
- Fetch live weather data from `OpenWeather` API  
- Custom fantasy city “Ozz” with mock weather + wiki data  
- Navigate to a Wiki screen for more details  
- Fully functional navigation using React Navigation  
- Environment variables handled with Expo’s `EXPO_PUBLIC_` system  

> **Note:** Due to limited time, the UI styling is minimal.  
> Functionality is complete, and styling will be added in a future update.

---

##  Installation & Setup

Follow these steps to run the project locally.

### 1️ Clone the repository

```sh
git clone https://github.com/samj296/weather-mobile.git
````

### 2️ Navigate into the project folder



```shell
cd weather-mobile
```

### 3️ Install dependencies



```shell
npm install
```

### 4️ Add your environment variable


Create a `.env` file in the root:

```shell
touch .env
```

**Note: Don't change the name of the variable**

```text
EXPO_PUBLIC_WEATHERAPIKEY=your_api_key_here
```

### 5️ Start the Expo development server



```shell
npx expo start
```

You can then open the app using:

- Expo Go on your phone (scan the QR code)
    
- Android emulator
    
- iOS simulator (Mac only)
    
- Web browser (limited support)
    

##  Project Structure



```text
src/
  ├── screens/
  │     ├── HomeScreen/
  │     └── WikiScreen/
  ├── components/
  │     └── Weather.tsx
  ├── data/
  │     └── fantasyCity.ts
  ├── navigation/
        └── types.ts
```

##  Technologies Used

- **React Native**
    
- **Expo**
    
- **React Navigation**
    
- **OpenWeather API**
    
- **Wikipedia REST API**
    
- **TypeScript**
    

##  Future Improvements

- Add full UI styling
    
- Improve layout and spacing
    
- Add animations and transitions
    
- Add error states and offline handling