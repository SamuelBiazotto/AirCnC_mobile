import React, { useState, useEffect } from "react";
import Socket from "socket.io-client";
import { SafeAreaView, ScrollView, StyleSheet, AsyncStorage, Image, Alert } from "react-native";

import logo from "../assets/logo.png";
import SpotList from "../components/SpotList";

export default function List() {
   const [techs, setTechs] = useState([]);

   useEffect(() => {
      AsyncStorage.getItem("user_id")
      .then(user_id => {
         const socket = Socket("http://192.168.100.9:3000", {
            query: { user_id }
         })
         
         socket.on("bookingResponse", booking => {
            console.log(booking.aproved);
            Alert.alert(`Sua reserva em ${booking.spot.company} em 
                        ${booking.date} foi ${booking.approved ? "Aprovada" : "Rejeitada"}`)
         })
      })
   }, []);

   useEffect(() => {
      AsyncStorage.getItem("techs")
         .then(storagedTechs => {
            const techsArray = storagedTechs.split(",").map(tech => tech.trim());
            setTechs(techsArray);
         })
   }, []) //array vazio executa ação somente uma vez

   return (
      <SafeAreaView style={styles.container}>
         <Image style={styles.logo} source={logo}></Image>

         <ScrollView>
            {techs.map(tech => <SpotList key={tech} tech={tech}></SpotList>)}
         </ScrollView>
         
      </SafeAreaView>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1
   },

   logo: {
      height: 32,
      resizeMode: "contain",
      alignSelf: "center",
      marginTop: 10,
      marginTop: 30
   }
})