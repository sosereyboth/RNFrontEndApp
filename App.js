import React from "react";
import ResolveStartup from "./screens/ResolveStartup";
import { Provider } from 'react-redux'
import { store } from '././redux/store';

const App = () => {


  return (

    <Provider store={store} >
      <ResolveStartup />
    </Provider>



  )
}

export default App


// // In App.js in a new project

// import * as React from 'react';
// import { View, Text } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import axios from './api/axios';
// import { AuthStack, HomeStack } from "./navigation"

// function HomeScreen() {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Home Screen</Text>
//     </View>
//   );
// }



// const Stack = createNativeStackNavigator();

// function App() {

//   React.useEffect(() => {
//     const options = {
//       method: 'GET',
//       url: '/hello',
//       // params: { 'userName': 'user1', 'password': 'pwd1' },
//       // data: { 'userName': 'user1', 'password': 'pwd1' },
//       // headers: {
//       //   'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyMSIsImV4cCI6MTY1NDMxMjQ3NywiaWF0IjoxNjU0Mjc2NDc3fQ.yPGrI-CeWR8ShYpwRFC4_KsqNtpLI1710rCvXgsbSVQ'
//       // }
//     };

//     axios.request(options).then(function (response) {
//       console.log(response.data);
//     }).catch(function (error) {
//       console.error(error);
//     });
//   }, [])

//   return (
//     <AuthStack />
//   );
// }

// export default App;