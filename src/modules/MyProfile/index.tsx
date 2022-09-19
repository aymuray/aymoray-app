import { useNavigation } from "@react-navigation/core";
import Box from "components/Box";
import ButtonIconBadge from "components/ButtonIconBadge";
import Header from "components/Header";
import Routes from "config/Routes";
import { width } from "config/scaleAccordingToDevice";
import React, {useEffect, useState} from "react";
import {LogBox, ScrollView, TouchableOpacity} from "react-native";
import { View, Text, Colors, Assets, Image } from "react-native-ui-lib";
import ButtonLinear from "components/ButtonLinear";
import {onAuthStateChanged} from "firebase/auth";
import {auth, db} from "config/fb";
import {doc, getDoc, setDoc} from "firebase/firestore";
import {useIsFocused} from "@react-navigation/native";
import EditWeight from "modules/EditPerfil/EditWeight";
import EditTrainingLevel from "modules/EditPerfil/EditTrainingLevel";
import EditHeight from "modules/EditPerfil/EditHeight";
import EditName from "modules/EditPerfil/EditName";

const MyProfile = () => {
  const { navigate } = useNavigation();
  const [name, setName] = useState('');
  const [user, setUser] = useState(null);
  const [peso, setPeso] = useState('');
  const [estatura, setEstatura] = useState('');
  const [deporte, setDeporte] = useState('');
  const [sexo, setSexo] = useState('');
  const [docSnap, setDocSnap] = useState(null);
  const [nivelEntrenamiento, setNivelEntrenamiento] = useState('');
  const [uid, setUid] = useState('');
  const isFocused = useIsFocused();

  useEffect(async () => {
    if (isFocused){
      try {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            setName(user.displayName);
            setUid(user.uid);
          }
        })

        const docRef = doc(db, "usuarios", uid);
        const docSnap = await getDoc(docRef);
        setUser(docSnap.data());
        setEstatura(docSnap.data().estatura);
        setDeporte(docSnap.data().deporte);
        setSexo(docSnap.data().sexo);
        setNivelEntrenamiento(docSnap.data().nivelEntrenamiento);
        setPeso(docSnap.data().peso);
      }catch (e){
        console.log(e)
      }
    }
    LogBox.ignoreLogs(["timer"]);
  }, [isFocused,uid]);


  const onEditSport = React.useCallback(() => {
    navigate(Routes.EditSport);
  }, []);
  const onEditWeight = React.useCallback(() => {
    navigate(Routes.EditWeight);
  }, []);
  const onEditTrainingLevel = React.useCallback(() => {
    navigate(Routes.EditTrainingLevel);
  }, []);
  const onEditSex= React.useCallback(() => {
    navigate(Routes.EditSex);
  }, []);
  const onEditHeight= React.useCallback(() => {
    navigate(Routes.EditHeight);
  }, []);
  const onEditName= React.useCallback(() => {
    navigate(Routes.EditName);
  }, []);
  return (
    <View flex backgroundColor={Colors.background}>
      <ScrollView>
        <Image
          source={Assets.icons.bg_tab}
          style={{ position: "absolute", width: width, height: 300, top: -50}}
        />
        <Header
          title="Tu perfil"
          back
          noShadow
          color="white"
          style={{
            backgroundColor: "transparent",
          }}
        />
        <Image
          source={Assets.icons.img_avatar}
          marginT-50
          marginB-24
          style={{ alignSelf: "center" }}
        />
        <Text M18 color28 marginT-8 marginL-16 marginR-16 marginB-16>
          Si deseas editar tu informacion preciona el elemento a editar
        </Text>
        <Box>
          <View row>
            <View paddingV-16 paddingL-16 flex>
              <Text R16 color6D>
                Nombre
              </Text>
              <Text M24 color28 marginT-8 onPress={onEditName}>
                {name}
              </Text>
            </View>
            <View width={1} backgroundColor={Colors.line} />
            <View paddingV-16 paddingL-16 flex>
              <Text R16 color6D>
                Tu peso
              </Text>
              <View row centerV>
                <Text M36 color28 marginR-16 onPress={onEditWeight}>
                  {peso}{" "}
                  <Text R18 color28>
                    kg
                  </Text>
                </Text>

                <Image source={Assets.icons.graph} />
              </View>
            </View>
          </View>
        </Box>
        <Box>
          <View row>
            <View paddingV-16 paddingL-16 flex>
              <Text R16 color6D>
                Tu Deporte
              </Text>
              <Text M24 color28 marginT-8 onPress={onEditSport}>
                {deporte}
              </Text>
            </View>
            <View width={1} backgroundColor={Colors.line}  />
            <View paddingV-16 paddingL-16 flex>
              <Text R16 color6D>
                Tu estatura
              </Text>
              <View row centerV>
                <Text M36 color28 marginR-16 onPress={onEditHeight}>
                  {estatura}{" "}
                  <Text R18 color28>
                    cm
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        </Box>
        <Box>
          <View row>
            <View paddingV-16 paddingL-16 flex>
              <Text R16 color6D>
                Nivel de entrenamiedo
              </Text>
              <Text M24 color28 marginT-8 onPress={onEditTrainingLevel}>
                {nivelEntrenamiento}
              </Text>
            </View>
            <View width={1} backgroundColor={Colors.line} />
            <View paddingV-16 paddingL-16 flex>
              <Text R16 color6D>
                Tu sexo
              </Text>
              <View row centerV>
                <Text M24 color28 marginR-16 onPress={onEditSex}>
                  {sexo}{" "}
                </Text>
              </View>
            </View>
          </View>
        </Box>

        {/*<Box>*/}
        {/*  <Text H14 color28 uppercase marginT-13 marginB-11 marginL-16>*/}
        {/*    Menu*/}
        {/*  </Text>*/}
        {/*  <View height={1} backgroundColor={Colors.line} />*/}
        {/*  {DATA.map((item, index) => {*/}
        {/*    return (*/}
        {/*      <React.Fragment key={index}>*/}
        {/*        <TouchableOpacity*/}
        {/*          style={{*/}
        {/*            flexDirection: "row",*/}
        {/*            alignItems: "center",*/}
        {/*            padding: 16,*/}
        {/*          }}*/}
        {/*          onPress={item.onPress}*/}
        {/*        >*/}
        {/*          <Image*/}
        {/*            source={item.icon}*/}
        {/*            style={{*/}
        {/*              width: 32,*/}
        {/*              height: 32,*/}
        {/*            }}*/}
        {/*          />*/}
        {/*          <Text M16 color28 marginL-16>*/}
        {/*            {item.title}*/}
        {/*          </Text>*/}
        {/*        </TouchableOpacity>*/}
        {/*        <View height={1} backgroundColor={Colors.line} />*/}
        {/*      </React.Fragment>*/}
        {/*    );*/}
        {/*  })}*/}
        {/*</Box>*/}
      </ScrollView>
    </View>
  );
};
export default MyProfile;
