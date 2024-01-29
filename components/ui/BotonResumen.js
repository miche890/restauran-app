import { useContext } from "react";
import { Button } from "@rneui/themed";

import { useNavigation } from '@react-navigation/native'

import PedidosContext from "../../context/pedidos/pedidosContext";

import globalStyles from "../../styles/global";


const BotonResumen = () => {

  const navigation = useNavigation()

  // Leer el objeto de pedido
  const { pedido } = useContext(PedidosContext)

  if(pedido.length === 0) return null

  return ( 
    <Button
      buttonStyle={globalStyles.boton}
      titleStyle={globalStyles.botonTexto}
      title="Ir a Pedido"
      onPress={() => navigation.navigate("ResumenPedido")}
    />
  );
}

export default BotonResumen;