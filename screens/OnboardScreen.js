import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  InputAccessoryView,
} from "react-native";

import { COLORS, FONTS, icons, SIZES } from "../constants";

const LISTDATA = [
  {
    image: require("../assets/images/list1.png"),
    title: "1.Select a style",
    desc: "Don’t waste your valuable mental engery on choosing clothes.",
  },
  {
    image: require("../assets/images/list2.png"),
    title: "2.select your price range",
    desc: "Choose your preferred money range, no more thinking on money.",
  },
  {
    image: require("../assets/images/list3.png"),
    title: "3.we delivery for free",
    desc: "we make sure your delivery on time at right time.",
  },
];

const BoardOne = ({ scroll, navigation }) => {
  return (
    <View style={{ flex: 1, width: SIZES.width, height: SIZES.height }}>
      {/* header */}
      <View
        style={{
          height: SIZES.height * 0.1,
          flexDirection: "row-reverse",
          alignItems: "center",
          marginBottom: SIZES.padding * 4,
        }}
      >
        <View style={{ paddingRight: SIZES.padding * 4 }}>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={{ fontSize: SIZES.body4 }}>Skip</Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
      {/* image */}
      <View style={{ alignItems: "center", marginBottom: SIZES.padding2 * 3 }}>
        <Image
          source={require("../assets/images/intro.png")}
          style={{
            height: SIZES.height * 0.4,
            width: SIZES.width * 0.8,
          }}
          resizeMode="contain"
        />
      </View>
      {/* title */}
      <View style={{ marginBottom: SIZES.padding2 * 3 }}>
        <View
          style={{
            paddingLeft: SIZES.padding * 4,
          }}
        >
          <Text
            style={{
              ...FONTS.h1,
              fontSize: 37,
            }}
            numberOfLines={3}
          >
            Choice Less No more metal resource.
          </Text>
        </View>
      </View>
      {/* button */}
      <View style={{ flexDirection: "row-reverse" }}>
        <View style={{ paddingRight: SIZES.padding * 4 }}>
          <TouchableWithoutFeedback
            onPress={() =>
              scroll.scrollTo({ x: SIZES.width, y: 0, animated: true })
            }
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ ...FONTS.body3, fontWeight: "bold" }}>Next</Text>
              <Image
                source={icons.arrow}
                style={{ height: 32, width: 32, marginLeft: SIZES.padding / 2 }}
                resizeMode="contain"
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );
};

const ListItem = ({ data }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: SIZES.padding,
        marginBottom: SIZES.padding2 * 2,
      }}
    >
      <View>
        <Image
          style={{ height: 80, width: 80 }}
          resizeMode="contain"
          source={data.image}
        />
      </View>
      <View style={{ width: "60%", marginLeft: SIZES.padding * 2 }}>
        <Text style={{ ...FONTS.h4 }}>{data.title}</Text>
        <Text style={{ fontFamily: "RobotoLight" }} numberOfLines={4}>
          {data.desc}
        </Text>
      </View>
    </View>
  );
};

const BoardTwo = ({ navigation }) => {
  return (
    <View style={{ flex: 1, width: SIZES.width, height: SIZES.width }}>
      <View
        style={{
          paddingTop: SIZES.height * 0.12,
          paddingLeft: SIZES.padding2 * 2.5,
          marginBottom: SIZES.padding2 * 2,
        }}
      >
        <Text style={{ ...FONTS.h1 }}>How We Work</Text>
      </View>
      {/* list */}
      <View
        style={{
          paddingHorizontal: SIZES.padding * 2.5,
        }}
      >
        <View>
          {LISTDATA.map((item, index) => (
            <ListItem key={index.toString()} data={item} />
          ))}
        </View>
      </View>
      {/* button */}
      <View
        style={{
          flexDirection: "row-reverse",
          marginTop: SIZES.padding * 3,
        }}
      >
        <View style={{ paddingRight: SIZES.padding * 4 }}>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <View
              style={{
                backgroundColor: COLORS.black,
                flexDirection: "row",
                paddingLeft: SIZES.padding * 2.5,
                paddingRight: SIZES.padding,
                paddingVertical: SIZES.padding,
                borderRadius: SIZES.radius,
                alignItems: "center",
              }}
            >
              <Text style={{ color: COLORS.white }}>Get Started</Text>
              <Image
                source={icons.arrow}
                style={{
                  height: 28,
                  width: 28,
                  marginLeft: SIZES.padding / 2,
                  tintColor: COLORS.white,
                }}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default function OnboardScreen({ navigation }) {
  const [ref, setRef] = useState(null);
  StatusBar.setBackgroundColor(COLORS.white);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        paddingTop: StatusBar.currentHeight,
      }}
    >
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        pagingEnabled
        snapToAlignment={SIZES.width}
        ref={(ref) => setRef(ref)}
      >
        <BoardOne scroll={ref} navigation={navigation} />
        <BoardTwo navigation={navigation} />
      </ScrollView>
    </View>
  );
}
