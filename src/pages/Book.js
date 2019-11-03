import React, { useState } from "react";
import { TextInput, Alert, Text, AsyncStorage, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";

import api from "../services/api";

export default function Book({ navigation }) {
   const [date, setDate] = useState("");
   const spotId = navigation.getParam("spotId");

   async function handleSubmit() {
      const user_id = await AsyncStorage.getItem("user_id")
      
      await api.post(`/spots/${spotId}/bookings`, { date }, { headers: {user_id} })
      Alert.alert("Solicitação de reserva enviada");

      navigation.navigate("List");
   }

   function handleCancel() {
      navigation.navigate("List");
   }

   return (
      <SafeAreaView style={styles.container}>
         <Text style={styles.label}>Data de Interesse*</Text>
         <TextInput
            autoCorrect={false}
            style={styles.textInput}
            placeholder="Qual data você quer reservar"
            placeholderTextColor="#999"
            autoCapitalize="words"
            value={date}
            onChangeText={setDate}
         />

         <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
            <Text style={styles.btnText}> Reservar </Text>
         </TouchableOpacity>

         <TouchableOpacity style={[styles.btn, styles.btnCancel]} onPress={handleCancel}>
            <Text style={styles.btnText}> Cancelar </Text>
         </TouchableOpacity>

      </SafeAreaView>
   )
}

const styles = StyleSheet.create({
   container: {
      margin: 30,
   },

   label: {
      fontWeight: "bold",
      color: "#444",
      marginBottom: 8,
      marginTop:35 
   },

   form: {
      alignSelf: "stretch",
      paddingHorizontal: 30,
      marginTop: 30,
   },

   textInput: {
      borderWidth: 1,
      borderColor: "#ddd",
      paddingHorizontal: 20,
      color: "#444",
      height: 44,
      marginBottom: 20,
      borderRadius: 2
   },

   btn: {
      height: 42,
      backgroundColor: "#f05a5b",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 2
   },

   btnCancel: {
      backgroundColor: "#ccc",
      marginTop: 15
   },

   btnText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
   }
})