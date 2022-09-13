import ButtonLinear from 'components/ButtonLinear';
import Header from 'components/Header';
import Input from 'components/Input';
import {width} from 'config/scaleAccordingToDevice';
import React, {useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {LogBox, StyleSheet, TouchableOpacity} from 'react-native';
import {View, Text, Colors, KeyboardAwareScrollView} from 'react-native-ui-lib';
import SelectDropdown from "react-native-select-dropdown";
import {FontAwesome} from "@expo/vector-icons";
import {onAuthStateChanged} from "firebase/auth";
import {auth, db} from "config/fb";
import {doc, addDoc, collection} from "firebase/firestore";
import Routes from "config/Routes";
import {useNavigation} from "@react-navigation/native";
import Exercires from "modules/Exercires";

const AddExercire = () => {
    const tipoEjercicio = ["aeróbico", "resistencia", "flexibilidad", "fortalecimiento "];
    const DATA_DAY = [
        {day: 'Lu'},
        {day: 'Ma'},
        {day: 'Mi'},
        {day: 'Ju'},
        {day: 'Vi'},
        {day: 'Sa'},
        {day: 'Do'},
    ];
    const [uid, setUid] = useState('');
    const [selectDay1, setSelectDay1] = useState(false);
    const [selectDay2, setSelectDay2] = useState(false);
    const [selectDay3, setSelectDay3] = useState(false);
    const [selectDay4, setSelectDay4] = useState(false);
    const [selectDay5, setSelectDay5] = useState(false);
    const [selectDay6, setSelectDay6] = useState(false);
    const [selectDay7, setSelectDay7] = useState(false);
    const [selectLevel, setSelectLevel] = useState('');
    const {navigate} = useNavigation();

    useEffect ( async () => {
        try {
            await onAuthStateChanged(auth, (user) => {
                if (user) {
                    setUid(user.uid);
                }
            })
            LogBox.ignoreLogs(["timer"]);
        } catch (e){
            console.log(e)
        }

    }, [uid]);


  const {control, handleSubmit, formState: { errors }} = useForm({
    defaultValues: {
      name: '',
      calories: '',
      duration: '',
    },
  });
    const save = React.useCallback(async (data) => {
    let training = {
        nombre: '',
        descripcion: '',
        minutos: '',
        dias: [],
        tipoEjercicio: '',
        idUser: ''
    }
    if(selectDay1){
        training.dias.push('lunes');
    }
    if(selectDay2){
        training.dias.push('martes');
    }
    if(selectDay3){
        training.dias.push('miercoles');
    }
    if(selectDay4){
        training.dias.push('jueves');
    }
    if(selectDay5){
        training.dias.push('viernes');
    }
    if(selectDay6){
        training.dias.push('sabado');
    }
    if(selectDay7){
        training.dias.push('domingo');
    }
    training.nombre = data.name;
    training.descripcion = data.calories;
    training.minutos = data.duration;
    training.tipoEjercicio =  selectLevel;
    training.idUser = uid;
    console.log(training);
    try {
        await addDoc(collection(db, "Ejercicios"), training).then(()=>{
            navigate(Routes.Exercires);
        });
    }catch (e){
        console.log(e)
    }
    },[selectLevel, selectDay1, selectDay2, selectDay3, selectDay4, selectDay5, selectDay6, selectDay7, uid])

  return (
    <View flex>
    <KeyboardAwareScrollView>
      <Header title={'Añadir Ejercico'} back />

          <View
              paddingT-0
              backgroundColor={Colors.white}
              margin-16
              style={{
                  borderRadius: 6,
                  shadowColor: '#000',
                  shadowOffset: {
                      width: 0,
                      height: 1,
                  },
                  shadowOpacity: 0.22,
                  shadowRadius: 2.22,
                  elevation: 3,
              }}>
              <Text marginV-12 H14 color28 uppercase marginL-16>
                  Informacion basica
              </Text>
              <View height={1} backgroundColor={Colors.line} marginB-16 />
              <Controller
                  control={control}
                  name="name"
                  render={({field: {value, onChange}}) => (
                      <Input
                          value={value}
                          onChangeText={onChange}
                          label={'Nombre del ejercicio'}
                          parentStyle={{marginHorizontal: 16, width: width - 64}}
                      />
                  )}
                  rules={{ required: true }}
              />
              {errors.name && <Text R14 color28 style={{paddingBottom: 12, color: "#ff0000", marginHorizontal: '20%', width: width - 64}}>Este campo debe ser completado</Text>}
              <Controller
                  control={control}
                  name="calories"
                  render={({field: {value, onChange}}) => (
                      <Input
                          value={value}
                          onChangeText={onChange}
                          label={'Descripción'}
                          parentStyle={{marginHorizontal: 16, width: width - 64}}
                      />
                  )}
                  rules={{ required: true }}
              />
              {errors.calories && <Text R14 color28 style={{paddingBottom: 12, color: "#ff0000", marginHorizontal: '20%', width: width - 64}}>Este campo debe ser completado</Text>}
              <Controller
                  control={control}
                  name="duration"
                  render={({field: {value, onChange}}) => (
                      <Input
                          value={value}
                          onChangeText={onChange}
                          label={'Duracion en minutos'}
                          parentStyle={{marginHorizontal: 16, width: width - 64}}
                          keyboardType={'phone-pad'}
                      />
                  )}
                  rules={{ required: true }}
              />
              {errors.duration && <Text R14 color28 style={{paddingBottom: 12, color: "#ff0000", marginHorizontal: '20%', width: width - 64}}>Este campo debe ser completado</Text>}
              <Text M14 color28 style={{
                  marginHorizontal: 16,
                  width: width - 64,
                  paddingBottom: 15
              }}>
                  Seleccione los dias que se hara uso de este ejercicio
              </Text>
              <View
                  row
                  paddingH-16
                  marginB-24
                  style={{justifyContent: 'space-between'}}>
                  <TouchableOpacity
                      style={{
                          borderRadius: 16,
                          width: 32,
                          height: 32,
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderColor: Colors.buttonLink,
                          borderWidth: selectDay1 ? 2 : 0,
                      }}
                      onPress={() => {
                          if (!selectDay1){
                              setSelectDay1(true)
                          }else {
                              setSelectDay1(false)
                          }
                      }}>
                      <Text M14 color28>
                          Lu
                      </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                      style={{
                          borderRadius: 16,
                          width: 32,
                          height: 32,
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderColor: Colors.buttonLink,
                          borderWidth: selectDay2 ? 2 : 0,
                      }}
                      onPress={() => {
                          if (!selectDay2){
                              setSelectDay2(true)
                          }else {
                              setSelectDay2(false)
                          }
                      }}>
                      <Text M14 color28>
                          Ma
                      </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                      style={{
                          borderRadius: 16,
                          width: 32,
                          height: 32,
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderColor: Colors.buttonLink,
                          borderWidth: selectDay3 ? 2 : 0,
                      }}
                      onPress={() => {
                          if (!selectDay3){
                              setSelectDay3(true)
                          }else {
                              setSelectDay3(false)
                          }
                      }}>
                      <Text M14 color28>
                          Mi
                      </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                      style={{
                          borderRadius: 16,
                          width: 32,
                          height: 32,
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderColor: Colors.buttonLink,
                          borderWidth: selectDay4 ? 2 : 0,
                      }}
                      onPress={() => {
                          if (!selectDay4){
                              setSelectDay4(true)
                          }else {
                              setSelectDay4(false)
                          }
                      }}>
                      <Text M14 color28>
                          Ju
                      </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                      style={{
                          borderRadius: 16,
                          width: 32,
                          height: 32,
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderColor: Colors.buttonLink,
                          borderWidth: selectDay5 ? 2 : 0,
                      }}
                      onPress={() => {
                          if (!selectDay5){
                              setSelectDay5(true)
                          }else {
                              setSelectDay5(false)
                          }
                      }}>
                      <Text M14 color28>
                          Vi
                      </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                      style={{
                          borderRadius: 16,
                          width: 32,
                          height: 32,
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderColor: Colors.buttonLink,
                          borderWidth: selectDay6 ? 2 : 0,
                      }}
                      onPress={() => {
                          if (!selectDay6){
                              setSelectDay6(true)
                          }else {
                              setSelectDay6(false)
                          }
                      }}>
                      <Text M14 color28>
                          Sa
                      </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                      style={{
                          borderRadius: 16,
                          width: 32,
                          height: 32,
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderColor: Colors.buttonLink,
                          borderWidth: selectDay7 ? 2 : 0,
                      }}
                      onPress={() => {
                          if (!selectDay7){
                              setSelectDay7(true)
                          }else {
                              setSelectDay7(false)
                          }
                      }}>
                      <Text M14 color28>
                          Do
                      </Text>
                  </TouchableOpacity>
              </View>
              <SelectDropdown
                  data={tipoEjercicio}
                  onSelect={(selectedItem, index) => {
                      let temp = index + 1;
                      setSelectLevel(selectedItem);
                      console.log(selectedItem, temp);
                  }}
                  defaultButtonText={'Seleccione el tipo de ejercicio '}
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
          </View>
      <ButtonLinear
        title={'Agregar'}
        onPress={handleSubmit(save)}
        style={{marginTop: 50}}
      />
    </KeyboardAwareScrollView>
    </View>
  );
};

export default AddExercire;

const styles = StyleSheet.create({
    dropdown1BtnStyle: {
        width: '92%',
        height: 55,
        backgroundColor: '#FFF',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: 'rgba(231,231,231,0.91)',
        marginRight: 'auto',
        marginLeft: 'auto',
        marginBottom: 20
    },
    dropdown1BtnTxtStyle: {color: 'rgba(68,68,68,0.85)', textAlign: 'left'},
    dropdown1DropdownStyle: {backgroundColor: '#EFEFEF'},
    dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
    dropdown1RowTxtStyle: {color: '#7c7c7c', textAlign: 'left'},
    dropdown1SelectedRowStyle: {backgroundColor: 'rgba(0,0,0,0.06)'},
    dropdown1searchInputStyleStyle: {
        backgroundColor: '#EFEFEF',
        borderRadius: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#444',
    },
});
