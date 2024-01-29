import { useContext, useEffect, useState } from "react"
import { View, StyleSheet } from "react-native"
import { Text, Button } from "@rneui/themed"

import globalStyles from "../styles/global"

import { useNavigation } from '@react-navigation/native'

import PedidosContext from "../context/pedidos/pedidosContext"
import firebase from "../firebase"

import Countdown from 'react-countdown'


const ProgresoPedido = () => {

  const navigation = useNavigation()

  const { idPedido } = useContext(PedidosContext)

  const [tiempo, setTiempo] = useState(0)
  const [completado, setCompletado] = useState(false)

  useEffect(() => {
    const obtenerProducto = () => {
      firebase.db.collection("ordenes")
                  .doc(idPedido)
                  .onSnapshot(function(doc) {
                    setTiempo(doc.data().tiempoentrega);
                    setCompletado(doc.data().completado)
                  })
    }
    obtenerProducto()
  }, [])

  // Muestra el countdown en la pantalla
  const renderer = ({minutes, seconds}) => {
    return (
      <Text style={style.tiempo}>{minutes}:{seconds}</Text>
    )
  }
  

  return (
    <View style={globalStyles.contenedor}>
      <View style={[globalStyles.contenido, {marginTop: 50}]}>
        {tiempo === 0 && (
          <>
          <Text h4 h4Style={style.h4Style}>Hemos recibido tu orden...</Text>
          <Text h4 h4Style={style.h4Style}>Estamos calculando el tiempo de entrega</Text>
          </>
        )}

        { !completado && tiempo > 0 && (
          <>
            <Text h4 h4Style={style.h4Style} >Su orden estara lista en:</Text>
            <Text style={{textAlign: "center"}} >
              <Countdown
                date={Date.now() + tiempo * 60000}
                renderer={renderer}
              />
            </Text>
          </>
        )}

        { completado && (
          <>
            <Text h3 style={style.textCompletado}>Orden lista</Text>
            <Text h4 style={style.textCompletado}>Por favor, pase a recoger su pedido</Text>

            <Button 
              buttonStyle={[globalStyles.boton, {marginTop: 100}]} 
              radius={"xl"} 
              titleStyle={[globalStyles.botonTexto]}
              title="Comenzar una Orden Nueva"
              onPress={() => {navigation.navigate("NuevaOrden")}}
            />
          </>
        )}
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  h4Style: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },
  tiempo: {
    marginBottom: 20,
    fontSize: 60,
    textAlign: "center",
    marginTop: 30,
  },
  textCompletado: {
    textAlign: "center",
    textTransform: "uppercase",
    marginBottom: 20
  }
})

export default ProgresoPedido;