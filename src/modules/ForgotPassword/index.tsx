import ButtonLinear from 'components/ButtonLinear';
import Input from 'components/Input';
import {scaleH, width} from 'config/scaleAccordingToDevice';
import React, { useState } from 'react';
import {StyleSheet} from 'react-native';
import {View, Text, Image, Assets, Colors, Button} from 'react-native-ui-lib';
import {useNavigation} from '@react-navigation/native';
import Routes from 'config/Routes';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import {Controller, useForm} from 'react-hook-form';
import { auth } from '../../config/fb';
import {  sendPasswordResetEmail  } from "firebase/auth";
import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';
import Login from "modules/Login";


const ForgotPassword = () => {
  const [LoginFirebase, setLoginFirebase] = useState('');
  const [goLogin, setGoLogin] = useState(false);
  const {navigate} = useNavigation();
  const onResetPassword = React.useCallback( (data) => {
      setLoginFirebase('')
      console.log(data.email);
      sendPasswordResetEmail(auth, data.email.replace(" ",""))
          .then(() => {
              setLoginFirebase("ok")
              setGoLogin(true)
          })
          .catch((error) => {
              console.log(error.message);
              setLoginFirebase("noSeEncontro")
          });
  }, []);

    const onLogIn = React.useCallback(() => {
        navigate(Routes.Login);
    }, []);

  const {control, getValues, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <KeyboardAwareScrollView bounces={false} style={styles.container}>
        <View
            flex
            backgroundColor={Colors.contentW}
            centerH
            style={{
                paddingTop: scaleH(40),
                paddingBottom: 24 + getBottomSpace(),
            }}>
            <Image
                source={Assets.icons.logoSignUp}
                style={{marginBottom: scaleH(30)}}
            />
            <Text R14 color28 center style={{
                paddingBottom: 30 + getBottomSpace(),
                paddingLeft:20,
                paddingRight:20,
            }}>
                Ingresa tu correo electronico para enviar un correo en donde podras registrar tu nueva contraseña
            </Text>
            <Controller
                control={control}
                name="email"
                render={({field: {value, onChange}}) => (
                    <Input value={value} onChangeText={onChange} label={'Email'} />
                )}
                rules={{ required: true }}
            />
            {errors.email && <Text R14 color28 style={{paddingBottom: 12, color: "#ff0000"}}>Este campo debe ser completado</Text>}
            {LoginFirebase==='noSeEncontro' && <Text R14 color28 style={{paddingBottom: 12, color: "#ff0000"}}>No exite usuario con ese correo</Text>}
            {LoginFirebase==='ok' && <Text R14 color28 style={{paddingBottom: 12, color: "#8fee41"}}>Se envio el correo correctamente</Text>}
            {goLogin ?
                <ButtonLinear
                    title={'Ir a iniciar sesion'}
                    style={styles.btnSignUp}
                    onPress={onLogIn}
                />
                :
                <ButtonLinear
                    title={'Enviar correo de recuperacion'}
                    style={styles.btnSignUp}
                    onPress={handleSubmit(onResetPassword)}
                />
            }

        </View>
    </KeyboardAwareScrollView>

  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  btnSignUp: {
    marginTop: scaleH(24),
  },
  container: {
    backgroundColor: Colors.contentW,
  },
});
