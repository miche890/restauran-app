import { useReducer } from 'react'

import firebase from "../../firebase"

import FirebaseReducer from "./firebaseReducer"
import FirebaseContext from './firebaseContext'

import { GET_PRODUCTOS_EXITO } from '../../types'

import _ from "lodash"

const FirebaseState = (props) => {

  // Crear state inicial
  const initialState = {
    menu: []
  }

  // useReducer con dispatch para ejecutar las funciones
  const [ state, dispatch ] = useReducer(FirebaseReducer, initialState)

  // Función que se ejecuta para traer los productos
  const getProductos = () => {
    
    // consultar firebase
    firebase.db
      .collection("productos")
      .where("existencia", "==", true) // traer solo los que tengan existencia en true
      .onSnapshot(handleSnapshot)

    function handleSnapshot(snapshot) {
      let platillos = snapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        }
      })

      // Ordenar por la categoria con lodash
      platillos = _.sortBy(platillos, "categoria")

      // console.log(platillos);

      // Tenemos resultados de la BD
      dispatch({
        type: GET_PRODUCTOS_EXITO,
        payload: platillos,
      })

    }
  }

  return (
    <FirebaseContext.Provider
      value={{
        menu: state.menu,
        firebase,
        getProductos
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  )
}

export default FirebaseState