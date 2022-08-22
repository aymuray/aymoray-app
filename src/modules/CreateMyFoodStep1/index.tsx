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
const CreateMyFoodStep1 = () => {
  const {navigate} = useNavigation();

  const {control} = useForm({
    defaultValues: {
      name: '',
      category: '',
      barcode: '',
      serving: '',
      unit: '',
    },
  });
  return (
    <View flex backgroundColor={Colors.background}>
      <Header title="Create a Food - Step 1/2" back />
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
              OTHERS
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
                label={'Food Name'}
                parentStyle={{marginHorizontal: 16, width: width - 64}}
              />
            )}
          />
          <Controller
            control={control}
            name="category"
            render={({field: {value, onChange}}) => (
              <Input
                value={value}
                onChangeText={onChange}
                label={'Food Category'}
                parentStyle={{marginHorizontal: 16, width: width - 64}}
              />
            )}
          />
          <Controller
            control={control}
            name="barcode"
            render={({field: {value, onChange}}) => (
              <Input
                value={value}
                onChangeText={onChange}
                label={'Barcode Scanner'}
                parentStyle={{marginHorizontal: 16, width: width - 64}}
              />
            )}
          />
        </Box>
        <View height={16} />
        <Box>
          <View
            row
            paddingH-16
            paddingV-12
            style={{justifyContent: 'space-between', alignItems: 'center'}}>
            <Text H14 color28 uppercase>
              SERVING
            </Text>
          </View>
          <View height={1} backgroundColor={Colors.line} marginB-16 />
          <View row marginH-16 centerV paddingV-21>
            <Text M14 color28 flex>
              Default Serving
            </Text>
            <Image
              source={Assets.icons.ic_arr_right2}
              tintColor={Colors.color6D}
            />
          </View>
          <View
            height={1}
            marginH-16
            backgroundColor={Colors.line}
            marginB-16
          />
          <View row paddingH-16 style={{justifyContent: 'space-between'}}>
            <Controller
              control={control}
              name="barcode"
              render={({field: {value, onChange}}) => (
                <Input
                  value={value}
                  onChangeText={onChange}
                  label={'1 Serving (g)'}
                  parentStyle={{marginHorizontal: 0, width: '65%'}}
                />
              )}
            />
            <Controller
              control={control}
              name="unit"
              render={({field: {value, onChange}}) => (
                <Input
                  value={value}
                  onChangeText={onChange}
                  label={'Unit'}
                  parentStyle={{marginHorizontal: 0, width: '30%'}}
                />
              )}
            />
          </View>
        </Box>

        <Box>
          <View
            row
            paddingH-16
            paddingV-12
            style={{justifyContent: 'space-between', alignItems: 'center'}}>
            <Text H14 color28 uppercase>
              Photo of Food
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
            navigate(Routes.CreateNewFoodStep2);
          }}
        />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default CreateMyFoodStep1;
