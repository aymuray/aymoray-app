import Header from "components/Header";
import { height, width } from "config/scaleAccordingToDevice";
import React, { PureComponent } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { RNCamera } from "react-native-camera";
import { Assets, Image, Colors } from "react-native-ui-lib";

export default class TakePhoto extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={Assets.icons.bg_take_photo}
          style={{
            position: "absolute",
            width: width,
            height: height,
            top: 0,
            zIndex: 1,
          }}
        />
        <Header
          title=""
          back
          style={{
            position: "absolute",
            backgroundColor: "transparent",
          }}
          color={Colors.white}
        />
        <RNCamera
          ref={(ref) => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: "Permission to use camera",
            message: "We need your permission to use your camera",
            buttonPositive: "Ok",
            buttonNegative: "Cancel",
          }}
          androidRecordAudioPermissionOptions={{
            title: "Permission to use audio recording",
            message: "We need your permission to use your audio",
            buttonPositive: "Ok",
            buttonNegative: "Cancel",
          }}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            position: "absolute",
            bottom: 0,
            alignSelf: "center",
            zIndex: 1,
          }}
        >
          <TouchableOpacity
            onPress={this.takePicture.bind(this)}
            style={styles.capture}
          >
            <Image source={Assets.icons.ic_capture} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    zIndex: 0,
  },
  capture: {
    flex: 0,
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: "center",
    margin: 20,
  },
});
