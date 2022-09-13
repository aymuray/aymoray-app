import {useFocusEffect, useNavigation} from "@react-navigation/native";
import HeaderWithSearch from "components/HeaderWithSearch";
import Routes from "config/Routes";
import { width } from "config/scaleAccordingToDevice";
import React, {useCallback, useEffect, useState} from "react";
import {LogBox, ScrollView, StyleSheet, TouchableOpacity} from "react-native";
import { View, Assets, Colors, Image, Text } from "react-native-ui-lib";
import {onAuthStateChanged} from "firebase/auth";
import {auth, db} from "config/fb";
import {doc, getDocs, query, collection, where} from "firebase/firestore";
import ItemRecipe from "components/ItemRecipe";
import { useIsFocused } from '@react-navigation/native';
import ItemIngredient from "components/ItemIngredient";
import ItemFood from "components/ItemFood";
import ItemExercise from "components/ItemExercise";
const widthItem = (width - 48) / 2;
const ListExercise = () => {
    const [uid, setUid] = useState('');
    const [lunes, setLunes] = useState([]);
    const [martes, setMartes] = useState([]);
    const [miercoles, setMiercoles] = useState([]);
    const [jueves, setJueves] = useState([]);
    const [viernes, setViernes] = useState([]);
    const [sabado, setSabado] = useState([]);
    const [domingo, setDomingo] = useState([]);
    const [exercise, setExercise] = useState([]);
    const isFocused = useIsFocused();

    const { navigate } = useNavigation();


    useEffect(() => {
        getExercices();
    }, [ uid])


    const getExercices = async () => {
        console.log('++++++++++++++++entre');
        try {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    setUid(user.uid);
                }
            })

            const q = query(collection(db, "Ejercicios"), where("idUser", "==", uid));

            let temp = []
            let tempLunes = []
            let tempMartes = []
            let tempMiercoles = []
            let tempJueves = []
            let tempViernes = []
            let tempSabado = []
            let tempDomingo = []

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                temp.push(doc.data());
                doc.data().dias.forEach( (item) => {
                    if (item === "lunes"){
                        tempLunes.push(
                            {
                                id: doc.id,
                                data: doc.data(),
                            }
                        )
                    }
                    if (item === "martes"){
                        tempMartes.push(
                            {
                                id: doc.id,
                                data: doc.data(),
                            }
                        )
                    }
                    if (item === "miercoles"){
                        tempMiercoles.push(
                            {
                                id: doc.id,
                                data: doc.data(),
                            }
                        )
                    }
                    if (item === "jueves"){
                        tempJueves.push(
                            {
                                id: doc.id,
                                data: doc.data(),
                            }
                        )
                    }
                    if (item === "viernes"){
                        tempViernes.push(
                            {
                                id: doc.id,
                                data: doc.data(),
                            }
                        )
                    }
                    if (item === "sabado"){
                        tempSabado.push(
                            {
                                id: doc.id,
                                data: doc.data(),
                            }
                        )
                    }
                    if (item === "domingo"){
                        tempDomingo.push(
                            {
                                id: doc.id,
                                data: doc.data(),
                            }
                        )
                    }
                })
            });
            if (exercise.length != temp.length) {
                setExercise(temp);
                setLunes(tempLunes);
                setMartes(tempMartes);
                setMiercoles(tempMiercoles);
                setJueves(tempJueves);
                setViernes(tempViernes);
                setSabado(tempSabado);
                setDomingo(tempDomingo);
                console.log('----se actualizo--------')
            }

        } catch (e) {
            console.log(e);
        }
    }


  return (
    <View flex>
      <ScrollView>
        <View
            row
            paddingT-16
            style={{
              marginLeft: 'auto',
              marginRight: 'auto'
            }}
        >
        </View>
          <View
              marginH-16
              marginB-16
              style={{
                  borderRadius: 6,
                  backgroundColor: "rgb(239,231,158)",
                  shadowColor: "#727272",
                  shadowOffset: {
                      width: 0,
                      height: 1,
                  },
                  shadowOpacity: 0.22,
                  shadowRadius: 2.22,
                  elevation: 3,
              }}
              backgroundColor={Colors.white}
          >
              <View
                  row
                  paddingH-16
                  paddingV-12
                  style={{ justifyContent: "space-between", alignItems: "center" }}
              >
                  <Text H14 color28 red30 uppercase>
                      Lunes
                  </Text>
              </View>
              {lunes.map((item, index) => {
                  return (
                      <View key={index}>
                          <View height={1} backgroundColor={Colors.color28} />
                          <ItemExercise data={item} dia={"lunes"} />
                      </View>
                  )}
              )}
          </View>
          <View
              marginH-16
              marginB-16
              style={{
                  borderRadius: 6,
                  backgroundColor: "rgb(239,231,158)",
                  shadowColor: "#727272",
                  shadowOffset: {
                      width: 0,
                      height: 1,
                  },
                  shadowOpacity: 0.22,
                  shadowRadius: 2.22,
                  elevation: 3,
              }}
              backgroundColor={Colors.white}
          >
          <View
              row
              paddingH-16
              paddingV-12
              style={{ justifyContent: "space-between", alignItems: "center" }}
          >
              <Text H14 color28 red30 uppercase>
                  Martes
              </Text>
          </View>
          {martes.map((item, index) => {
              return (
                  <View key={index} onPress={getExercices}>
                      <View height={1} backgroundColor={Colors.color28} />
                      <ItemExercise data={item} dia={"martes"} />
                  </View>
              )}
          )}
      </View>
          <View
              marginH-16
              marginB-16
              style={{
                  borderRadius: 6,
                  backgroundColor: "rgb(239,231,158)",
                  shadowColor: "#727272",
                  shadowOffset: {
                      width: 0,
                      height: 1,
                  },
                  shadowOpacity: 0.22,
                  shadowRadius: 2.22,
                  elevation: 3,
              }}
              backgroundColor={Colors.white}
          >
              <View
                  row
                  paddingH-16
                  paddingV-12
                  style={{ justifyContent: "space-between", alignItems: "center" }}
              >
                  <Text H14 color28 red30 uppercase>
                      Miercoles
                  </Text>
              </View>
              {miercoles.map((item, index) => {
                  return (
                      <View key={index}>
                          <View height={1} backgroundColor={Colors.color28} />
                          <ItemExercise data={item} dia={"miercoles"} />
                      </View>
                  )}
              )}
          </View>
          <View
              marginH-16
              marginB-16
              style={{
                  borderRadius: 6,
                  backgroundColor: "rgb(239,231,158)",
                  shadowColor: "#727272",
                  shadowOffset: {
                      width: 0,
                      height: 1,
                  },
                  shadowOpacity: 0.22,
                  shadowRadius: 2.22,
                  elevation: 3,
              }}
              backgroundColor={Colors.white}
          >
              <View
                  row
                  paddingH-16
                  paddingV-12
                  style={{ justifyContent: "space-between", alignItems: "center" }}
              >
                  <Text H14 color28 red30 uppercase>
                      Jueves
                  </Text>
              </View>
              {jueves.map((item, index) => {
                  return (
                      <View key={index}>
                          <View height={1} backgroundColor={Colors.color28} />
                          <ItemExercise data={item} dia={"jueves"} />
                      </View>
                  )}
              )}
          </View>
          <View
              marginH-16
              marginB-16
              style={{
                  borderRadius: 6,
                  backgroundColor: "rgb(239,231,158)",
                  shadowColor: "#727272",
                  shadowOffset: {
                      width: 0,
                      height: 1,
                  },
                  shadowOpacity: 0.22,
                  shadowRadius: 2.22,
                  elevation: 3,
              }}
              backgroundColor={Colors.white}
          >
              <View
                  row
                  paddingH-16
                  paddingV-12
                  style={{ justifyContent: "space-between", alignItems: "center" }}
              >
                  <Text H14 color28 red30 uppercase>
                      Viernes
                  </Text>
              </View>
              {viernes.map((item, index) => {
                  return (
                      <View key={index}>
                          <View height={1} backgroundColor={Colors.color28} />
                          <ItemExercise data={item} dia={"viernes"} />
                      </View>
                  )}
              )}
          </View>
          <View
              marginH-16
              marginB-16
              style={{
                  borderRadius: 6,
                  backgroundColor: "rgb(239,231,158)",
                  shadowColor: "#727272",
                  shadowOffset: {
                      width: 0,
                      height: 1,
                  },
                  shadowOpacity: 0.22,
                  shadowRadius: 2.22,
                  elevation: 3,
              }}
              backgroundColor={Colors.white}
          >
              <View
                  row
                  paddingH-16
                  paddingV-12
                  style={{ justifyContent: "space-between", alignItems: "center" }}
              >
                  <Text H14 color28 red30 uppercase>
                      Sabado
                  </Text>
              </View>
              {sabado.map((item, index) => {
                  return (
                      <View key={index}>
                          <View height={1} backgroundColor={Colors.color28} />
                          <ItemExercise data={item} dia={"sabado"} />
                      </View>
                  )}
              )}
          </View>
          <View
              marginH-16
              marginB-16
              style={{
                  borderRadius: 6,
                  backgroundColor: "rgb(239,231,158)",
                  shadowColor: "#727272",
                  shadowOffset: {
                      width: 0,
                      height: 1,
                  },
                  shadowOpacity: 0.22,
                  shadowRadius: 2.22,
                  elevation: 3,
              }}
              backgroundColor={Colors.white}
          >
              <View
                  row
                  paddingH-16
                  paddingV-12
                  style={{ justifyContent: "space-between", alignItems: "center" }}
              >
                  <Text H14 color28 red30 uppercase>
                      Domingo
                  </Text>
              </View>
              {domingo.map((item, index) => {
                  return (
                      <View key={index}>
                          <View height={1} backgroundColor={Colors.color28} />
                          <ItemExercise data={item}  dia={"domingo"} />
                      </View>
                  )}
              )}
          </View>

      </ScrollView>
    </View>
  );
};

export default ListExercise;

const styles = StyleSheet.create({});
