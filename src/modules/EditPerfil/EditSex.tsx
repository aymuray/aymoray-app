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
import {doc, getDoc, setDoc} from "firebase/firestore";
import {auth, db} from "config/fb";


const EditSex = () => {
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
  const onNext = useCallback(async () => {
      try {
          const docRef = doc(db, "usuarios", uid)
          const docSnap = await getDoc(docRef);
          let data = docSnap.data()
          data.sexo = index
          await setDoc(docRef, data).then(()=>{
              console.log('Se acutailizo')
              navigate(Routes.MyProfile);
          })
      }catch (e){
          console.log(e)
      }
  }, [index, uid]);


  const {control, handleSubmit, formState: { errors }} = useForm({
    defaultValues: {
      name: '',
      age: '',
    },
  });
  return (
    <View flex backgroundColor={Colors.contentW}>
      <Text H36 marginL-24>
        Edición de sexo
      </Text>
      <Text R18 marginL-24>
          ¿Cuál es tu sexo?
      </Text>
      <KeyboardAwareScrollView>
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
          style={{marginTop: 250}}
        />
      </KeyboardAwareScrollView>
      <FooterLinear title={'Guardar'} onPress={handleSubmit(onNext)} />
    </View>
  );
};

export default EditSex;

const styles = StyleSheet.create({});
