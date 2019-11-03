import React, {useState, useEffect} from "react";
import { View, KeyboardAvoidingView, Platform, AsyncStorage, Image, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

import api from "../services/api";
import logo from "../assets/logo.png";

export default function Login({ navigation}) {
   AsyncStorage.removeItem("user_id");
   const [email, setEmail] = useState("");
   const [techs, setTechs] = useState("");

   useEffect(() => {
      AsyncStorage.getItem("user_id")
      .then( userId => {
            if(userId != null)
               navigation.navigate("List")
      })
   } , [])

   async function handleSubmit() {
      const response = await api.post("/sessions", {
         email
      })

      const {_id } = response.data;

      await AsyncStorage.setItem("user_id", _id);
      await AsyncStorage.setItem("techs", techs);

      navigation.navigate("List");
   }

   return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
         <Image source={logo} />

         <View style={styles.form}>
            <Text style={styles.label}>Seu E-mail*</Text>
            <TextInput
               keyboardType="email-address"
               autoCapitalize="none"
               autoCorrect={false}
               style={styles.textInput}
               placeholder="Seu e-mail"
               placeholderTextColor="#999"
               value={email}
               onChangeText={setEmail}
            />

            <Text style={styles.label}>Tecnologias*</Text>
            <TextInput
               autoCorrect={false}
               autoCapitalize="words"
               style={styles.textInput}
               placeholder="Tecnologias"
               placeholderTextColor="#999"
               value={techs}
               onChangeText={setTechs}
            />

            <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
               <Text style={styles.btnText}> Encontar Spots </Text>
            </TouchableOpacity>
         </View>
      </KeyboardAvoidingView>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
   },

   label: {
      fontWeight: "bold",
      color: "#444",
      marginBottom: 8,
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

   btnText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
   }
})