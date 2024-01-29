import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native';

import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"

import NuevaOrden from "./views/NuevaOrden"
import Menu from "./views/Menu"
import DetallePlatillo from "./views/DetallePlatillo"
import FormularioPlatillo from "./views/FormularioPlatillo"
import ResumenPedido from "./views/ResumenPedido"
import ProgresoPedido from "./views/ProgresoPedido"

// Componentes
import BotonResumen from './components/ui/BotonResumen';

// importar state de context
import FirebaseState from './context/firebase/firebaseState'
import PedidoState from './context/pedidos/pedidosState'

// provider de react native elements
import { ThemeProvider } from '@rneui/themed'

const Stack = createStackNavigator()

const App = () => {
  return (
    <>
      <FirebaseState>
        <PedidoState>
          <StatusBar style="auto" />
          <ThemeProvider>
            <NavigationContainer>
              <Stack.Navigator
                screenOptions={{
                  headerStyle: {
                    backgroundColor: "#FFDA00",
                  },
                  headerTitleStyle: {
                    fontWeight: "bold"
                  },
                  headerTintColor: "#000",
                }}
              >

                <Stack.Screen
                  name='NuevaOrden'
                  component={NuevaOrden}
                  options={{
                    title: "Nueva Orden"
                  }}
                />

                <Stack.Screen
                  name='Menu'
                  component={Menu}
                  options={{
                    title: "Menu",
                    headerRight: props => <BotonResumen />
                  }}
                />

                <Stack.Screen
                  name='DetallePlatillo'
                  component={DetallePlatillo}
                  options={{
                    title: "Detalle Platillo"
                  }}
                />

                <Stack.Screen
                  name='FormularioPlatillo'
                  component={FormularioPlatillo}
                  options={{
                    title: "Ordenar Platillo"
                  }}
                />

                <Stack.Screen
                  name='ResumenPedido'
                  component={ResumenPedido}
                  options={{
                    title: "Resumen del Pedido"
                  }}
                />

                <Stack.Screen
                  name='ProgresoPedido'
                  component={ProgresoPedido}
                  options={{
                    title: "Progreso del Pedido"
                  }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </ThemeProvider>
        </PedidoState>
      </FirebaseState>
    </>
  );
}

export default App;
