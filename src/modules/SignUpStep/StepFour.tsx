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

const DATA = [
  { title: "Muy Ligera" },
  { title: "Ligera" },
  { title: "Moderada" },
  { title: "Activa" },
  { title: "Muy Activa" },

];
const StepFour = () => {
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
      await setDoc(docSnap, user).then(() => {
          console.log('Se acutailizo')
          navigate(Routes.StepFive);
      })
  }, [currentIndex, user]);
  return (
    <View flex backgroundColor={Colors.contentW}>
      <Text H36 marginL-24>
        Paso 4/5
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

export default StepFour;

const styles = StyleSheet.create({});
