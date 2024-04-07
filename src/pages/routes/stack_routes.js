
import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import GeradorDeSenha from '../gerar_senha/gerar_senha';
import Home from '../home/home';

const Stack = createStackNavigator();


function StackRoutes() {
  
  return (
    
      <Stack.Navigator>
     
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
         
         />
        <Stack.Screen
          name="Gerar_Senha"
          component={GeradorDeSenha}
          options={{ headerShown: false }}
       
       />

      </Stack.Navigator>
  );
}

export default StackRoutes;
