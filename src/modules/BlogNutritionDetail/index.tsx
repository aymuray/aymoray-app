import { width } from "config/scaleAccordingToDevice";
import React from "react";
import { ScrollView } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { Assets, Button, Colors, Text, Image, View } from "react-native-ui-lib";

const BlogNutritionDetail = () => {
  return (
    <View flex>
      <View
        height={getStatusBarHeight(true) + 44}
        backgroundColor="transparent"
        row
        style={{
          paddingTop: getStatusBarHeight(),
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Button
          iconSource={Assets.icons.ic_back}
          link
          color={Colors.color28}
          marginL-16
        />
        <View row>
          <Button
            iconSource={Assets.icons.ic_bookmark_normal}
            link
            color={Colors.color28}
            marginR-32
          />
          <Button
            iconSource={Assets.icons.ic_share}
            link
            color={Colors.color28}
            marginR-16
          />
        </View>
      </View>
      <ScrollView>
        <Text H18 color28 marginB-8 marginH-16 marginT-16>
          4 Easy Ways To Add More Training To Your Life
        </Text>
        <View row marginL-16 centerV marginB-16>
          <Image
            source={Assets.icons.ic_time_16_w}
            tintColor={Colors.color6D}
          />
          <Text R14 color6D marginL-4 marginR-24>
            Jan 30, 2018
          </Text>
          <Image source={Assets.icons.ic_level} tintColor={Colors.color6D} />
          <Text R14 color6D marginL-4 marginR-24>
            Beginner
          </Text>
        </View>
        <Image
          source={Assets.icons.img_nu4}
          style={{
            width: width,
            height: (width / 375) * 225,
          }}
        />
        <Text margin-24 R16 color28 style={{ lineHeight: 24 }}>
          People talk a lot about inflammation these days: What it is, where it
          begins, what consequences it produces, and of course, how you can
          fight it. Depending on who you're listening to, it's either an
          unavoidable part of modern life—and the modern diet—or something you
          can control or avoid.{"\n"}After doing a lot of research and
          experimentation, I find myself in the middle. In other words, I
          believe you have some power over inflammation, but you have to be
          serious and methodical in how you approach it.
        </Text>
      </ScrollView>
    </View>
  );
};

export default BlogNutritionDetail;
