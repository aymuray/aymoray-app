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
import {collection, doc, getDoc, getDocs, query, where} from "firebase/firestore";
import Diary from "modules/Diary";

const GenerateRecipe = () => {
  const {navigate} = useNavigation();
  const dias = ["1 dias", "2 dias", "3 dias ", "4 dias", "5 dias", "6 dias", "7 dias"];
  const precios = ["s/15 - s/25", "s/15 - s/35", "s/15 - s/45"];
  const [DiasMenu, setDiasMenu] = useState(8);
  const [precioMenu, setPrecioMenu] = useState(4);
  const [alimentoMenu, setAlimentoMenu] = useState(999999);
  const [name, setName] = useState('');
  const [user, setUser] = useState(null);
  const [calorias, setCalorias] = useState('');
  const [uid, setUid] = useState('');
  const [actionButton, setActionButton] = useState(true);
  const [requireDias, setRequireDias] = useState(3);
  const [requireAlimento, setRequireAlimento] = useState(3);
  const [requirePrecio, setRequirePrecio] = useState(3);
  const [dataAlimentos, setDataAlimentos] = useState([]);
  const [activateMenu, setActivateMenu] = useState(false);
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
    try {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setName(user.displayName);
          setUid(user.uid);
        }
      })
      let tempAlimentos = []
      let temMenu = []
      const docRef = doc(db, "usuarios", uid);
      const docSnap = await getDoc(docRef);
      setCalorias(docSnap.data().GET);
      const querySnapshot  = await getDocs(collection(db, "Alimentos"));
      querySnapshot.forEach((doc)=>{
        tempAlimentos.push(doc.data().Nombre)
      });
      setDataAlimentos(tempAlimentos);
      const queryMenus = await query(collection(db, "Menus"), where("idUser", "==", uid));
      const querySnapshotMenus = await getDocs(queryMenus);
      querySnapshotMenus.forEach((doc) => {
        temMenu.push({
          "FechaCreacion": doc.data().FechaCreacion.toDate().toLocaleDateString('es-ES'),
          "dias": doc.data().dias
        })
      });
      let FechaHoy = new Date()
      temMenu.forEach(item =>{
        if(item.FechaCreacion===FechaHoy.toLocaleDateString('es-ES')){
          console.log('------------LAS FEHCAS COINCIDEN----------------')
          setActivateMenu(true)
        }
      })


      LogBox.ignoreLogs(["timer"]);
    } catch (e){
      console.log(e)
    }

  }, [uid]);

  const Generate = React.useCallback(async () => {
    let temp_dias = 3;
    let temp_precios = 3;
    let temp_alimentos = 3;

    if ((DiasMenu===8)){
      setRequireDias(1);
      temp_dias = 1;
    }else {
      setRequireDias(0);
      temp_dias = 0;
    }
    if ((precioMenu===4)){
      setRequirePrecio(1)
      temp_precios = 1;
    }else {
      setRequirePrecio(0)
      temp_precios = 0;
    }
    if ((alimentoMenu===999999)){
      setRequireAlimento(1)
      temp_alimentos = 1;
    }else {
      setRequireAlimento(0)
      temp_alimentos = 0;
    }
    if (temp_dias===0 && temp_alimentos===0  && temp_precios===0 && !activateMenu){
      if(actionButton){
        try {
          setActionButton(false);
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
              alimentoNoDeseado: alimentoMenu
            },
            headers: {
              'Content-Type': 'application/json'
            }})
              .then(function (response) {
                //handle success
                // console.log(response.data)
                navigate(Routes.ListRecipes, {
                  refrescar: false,
                } );
              })
              .catch(function (err) {
                console.log(err)
              });
        }catch (e){
          console.log(e)
        }
      }
    }
  }, [DiasMenu, calorias, uid, actionButton, DiasMenu, precioMenu, alimentoMenu, requireDias, requireAlimento, requirePrecio]);

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
              Seleccione algun alimento del cual no desee encontrar en su menu
            </Text>
          </View>
          <View height={1} backgroundColor={Colors.line} marginB-16 />

          <SelectDropdown
              data={dataAlimentos}
              onSelect={(selectedItem, index) => {
                console.log(DiasMenu)
                let temp = index + 1;
                setAlimentoMenu(selectedItem);
                console.log(selectedItem, temp);
              }}
              defaultButtonText={'Seleccione un alimento '}
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
              rowTextStyle={styles.dropdown1RowTxtStyle}
              selectedRowStyle={styles.dropdown1SelectedRowStyle}
              search
              searchInputStyle={styles.dropdown1searchInputStyleStyle}
              searchPlaceHolder={'Search here'}
              searchPlaceHolderColor={'darkgrey'}
              renderSearchInputLeftIcon={() => {
                return <FontAwesome name={'search'} color={'#444'} size={18} />;
              }}
          />
          {requireAlimento===1 && <Text R14 color28 style={{marginRight: 'auto', marginLeft:'auto', color: "#ff0000", paddingBottom: 12,}}>Este campo debe ser completado</Text>}
        </Box>
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
          {requireDias===1 && <Text R14 color28 style={{marginRight: 'auto', marginLeft:'auto', color: "#ff0000", paddingBottom: 12,}}>Este campo debe ser completado</Text>}
        </Box>
        <View height={16} />
        <Box>
          <View
              row
              paddingH-16
              paddingV-12
              style={{justifyContent: 'space-between', alignItems: 'center'}}>
            <Text H14 color28 >
              Seleccione el rango de valor por el cual se genere las recetas
            </Text>
          </View>
          <View height={1} backgroundColor={Colors.line} marginB-16 />

          <SelectDropdown
              data={precios}
              onSelect={(selectedItem, index) => {
                console.log(DiasMenu)
                let temp = index + 1;
                setPrecioMenu(temp);
                // console.log(selectedItem, temp);
              }}
              defaultButtonText={'Seleccione el rango de precios'}
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
          {requirePrecio===1 && <Text R14 color28 style={{marginRight: 'auto', marginLeft:'auto', color: "#ff0000", paddingBottom: 12,}}>Este campo debe ser completado</Text>}
        </Box>

        {activateMenu && <Text R14 color28 style={{marginRight: 'auto', marginLeft:'auto', color: "#ff0000", paddingBottom: 12,}}>Ya tiene un receta activa, espera que termine la vigencia de esta para generar otra</Text>}
        <ButtonLinear
          title={!actionButton ? "Cargando..." : "Listo"}
          onPress={ () =>{
            if (activateMenu === false){
              Generate()
            }
          } }
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
  dropdown1SelectedRowStyle: {backgroundColor: 'rgba(0,0,0,0.1)'},
  dropdown1searchInputStyleStyle: {
    backgroundColor: '#EFEFEF',
    borderRadius: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
});
