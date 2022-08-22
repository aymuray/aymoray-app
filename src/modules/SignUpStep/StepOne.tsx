import {useNavigation} from '@react-navigation/native';
import FooterLinear from 'components/FooterLinear';
import Input from 'components/Input';
import Routes from 'config/Routes';
import SegmentControl from 'libs/react-native-segment';
import React, {useCallback, useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {LogBox, StyleSheet} from 'react-native';
import {
  View,
  Text,
  Colors,
  Image,
  Assets,
  KeyboardAwareScrollView,
} from 'react-native-ui-lib';
import { onAuthStateChanged } from "firebase/auth";
import { updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import {auth, db} from "config/fb";


const StepOne = () => {
    const [uid, setUid] = useState('');
    const [index, setIndex] = useState('Hombre');
    console.log('in render:', index)
    console.log(uid)

    useEffect(() => {
         onAuthStateChanged(auth, (user)=>{
            if (user) {
                setUid(user.uid);
            }
        })
        LogBox.ignoreLogs(["timer"]);
    }, []);

  const {navigate} = useNavigation();
  const onNext = useCallback(async (data) => {
      if (auth.currentUser) {
          await updateProfile(auth.currentUser, {
              displayName: data.name
          }).then(() => {
              console.log("-------------Profile updated!-------------")
              console.log(auth.currentUser?.uid)
              let id = auth.currentUser?.uid
              try {
                  if (id != null) {
                      setDoc(doc(db, "usuarios", id), {
                          nombre: data.name,
                          edad: parseInt(data.age),
                          sexo: index
                      }).then(() => {
                          navigate(Routes.StepTwo);
                      })
                  }
              }catch (e){
                  console.log(e)
              }
          }).catch((error) => {
              console.log(error)
          });
      }
  }, [index]);

    // const onNext = (data) =>{
    //     console.log(data);
    // }

  const {control, handleSubmit, formState: { errors }} = useForm({
    defaultValues: {
      name: '',
      age: '',
    },
  });
  return (
    <View flex backgroundColor={Colors.contentW}>
      <Text H36 marginL-24>
        Paso 1/5
      </Text>
      <Text R18 marginL-24>
          ¡Hola! ¿Cuál es tu nombre?
      </Text>
      <KeyboardAwareScrollView>
        <Image
          source={Assets.icons.img_user_photo}
          style={{alignSelf: 'center'}}
          marginV-40
        />
        <Controller
          control={control}
          name="name"
          render={({field: {value, onChange}}) => (
            <Input value={value} onChangeText={onChange} label={'Tu Nombre'} />
          )}
          rules={{ required: true }}
        />
          {errors.name && <Text R14 color28 style={{ color: "#ff0000", marginLeft: 70, paddingBottom: 12}}>Este campo debe ser completado</Text>}
        <Controller
          control={control}
          name="age"
          render={({field: {value, onChange}}) => (
            <Input
              value={value}
              onChangeText={onChange}
              label={'Tu edad'}
              keyboardType={'phone-pad'}
            />
          )}
          rules={{ required: true }}
        />
          {errors.age && <Text R14 color28 style={{ color: "#ff0000", marginLeft: 70}}>Este campo debe ser completado</Text>}
        <SegmentControl
          values={['Hombre', 'Mujer']}
          onChange={ (currentIndex) => {
              console.log(currentIndex);
              if (currentIndex === 1) {
                  setIndex('Mujer');
              }if (currentIndex === 0) {
                  setIndex('Hombre');
              }
          }}
          disable={false}
          selectedIndex={0}
          style={{marginTop: 24}}
        />
      </KeyboardAwareScrollView>
      <FooterLinear title={'Siguiente'} onPress={handleSubmit(onNext)} />
    </View>
  );
};

export default StepOne;

const styles = StyleSheet.create({});
