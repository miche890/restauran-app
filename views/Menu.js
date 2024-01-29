import { useContext, useEffect, Fragment } from "react";

import FirebaseContext from "../context/firebase/firebaseContext";
import PedidosContext from "../context/pedidos/pedidosContext";

import { useNavigation } from '@react-navigation/native'

import { View, Pressable, FlatList, StyleSheet } from 'react-native'
import {
  Text,
  Image,
  ListItem,
} from "@rneui/themed"


import globalStyles from "../styles/global";

const Menu = () => {

  // Context de firebase
  const { menu, getProductos } = useContext(FirebaseContext)

  // Context de pedido
  const { seleccionarPlatillo } = useContext(PedidosContext)

  // Hook para redirecionar
  const navigation = useNavigation()

  useEffect(() => {
    getProductos()
  }, [])
  

  const mostrarHeading = (categoria, i) => {

    if (i > 0) {
      const categoriaAnterior = menu[i - 1].categoria
  
      if (categoriaAnterior !== categoria) {
        return (
          <View style={style.separador} >
            <Text style={style.separadorTexto}>{categoria}</Text>
          </View>
        )
      }
    } else {
      return (
        <View style={style.separador} >
          <Text style={style.separadorTexto} >{categoria}</Text>
        </View>
      )
    }


    
  }

  return (
    <View style={globalStyles.contenedor}>
      <View style={{ backgroundColor: "#FFF" }} >
        <FlatList
          data={menu}
          keyExtractor={ item => item.id }
          renderItem={({item, index}) => {
            const { imagen, nombre, descripcion, categoria, precio, id } = item
            return (

              <Fragment>
                {mostrarHeading(categoria, index)}
                <Pressable
                  onPress={() => {
                    // Eliminar algunas propiedades del platillo
                    const { existencia, ...item2 } = item

                    seleccionarPlatillo(item2)

                    navigation.navigate("DetallePlatillo")
                  }}
                >
                  <ListItem bottomDivider>
                    <View style={style.contenido}>
                        <Image
                          source={{ uri: imagen }}
                          style={{ width: 150, height: 150 }}
                        />

                      <View style={style.ContenidoInformacion} >
                        <Text h4>{nombre}</Text>
                        <Text lineBreakMode="clip" >{descripcion}</Text>
                          <Text style={globalStyles.cantidad} >
                            Precio: ${precio}
                          </Text>
                      </View>
                    </View>
                  </ListItem>
                </Pressable>
              </Fragment>
            )
          }}
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

export default Menu;