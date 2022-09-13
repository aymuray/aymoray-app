import { useNavigation } from "@react-navigation/native";
import Routes from "config/Routes";
import React, {useCallback, useEffect, useState} from "react";
import {LogBox, StyleSheet} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Ripple from "react-native-material-ripple";
import { View, Text, Colors, Image, Assets } from "react-native-ui-lib";
import {onAuthStateChanged} from "firebase/auth";
import {auth, db} from "config/fb";
import {doc, getDoc, setDoc} from "firebase/firestore";
import MyProfile from "modules/MyProfile";

const DATA = [
  { title: "Muy Ligera" },
  { title: "Ligera" },
  { title: "Moderada" },
  { title: "Activa" },
  { title: "Muy Activa" },

];
const EditTrainingLevel = () => {
  const { navigate } = useNavigation();
  const [uid, setUid] = useState('');
  const [user, setUser] = useState(null);
  const [docSnap, setDocSnap] = useState(null);
  const [currentIndex, setIndex] = useState(-1);
    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUid(user.uid);
                const docRef = doc(db, "usuarios", user.uid)
                setDocSnap(docRef);
                const docSnap = await getDoc(docRef);
                setUser(docSnap.data());
            }
        })
        LogBox.ignoreLogs(["timer"]);
    }, []);

  const onNext = useCallback(async (index) => {
      user.nivelEntrenamiento = index+1;

      console.log(user);
      let estatura = null
      let peso = null
      if (user.unidadDeMedidaEstatura === 'PIES') {
          estatura = parseInt(user.estatura) / 3.28084;
      } else {
          estatura = parseInt(user.estatura) / 100;
      }

      if (user.UnidadMedidaPeso === 'KILOGRAMOS') {
          peso = user.peso
      }
      if (user.UnidadMedidaPeso === 'LIBRAS') {
          peso = user.peso / 2.2046
      }
      if (user.UnidadMedidaPeso === 'STONES') {
          peso = user.peso * 6.35029
      }

      user.IMC = peso / (estatura * estatura)

      if (user.sexo === 'Hombre') {
          user.GC = (1.2 * user.IMC) + (0.23 * user.edad) - (10.8 * 1) - 5.4
      } else {
          user.GC = (1.2 * user.IMC) + (0.23 * user.edad) - (10.8 * 0) - 5.4
      }


      if (user.sexo === 'Hombre') {
          user.TMB = 66 + (13.7 * peso) + (5 * estatura) - (6.8 * user.edad)
      } else {
          user.TMB = 655 + (9.6 * peso) + (1.8 * estatura) - (4.7 * user.edad)
      }

      if (user.nivelEntrenamiento === 1) {
          user.GET = user.TMB * 1.2
      }if (user.nivelEntrenamiento === 2) {
          user.GET = user.TMB * 1.375
      }if (user.nivelEntrenamiento === 3) {
          user.GET = user.TMB * 1.55
      }if (user.nivelEntrenamiento === 4) {
          user.GET = user.TMB * 1.725
      }if (user.nivelEntrenamiento === 5) {
          user.GET = user.TMB * 1.9
      }


      await setDoc(docSnap, user).then(() => {
          console.log('Se acutailizo')
          navigate(Routes.MyProfile);
      })
  }, [currentIndex, user]);
  return (
    <View flex backgroundColor={Colors.contentW}>
      <Text H18 marginL-24>
          Edición de intensidad de entrenamiento
      </Text>
      <Text R18 marginL-24>
          ¿En que nivel de intensidad estan tus entrenamientos?
      </Text>
      <View flex paddingT-70>
        {DATA.map((item, index) => {
          return (
            <Ripple
              key={index}
              rippleContainerBorderRadius={40}
              style={{
                height: 73,
                marginHorizontal: 24,
                borderRadius: 40,
                borderWidth: 2,
                borderColor: Colors.line,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 32,
                overflow: "hidden",
              }}
              onPress={() => {
                setIndex(index);
                onNext(index);
              }}
            >
              <Text
                H18
                color={
                  index === currentIndex ? Colors.contentW : Colors.color6D
                }
              >
                {item.title}
              </Text>
              {index === currentIndex && (
                <LinearGradient
                  colors={["#FF6243", "#FF0072"]}
                  start={{
                    x: 0,
                    y: 1,
                  }}
                  end={{
                    x: 1,
                    y: 1,
                  }}
                  style={{
                    ...StyleSheet.absoluteFillObject,
                    zIndex: -1,
                    borderRadius: 40,
                  }}
                />
              )}
            </Ripple>
          );
        })}
      </View>
    </View>
  );
};

export default EditTrainingLevel;

const styles = StyleSheet.create({});
