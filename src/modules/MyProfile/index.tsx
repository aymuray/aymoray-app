import { useNavigation } from "@react-navigation/core";
import Box from "components/Box";
import ButtonIconBadge from "components/ButtonIconBadge";
import Header from "components/Header";
import Routes from "config/Routes";
import { width } from "config/scaleAccordingToDevice";
import React from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { View, Text, Colors, Assets, Image } from "react-native-ui-lib";

const MyProfile = () => {
  const { navigate } = useNavigation();
  const DATA = [
    {
      icon: Assets.icons.ic_upgrade_pro_1,
      title: "Upgrade Professional",
    },
    {
      icon: Assets.icons.ic_edit_profile,
      title: "Edit Profile",
    },
    {
      icon: Assets.icons.ic_change_goal,
      title: "Change Goal",
    },
    {
      icon: Assets.icons.ic_my_photo,
      title: "My Progress Photo",
      onPress: () => {
        navigate(Routes.MyProgressPhoto);
      },
    },
    {
      icon: Assets.icons.ic_blog_bookmark,
      title: "Blog Bookmark",
    },
    {
      icon: Assets.icons.ic_invite_friend,
      title: "Invite friend and family",
    },
  ];
  return (
    <View flex backgroundColor={Colors.background}>
      <ScrollView>
        <Image
          source={Assets.icons.bg_tab}
          style={{ position: "absolute", width: width }}
        />
        <Header
          title="Joseph Allison"
          back
          noShadow
          color="white"
          btnRight={
            <ButtonIconBadge
              source={Assets.icons.ic_notification}
              label={"2"}
              style={{
                marginTop: -10,
                marginRight: -10,
              }}
              onPress={() => {
                navigate(Routes.Notification);
              }}
            />
          }
          style={{
            backgroundColor: "transparent",
          }}
        />
        <Image
          source={Assets.icons.img_avatar}
          marginT-50
          marginB-24
          style={{ alignSelf: "center" }}
        />

        <Box>
          <View row>
            <View paddingV-16 paddingL-16 flex>
              <Text R16 color6D>
                Tu meta
              </Text>
              <Text M24 color28 marginT-8>
                Ganar Peso
              </Text>
            </View>
            <View width={1} backgroundColor={Colors.line} />
            <View paddingV-16 paddingL-16 flex>
              <Text R16 color6D>
                Latest weight, Jan 22
              </Text>
              <View row centerV>
                <Text M36 color28 marginR-16>
                  74{" "}
                  <Text R18 color28>
                    kg
                  </Text>
                </Text>

                <Image source={Assets.icons.graph} />
              </View>
            </View>
          </View>
        </Box>
        <Box>
          <Text H14 color28 uppercase marginT-13 marginB-11 marginL-16>
            Menu
          </Text>
          <View height={1} backgroundColor={Colors.line} />
          {DATA.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    padding: 16,
                  }}
                  onPress={item.onPress}
                >
                  <Image
                    source={item.icon}
                    style={{
                      width: 32,
                      height: 32,
                    }}
                  />
                  <Text M16 color28 marginL-16>
                    {item.title}
                  </Text>
                </TouchableOpacity>
                <View height={1} backgroundColor={Colors.line} />
              </React.Fragment>
            );
          })}
        </Box>
      </ScrollView>
    </View>
  );
};
export default MyProfile;
