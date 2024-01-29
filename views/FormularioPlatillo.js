import { useContext, useState, useEffect} from "react";
import { View, Alert, StyleSheet } from "react-native"
import {
  Text,
  Card,
  Input,
  Button,
  Icon,
  FAB
} from '@rneui/themed'

import { useNavigation } from "@react-navigation/native";

import PedidosContext from "../context/pedidos/pedidosContext";
import globalStyles from "../styles/global";

const FormularioPlatillo = () => {

  // Context de pedido
  const { platillo, guardarPedido } = useContext(PedidosContext)
  const { nombre,  precio } = platillo

  // State para cantidades
  const [cantidad, setCantidad] = useState(1)
  // State para el total
  const [total, setTotal] = useState(0)

  // Redireccionar
  const navigation = useNavigation()

  // En cuanto el componente cargar, calcular la cantidad a pagar
  useEffect(() => {
    calcularTotal()
  },[cantidad])
  
  const handleCantidadMinus = () => {
    if (cantidad > 1) {
      const nuevaCantidad = parseInt(cantidad) - 1
      setCantidad(nuevaCantidad)
    }
  }
  
  const handleCantidadAdd = () => {
    const nuevaCantidad = parseInt(cantidad) + 1
    setCantidad(nuevaCantidad)
  }

  const calcularTotal= () => {
    const totalPagar = precio * cantidad
    setTotal(totalPagar)
  }
  

  // Confirmar si la orden es correcta
  const confirmarOrden = () => {
    Alert.alert(
      "¿Desea confirmar tu pedido?",
      "Un pedido confirmado ya no se podrá modificar",
      [
        {
          text: "Confirmar",
          onPress: () => {
            // Almacenar pedido al pedido principal
            const pedido = {
              ...platillo,
              cantidad,
              total,
            }

            // console.log(pedido);
            guardarPedido(pedido)

            // Navegar hacia el resumen
            navigation.navigate("ResumenPedido")
          }
        },
        {
          text: "Cancelar",
          style: "cancel"
        }

      ]
    )
  }

  return (
    <View style={globalStyles.contenedor} >
      <View style={globalStyles.contenido} >
        <View>
          <Text style={globalStyles.titulo}>Cantidad</Text>

          <View style={style.grid}>

            <View style={style.col} >
              <Button 
                color={"black"} 
                buttonStyle={{height: 80}} 
                onPress={() => handleCantidadMinus()}
              >
                <Icon name="minus" type="font-awesome" color={"white"} />
              </Button>
            </View>

            <View style={style.col}>
              <Input 
                placeholder="1" 
                value={cantidad.toString()} 
                style={style.input}
                keyboardType="numeric"
                onChangeText={(cantidad) => setCantidad(cantidad)}
              />
            </View>

            <View style={style.col}>
              <Button
                color={"black"} 
                buttonStyle={{height: 80}}
                onPress={() => handleCantidadAdd()}
              >
                <Icon name="plus" type="font-awesome" color={"white"} />
              </Button>
            </View>

          </View>

          <Card>
            <Text style={globalStyles.cantidad}>Subtotal: ${total}</Text>
          </Card>


        </View>
      </View>

      <View>
        <Button
          buttonStyle={globalStyles.boton}
          titleStyle={globalStyles.botonTexto}
          title={"Agregar al pedido"}
          style={{marginBottom: 10}}
          onPress={() => {
            confirmarOrden()
          }}
        />
      </View>

    </View>
  );
}

const style = StyleSheet.create({
  grid: {
    flexDirection: "row",
    justifyContent: "center"
  },
  col: {
    width: "33%"
  },
  input: {
    textAlign: "center",
    fontSize: 20,
    height: 80
  }
})

export default FormularioPlatillo;