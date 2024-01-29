import { View, StyleSheet } from "react-native"
import { Button, Text } from '@rneui/themed'

import globalStyles from "../styles/global";

import { useNavigation } from "@react-navigation/native"

const NuevaOrden = () => {

  const navigation = useNavigation()

  return (
    <View style={globalStyles.contenedor}>
      <View style={[globalStyles.contenido, styles.contenido]}>
        <Button
          buttonStyle={globalStyles.boton}
          onPress={() => navigation.navigate("Menu")}
        >
          <Text style={globalStyles.botonTexto}>Crear Nueva Orden</Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenido: {
    flexDirection: "column",
    justifyContent: "center",
  }
})

export default NuevaOrden;