import Tag from "components/Tag";
import React, {useCallback, useEffect, useState} from "react";
import { PieChart as PieChartSvg } from "react-native-svg-charts";
import { View, Text } from "react-native-ui-lib";
import { onAuthStateChanged } from "firebase/auth";
import {auth, db} from "config/fb";
import { doc, getDocs, query, collection, where } from "firebase/firestore";
import { useIsFocused } from '@react-navigation/native';
import { width } from 'config/scaleAccordingToDevice';
const PieChart = ({change}) => {
  const isFocused = useIsFocused();
  const [total, setTotal] = useState(0);
  const [uid, setUid] = useState('');
  const [IsRefreshing, setIsRefreshing] = useState(true);
  const [dataGrafica, setDataGrafica] = useState([
        {
      key: 2,
      amount: 10,
      svg: { fill: "#5AC8FB" },
      label: "Lunes",
    },
    {
      key: 3,
      amount: 10,
      svg: { fill: "#5856D6" },
      label: "Marter",
    },
    {
      key: 4,
      amount: 10,
      svg: { fill: "#ef6d51" },
      label: "Miercoles",
    },
    {
      key: 1,
      amount: 25,
      svg: { fill: "#44DB5E" },
      label: "Jueves",
    },
    {
      key: 5,
      amount: 10,
      svg: { fill: "#db44b8" },
      label: "Viernes",
    },
    {
      key: 6,
      amount: 15,
      svg: { fill: "#f3e71d" },
      label: "Sabado",
    },
    {
      key: 7,
      amount: 20,
      svg: { fill: "#ff0000" },
      label: "Domingo",
    },
  ]);

  useEffect(() => { 
        getExercices();
  }, [isFocused,change]);

  const getExercices = async () => {
    console.log('///////////////entre//////////////////////');
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
        let tempDomingo = [];
        let tempMinuLunes = 0;
        let tempMinuMartes = 0;
        let tempMinuMiercoles = 0;
        let tempMinuJueves = 0;
        let tempMinuViernes = 0;
        let tempMinuSabado = 0;
      let tempMinuDomingo = 0;
      let tempMinuTotal = 0;
      
      let porcentajeLunes = 0;
      let porcentajeMartes = 0;
      let porcentajeMiercoles = 0;
      let porcentajeJueves = 0;
      let porcentajeViernes = 0;
      let porcentajeSabado = 0;
      let porcentajeDomingo = 0;



        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            temp.push(doc.data());
          doc.data().dias.forEach((item) => {
                if (item === "lunes"){
                    tempLunes.push(
                        {
                            id: doc.id,
                            data: doc.data(),
                        }
                  )
                  tempMinuLunes = tempMinuLunes + parseInt(doc.data().minutos);
                }
                if (item === "martes"){
                    tempMartes.push(
                        {
                            id: doc.id,
                            data: doc.data(),
                        }
                  )
                  tempMinuMartes = tempMinuMartes + parseInt(doc.data().minutos);
                }
                if (item === "miercoles"){
                    tempMiercoles.push(
                        {
                            id: doc.id,
                            data: doc.data(),
                        }
                  )
                  tempMinuMiercoles = tempMinuMiercoles + parseInt(doc.data().minutos);
                }
                if (item === "jueves"){
                    tempJueves.push(
                        {
                            id: doc.id,
                            data: doc.data(),
                        }
                  )
                  tempMinuJueves = tempMinuJueves + parseInt(doc.data().minutos);
                }
                if (item === "viernes"){
                    tempViernes.push(
                        {
                            id: doc.id,
                            data: doc.data(),
                        }
                  )
                  tempMinuViernes = tempMinuViernes + parseInt(doc.data().minutos);
                }
                if (item === "sabado"){
                    tempSabado.push(
                        {
                            id: doc.id,
                            data: doc.data(),
                        }
                  )
                  tempMinuSabado = tempMinuSabado + parseInt(doc.data().minutos);
                }
                if (item === "domingo"){
                    tempDomingo.push(
                        {
                            id: doc.id,
                            data: doc.data(),
                        }
                  )
                  tempMinuDomingo = tempMinuDomingo + parseInt(doc.data().minutos);
                }
            })
        });
      tempMinuTotal = tempMinuLunes + tempMinuMartes + tempMinuMiercoles + tempMinuJueves + tempMinuViernes + tempMinuSabado + tempMinuDomingo;

      porcentajeLunes = (tempMinuLunes * 100) / tempMinuTotal;
      porcentajeMartes = (tempMinuMartes * 100) / tempMinuTotal;
      porcentajeMiercoles = (tempMinuMiercoles * 100) / tempMinuTotal;
      porcentajeJueves = (tempMinuJueves * 100) / tempMinuTotal;
      porcentajeViernes = (tempMinuViernes * 100) / tempMinuTotal;
      porcentajeSabado = (tempMinuSabado * 100) / tempMinuTotal;
      porcentajeDomingo =  (tempMinuDomingo * 100) / tempMinuTotal;

      setTotal(tempMinuTotal);
      setDataGrafica([
                {
      key: 2,
      amount: parseInt(porcentajeLunes),
      svg: { fill: "#5AC8FB" },
      label: "Lunes",
    },
    {
      key: 3,
      amount: parseInt(porcentajeMartes),
      svg: { fill: "#5856D6" },
      label: "Marter",
    },
    {
      key: 4,
      amount: parseInt(porcentajeMiercoles),
      svg: { fill: "#ef6d51" },
      label: "Miercoles",
    },
    {
      key: 1,
      amount: parseInt(porcentajeJueves),
      svg: { fill: "#44DB5E" },
      label: "Jueves",
    },
    {
      key: 5,
      amount: parseInt(porcentajeViernes),
      svg: { fill: "#db44b8" },
      label: "Viernes",
    },
    {
      key: 6,
      amount: parseInt(porcentajeSabado),
      svg: { fill: "#f3e71d" },
      label: "Sabado",
    },
    {
      key: 7,
      amount: parseInt(porcentajeDomingo),
      svg: { fill: "#ff0000" },
      label: "Domingo",
    },
      ])
          
      
    } catch (e) {
        console.log(e);
    }
  }

  return (
    total != 0 ?
    <View paddingV-24 paddingL-24 paddingR-16 row>
      <View
        style={{
          height: 180,
          width: 180,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <PieChartSvg
          style={{ height: 180, width: 180, position: "absolute" }}
          valueAccessor={({ item }) => item.amount}
          data={dataGrafica}
          outerRadius={"95%"}
          innerRadius={"80%"}
          padAngle={0.01}
        />
        <Text M36 color28>
          {total}
        </Text>
        <Text R14 color6D>
          Minutos
        </Text>
      </View>
      <View centerV marginL-24>
        {dataGrafica.map((item, index) => {
          return (
            <View row marginB-4 key={index}>
              <Tag size={8} color={item.svg.fill} style={{ marginTop: 6 }} />
              <View marginL-8>
                <Text H14 color28>
                  {item.label}
                </Text>
                <Text R14 color6D>
                  {item.amount}%
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </View> :
    <View
        style={{
          height: 180,
          width: 380,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <PieChartSvg
          style={{ height: 180, width: 180, position: "absolute"}}
          valueAccessor={({ item }) => item.amount}
          data={dataGrafica}
          outerRadius={"95%"}
          innerRadius={"80%"}
          padAngle={0.01}
        />
        <Text M36 color28>
          {total}
        </Text>
        <Text R14 color6D>
          Minutos
        </Text>
      </View>
  );
};

export default PieChart;
