import { useContext } from "react";
import { View, Image } from "react-native"
import {
  FAB,
  Text,
  Card,
  Button,
} from '@rneui/themed'

import { useNavigation } from "@react-navigation/native";

import PedidosContext from "../context/pedidos/pedidosContext";
import globalStyles from "../styles/global";

const DetallePedido = () => {

  // Context de pedido
  const { platillo } = useContext(PedidosContext)
  const { nombre, descripcion, imagen, categoria, precio } = platillo

  // Navegacion
  const navigation = useNavigation()
  
  return (
    <View style={globalStyles.contenedor}>
      <View style={globalStyles.contenido}>

        <Card>
          <Card.Title>
            <Text style={globalStyles.titulo}>{nombre}</Text>
          </Card.Title>

          <View>
            <Image
              source={{ uri: imagen }} 
              style={globalStyles.imagen}
            />
          </View>
            <Text style={{marginTop: 5}} >{descripcion}</Text>
            <Text style={globalStyles.cantidad}>Precio: ${precio}</Text>
        </Card>
      </View>

        <View>
          <Button
            buttonStyle={globalStyles.boton}
            titleStyle={globalStyles.botonTexto}
            title={"Ordenar Platillo"}
            style={{marginBottom: 10}}
            onPress={() => {
              navigation.navigate("FormularioPlatillo")
            }}
          />
        </View>

    </View>
  );
}

export default DetallePedido;