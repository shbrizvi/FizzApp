import { SafeAreaView, Text, View } from 'react-native'
import React from 'react'
import Splash from './fizz/screens/Splash'
import AppContext from './fizz/screens/AppContext'
import Home from './fizz/screens/Home'


const App = () => {
  return (
    <AppContext>
      <Splash />
    </AppContext>
  )
}

export default App

