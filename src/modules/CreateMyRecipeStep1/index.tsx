import Box from 'components/Box';
import ButtonLinear from 'components/ButtonLinear';
import Header from 'components/Header';
import Input from 'components/Input';
import {bottom, width} from 'config/scaleAccordingToDevice';
import React from 'react';
import {
  View,
  Text,
  Colors,
  Image,
  Assets,
  KeyboardAwareScrollView,
} from 'react-native-ui-lib';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import Routes from 'config/Routes';
import {Controller, useForm} from 'react-hook-form';
const CreateMyRecipeStep1 = () => {
  const {navigate} = useNavigation();
  const {control} = useForm({
    defaultValues: {
      name: '',
      serving: '',
    },
  });
  return (
    <View flex backgroundColor={Colors.background}>
      <Header title="Create a Recipe - Step 1/2" back />
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
            <Text H14 color28 uppercase>
              Basic Infomation
            </Text>
          </View>
          <View height={1} backgroundColor={Colors.line} marginB-16 />
          <Controller
            control={control}
            name="name"
            render={({field: {value, onChange}}) => (
              <Input
                value={value}
                onChangeText={onChange}
                label={'Recipe Name'}
                parentStyle={{marginHorizontal: 16, width: width - 64}}
              />
            )}
          />
          <Controller
            control={control}
            name="serving"
            render={({field: {value, onChange}}) => (
              <Input
                value={value}
                onChangeText={onChange}
                label={'No. of Serving'}
                parentStyle={{marginHorizontal: 16, width: width - 64}}
              />
            )}
          />
        </Box>
        <Box>
          <View
            row
            paddingH-16
            paddingV-12
            style={{justifyContent: 'space-between', alignItems: 'center'}}>
            <Text H14 color28 uppercase>
              Photo of Recipe
            </Text>
          </View>
          <View height={1} backgroundColor={Colors.line} />
          <TouchableOpacity
            onPress={() => {
              navigate(Routes.TakePhoto);
            }}>
            <View
              margin-16
              center
              height={250}
              style={{
                borderWidth: 1,
                borderRadius: 1,
                borderColor: Colors.line,
                borderStyle: 'dashed',
              }}>
              <Image source={Assets.icons.ic_camera} />
            </View>
          </TouchableOpacity>
        </Box>

        <ButtonLinear
          title="next"
          onPress={() => {
            navigate(Routes.CreateMyRecipeStep2);
          }}
        />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default CreateMyRecipeStep1;
