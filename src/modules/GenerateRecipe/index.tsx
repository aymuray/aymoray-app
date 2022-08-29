import Box from 'components/Box';
import ButtonLinear from 'components/ButtonLinear';
import Input from 'components/Input';
import {bottom, width} from 'config/scaleAccordingToDevice';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Colors,
  Image,
  Assets,
  KeyboardAwareScrollView,
} from 'react-native-ui-lib';
import {LogBox, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import Routes from 'config/Routes';
import {Controller, useForm} from 'react-hook-form';
import SelectDropdown from 'react-native-select-dropdown'
import {FontAwesome} from "@expo/vector-icons";
import axios from "axios";
import {onAuthStateChanged} from "firebase/auth";
import {auth, db} from "config/fb";
import {doc, getDoc} from "firebase/firestore";
import Diary from "modules/Diary";

const GenerateRecipe = () => {
  const {navigate} = useNavigation();
  const dias = ["1 dias", "2 dias", "3 dias ", "4 dias", "5 dias", "6 dias", "7 dias"];
  const [DiasMenu, setDiasMenu] = useState(8);
  const [name, setName] = useState('');
  const [user, setUser] = useState(null);
  const [calorias, setCalorias] = useState('');
  const [uid, setUid] = useState('');
  const {control} = useForm({
    defaultValues: {
      name: '',
      category: '',
      barcode: '',
      serving: '',
      unit: '',
    },
  });

  useEffect ( async () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setName(user.displayName);
        setUid(user.uid);
      }
    })

    const docRef = doc(db, "usuarios", uid);
    const docSnap = await getDoc(docRef);
    setCalorias(docSnap.data().GET);
    LogBox.ignoreLogs(["timer"]);
  }, [uid]);

  const Generate = React.useCallback(async () => {
    // navigate(Routes.SignUp);

    console.log(DiasMenu);
    console.log('-------------------------');
    console.log(DiasMenu);
    console.log(parseInt(calorias));
    console.log(uid);
    console.log('-------------------------');
    await axios({
      method: 'post',
      url: "https://us-central1-dev-tesis.cloudfunctions.net/app/AG",
      data: {
        idUser: uid,
        dias: DiasMenu,
        caloriaObjetivo: parseInt(calorias),
        proteinaObjetivo: 150,
      },
      headers: {
        'Content-Type': 'application/json'
      }})
        .then(function (response) {
          //handle success
          console.log(response.data)
          navigate(Routes.Diary);
        })
        .catch(function (err) {
          //handle error
          console.log(err)
        });
  }, [DiasMenu, calorias, uid]);

  return (
    <View flex backgroundColor={Colors.background}>
      <KeyboardAwareScrollView
        contentContainerStyle={{
          paddingBottom: bottom,
        }}>
        <View height={16} />
        <Box>
          <View
            row
            paddingH-16
            paddingV-12
            style={{justifyContent: 'space-between', alignItems: 'center'}}>
            <Text H14 color28 >
              Seleccione la cantidad de dias por el cual se generan las recetas
            </Text>
          </View>
          <View height={1} backgroundColor={Colors.line} marginB-16 />

          <SelectDropdown
              data={dias}
              onSelect={(selectedItem, index) => {
                console.log(DiasMenu)
                let temp = index + 1;
                setDiasMenu(temp);
                console.log(selectedItem, temp);
              }}
              defaultButtonText={'Seleccione la cantidad de dias'}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
              buttonStyle={styles.dropdown1BtnStyle}
              buttonTextStyle={styles.dropdown1BtnTxtStyle}
              renderDropdownIcon={isOpened => {
                return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
              }}
              dropdownIconPosition={'right'}
              dropdownStyle={styles.dropdown1DropdownStyle}
              rowStyle={styles.dropdown1RowStyle}
              rowTextStyle={styles.dropdown1RowTxtStyle}>
          </SelectDropdown>
        </Box>
        <View height={16} />
        <Box>
          <View
              row
              paddingH-16
              paddingV-12
              style={{justifyContent: 'space-between', alignItems: 'center'}}>
            <Text H14 color28 >
              Seleccione algun alimento del cual no desee encontrar en su menu
            </Text>
          </View>
          <View height={1} backgroundColor={Colors.line} marginB-16 />

          <SelectDropdown
              data={dias}
              onSelect={(selectedItem, index) => {
                console.log(DiasMenu)
                let temp = index + 1;
                setDiasMenu(temp);
                console.log(selectedItem, temp);
              }}
              defaultButtonText={'Seleccione la cantidad de dias'}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
              buttonStyle={styles.dropdown1BtnStyle}
              buttonTextStyle={styles.dropdown1BtnTxtStyle}
              renderDropdownIcon={isOpened => {
                return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
              }}
              dropdownIconPosition={'right'}
              dropdownStyle={styles.dropdown1DropdownStyle}
              rowStyle={styles.dropdown1RowStyle}
              rowTextStyle={styles.dropdown1RowTxtStyle}>
          </SelectDropdown>
        </Box>


        <ButtonLinear
          title="Listo"
          onPress={Generate}
        />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default GenerateRecipe;

const styles = StyleSheet.create({
  dropdown1BtnStyle: {
    width: '80%',
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#7c7c7c',
    marginRight: 'auto',
    marginLeft: 'auto',
    marginBottom: 20
  },
  dropdown1BtnTxtStyle: {color: '#444', textAlign: 'left'},
  dropdown1DropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdown1RowTxtStyle: {color: '#7c7c7c', textAlign: 'left'},
});
