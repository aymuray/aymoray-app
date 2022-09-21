import ButtonLinear from 'components/ButtonLinear';
import {scaleH, width} from 'config/scaleAccordingToDevice';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {View, Text, Image, Assets, Colors, Button} from 'react-native-ui-lib';
import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';
import {useNavigation} from '@react-navigation/native';
import Routes from 'config/Routes';
import Input from 'components/Input';
import {Controller, useForm} from 'react-hook-form';
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from "config/fb";
import Login from "modules/Login";
const SignUp = () => {
  const [RegistroFirebase, setRegistroFirebase] = useState('');
  const [cargando, setCargando] = useState(true);
  const [textoBotonRegistro, setTextoBotonRegistro] = useState('Registrarse');
  const {navigate} = useNavigation();
  const onLogin = React.useCallback(() => {
    navigate(Routes.Login);
  }, []);
  const onSignUp = React.useCallback(async() => {
    if (cargando){
      setRegistroFirebase('');
      setCargando(false);
      setTextoBotonRegistro('Cargando...');
      var email = getValues("email")
      var password = getValues("password")
      var repassword = getValues("rePassword")
      if (password === repassword){
        await createUserWithEmailAndPassword (auth, email, password).then( ()=>{
          setTextoBotonRegistro('Registrarse');
          setCargando(true);
          navigate(Routes.StepOne);
        }).catch( error =>{
          console.log(error.message)
          if (error.message==='Firebase: Error (auth/invalid-email).'){
            setRegistroFirebase('email')
          }
          if (error.message==='Firebase: Password should be at least 6 characters (auth/weak-password).'){
            setRegistroFirebase('Password')
          }
        });
      }else {
        setRegistroFirebase('rePassword')
      }
    }
  }, [cargando]);

  const {control, getValues, handleSubmit, formState: { errors }} = useForm({
    defaultValues: {
      email: '',
      password: '',
      rePassword: '',
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
          justifyContent: 'flex-end',
        }}>
        <Image
          source={Assets.icons.logoSignUp}
          style={{marginBottom: scaleH(30)}}
        />
        {/*<Button*/}
        {/*  label="Registrate con Facebook"*/}
        {/*  iconSource={Assets.icons.ic_facebook}*/}
        {/*  backgroundColor={Colors.facebook}*/}
        {/*  style={{width: width - 48}}*/}
        {/*  enableShadow*/}
        {/*/>*/}
        {/*<Image*/}
        {/*  source={Assets.icons.or}*/}
        {/*  marginV-24*/}
        {/*  style={{marginVertical: scaleH(24)}}*/}
        {/*/>*/}
        <Controller
          control={control}
          name="email"
          render={({field: {value, onChange}}) => (
            <Input value={value} onChangeText={onChange} label={'Email'} />
          )}
          rules={{ required: true }}
        />
        {errors.email && <Text R14 color28 style={{ color: "#ff0000"}}>Este campo debe ser completado</Text>}
        <Controller
          control={control}
          name="password"
          render={({field: {value, onChange}}) => (
            <Input
              value={value}
              onChangeText={onChange}
              secureTextEntry={true}
              label={'Contraseña'}
            />
          )}
          rules={{ required: true }}
        />
        {errors.password && <Text R14 color28 style={{ color: "#ff0000"}}>Este campo debe ser completado</Text>}
        <Controller
          control={control}
          name="rePassword"
          render={({field: {value, onChange}}) => (
            <Input
              value={value}
              onChangeText={onChange}
              secureTextEntry={true}
              label={'Confirmar Contraseña'}
            />
          )}
          rules={{ required: true }}
        />
        {errors.rePassword && <Text R14 color28 style={{ color: "#ff0000"}}>Este campo debe ser completado</Text>}
        {RegistroFirebase==='rePassword' && <Text R14 color28 style={{paddingBottom: 12, color: "#ff0000"}}>Las contraseñas no coinciden</Text>}
        {RegistroFirebase==='email' && <Text R14 color28 style={{paddingBottom: 12, color: "#ff0000"}}>Correo invalido</Text>}
        {RegistroFirebase==='Password' && <Text R14 color28 style={{paddingBottom: 12, color: "#ff0000"}}>La contraseña debe tener al menos 6 caracteres</Text>}
        <ButtonLinear
          title={textoBotonRegistro}
          style={styles.btnSignUp}
          onPress={handleSubmit(onSignUp)}
        />
        <Text R14 color28 center>
          ¿Ya tienes una cuenta?
          <Text R14 buttonLink onPress={onLogin}>
            {' '}
            Iniciar sesión
          </Text>
        </Text>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  btnSignUp: {
    marginVertical: scaleH(16),
  },
  container: {
    backgroundColor: Colors.contentW,
  },
});
