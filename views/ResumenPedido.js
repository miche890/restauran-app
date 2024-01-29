import { useContext, useEffect} from "react";
import { View, ScrollView, Alert, StyleSheet } from "react-native"
import {
  Text,
  Button,
  ListItem,
  Image,
} from '@rneui/themed'

import { useNavigation } from "@react-navigation/native";

import firebase from '../firebase'

import PedidosContext from "../context/pedidos/pedidosContext";

import globalStyles from "../styles/global";

const ResumenPedido = () => {

  const navigation = useNavigation()

  // Context de pedido
  const { pedido, total, mostrarResumen, eliminarProducto, pedidoRealizado } = useContext(PedidosContext)

  useEffect(() => {
    calcularTotal()
  }, [pedido])

  const calcularTotal = () => {
    let nuevoTotal = 0;
    nuevoTotal = pedido.reduce( (nuevoTotal, articulo) => nuevoTotal + articulo.total, 0)

    mostrarResumen(nuevoTotal)
  }

  // Redirecciona a progreso de pedido
  const progresoPedido = () => {

    Alert.alert(
      "Revisa tu pedido",
      "Una vez que realizas tu pedido no podras cambiarlo",
      [
        {
          text: "Confirmar",
          onPress: async () => {

            // Crear objeto con la informacion del pedido
            const pedidoObj = {
              tiempoentrega: 0,
              completado: false,
              total: Number(total),
              orden: pedido, // arreglo
              creado: Date.now()
            }

            console.log(pedidoObj);

            // Escribir en firebase

            try {
              const pedido = await firebase.db.collection("ordenes").add(pedidoObj)
              pedidoRealizado(pedido.id)

            } catch (error) {
              console.error(error);
            }

            // Redireccionar a progreso pedido
            navigation.navigate("ProgresoPedido")
          }
        },
        {
          text: "Revisar",
          style: "cancel"
        }
      ]
    )
  }

  // Confirmar eliminacion de un pedido
  const confirmarEliminacion = (id) => {
    Alert.alert(
      "Deseas eliminar este articulo",
      "Una vez eliminado no se puede recuperar",
      [
        {
          text: "Confirmar",
          onPress: () => {
            // Eliminar del state
            eliminarProducto(id)

            // Calcular
          }
        },
        {
          text: "Revisar",
          style: "cancel"
        }
      ]
    )
  }


  return (
    <View style={globalStyles.contenedor}>
      <View style={globalStyles.contenido}>

        <Text style={globalStyles.titulo}>Resumen del pedido</Text>

        <ScrollView>
          {
            pedido.map((platillo, index) => {
              const { cantidad, nombre, imagen, id, precio } = platillo
              return (
                <ListItem key={ id + index}  bottomDivider>
                  <Image
                    source={{ uri: imagen }}
                    style={{ width: 90, height: 90 }}
                  />
                  
                  <ListItem.Content>
                    <ListItem.Title style={{fontWeight: "bold"}}>{nombre}</ListItem.Title>
                    <Text>Cantidad: {cantidad}</Text>
                    <Text>Precio: ${precio}</Text>
                    <ListItem.ButtonGroup
                      buttons={["Eliminar"]}
                      buttonStyle={{backgroundColor: "red"}}
                      textStyle={[globalStyles.botonTexto, {color: "#FFF"}]}
                      onPress={() => confirmarEliminacion(id)}
                    />
                  </ListItem.Content>
                </ListItem>
              )
            })
          }

          <Text style={globalStyles.cantidad}>Total a pagar: ${total}</Text>

          <View>
            <Button
              buttonStyle={[globalStyles.boton, {marginTop: 30,  backgroundColor: 'rgba(39, 39, 39, 1)'}]}
              titleStyle={[globalStyles.botonTexto, {color: "white"}]}
              title="Seguir Pidiendo"
              style={{marginBottom: 10}}
              onPress={() => navigation.navigate("Menu")}
              />
          </View>

        </ScrollView>

      </View>

        <View>
          <Button 
            buttonStyle={[globalStyles.boton, {marginTop: 20}]}
            titleStyle={globalStyles.botonTexto}
            title="Ordenar Pedido"
            style={{marginBottom: 10}}
            onPress={() => progresoPedido()}
          />
        </View>

    </View>
  );
}

const style = StyleSheet.create({
  contenido: {
    flexDirection: "row",
  },
  ContenidoInformacion: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: 10
  },
  separador: {
    backgroundColor: "#000",
    padding: 5,
    paddingLeft: 15
  },
  separadorTexto: {
    color: "#FFDA00",
    fontWeight: "bold",
    textTransform: "uppercase"
  }
})

export default ResumenPedido;