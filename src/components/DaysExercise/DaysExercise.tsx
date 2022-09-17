
import BoxExercire from "modules/Exercires/components/BoxExercire";
import ItemWorkOutPlan from "components/ItemWorkOutPlan"
import React, {useEffect, useState} from "react";
import { StyleSheet } from "react-native";
import { Assets, Colors, View, Text, Button } from "react-native-ui-lib";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "config/fb";
import { collection, getDocs, query, where } from "firebase/firestore";

const days = ['Lunes','Martes','Miercoles','Jueves','Viernes','Sábado','Domingo',]

const DaysExercise = () => {

    const [uid, setUid] = useState('');
    const [exercise, setExercise] = useState([]);
    const [currentDay, setCurrentDay] = useState(0);
    const [displayDay, setDisplayDay] = useState(0);

    useEffect(() => {
        let fecha = new Date();
        setCurrentDay(fecha.getDay());
        getExercices();
    }, [displayDay]);

    function filterByDays(exersices, query) {
       return exersices.filter(exercise => exercise.dias.includes(query.toLowerCase()))
    }
    const getExercices = async () => {
      console.log('++++++++++++++++entre');
      try {
          onAuthStateChanged(auth, (user) => {
              if (user) {
                  setUid(user.uid);
              }
          })
          const q = query(collection(db, "Ejercicios"), where("idUser", "==", uid));
          const querySnapshot = await getDocs(q);
          let temp = []
          querySnapshot.forEach((doc) => {
              temp.push(doc.data());
          });
          setExercise(filterByDays(temp, days[displayDay].normalize("NFD").replace(/[\u0300-\u036f]/g, "")));
      } catch (e) {
          console.log(e);
      }
    }
  
    const NextDay = () => {
        displayDay > days.length - 2 ? setDisplayDay(0): setDisplayDay(displayDay+1)
    }
    const PreviusDay = () => {
        displayDay === 0 ? setDisplayDay(days.length - 1): setDisplayDay(displayDay-1)
    }
  return (
    <View
          marginH-16
          marginB-16
          style={{
            borderRadius: 6,
            shadowColor: "#000",
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
            padding-16
            row
            style={{
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button iconSource={Assets.icons.btn_back_day} onPress={PreviusDay} />
            <Text R14 color28>
              {days[displayDay]}
            </Text>
            <Button iconSource={Assets.icons.btn_next_day} onPress={NextDay} />
          </View>
          {exercise.length != 0 ? exercise.map((item) =>{return (
            <View>
            <View height={1} backgroundColor={Colors.line} />
            <ItemWorkOutPlan ejercicio={item}/>
            </View>)
          }) :
          <View
              paddingT-16
              paddingB-12
              paddingH-16
              row
              style={{ justifyContent: "center", alignItems: "center" }}
          >
            <View height={1} backgroundColor={Colors.line} />
            <Text R14 color6D>Vemos que tienes un día libre 👀</Text>
          </View>}
          </View>
  );
};

export default DaysExercise;

const styles = StyleSheet.create({});
