import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  memo,
} from "react";
import {
  View,
  Text,
  Image,
  StatusBar,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  ScrollView,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SwipeablePanel } from "rn-swipeable-panel";
import { useDispatch, useSelector } from "react-redux";

import { COLORS, FONTS, icons, SIZES } from "../constants";
import { getItems, addPanelData, addPrefrence } from "../redux/action";

const Stack = createNativeStackNavigator();
const ModelContext = createContext();

const CLOTHLIST = [
  {
    id: 1,
    name: "Jeans",
    image: require("../assets/images/jeans.png"),
  },
  {
    id: 2,
    name: "Collared T-shirt",
    image: require("../assets/images/collared.png"),
  },
  {
    id: 3,
    name: "T-Shirts",
    image: require("../assets/images/tshirt.png"),
  },
  {
    id: 4,
    name: "Jeands",
    image: require("../assets/images/jeans.png"),
  },
  {
    id: 5,
    name: "T-Shsidrts",
    image: require("../assets/images/tshirt.png"),
  },
  {
    id: 6,
    name: "Jeasnds",
    image: require("../assets/images/jeans.png"),
  },
  {
    id: 7,
    name: "T-Shidsrts",
    image: require("../assets/images/tshirt.png"),
  },
];

export default function HomeScreen() {
  return (
    <View style={{ flex: 1 }}>
      <Stack.Navigator
        initialRouteName="Step1"
        screenOptions={{
          headerShown: false,
          animationTypeForReplace: "push",
        }}
      >
        <Stack.Screen name="Step1" component={Step1} />
        <Stack.Screen name="Step2" component={Step2} />
        <Stack.Screen name="Step3" component={Step3} />
      </Stack.Navigator>
    </View>
  );
}

const Header = (props) => {
  return (
    <View
      style={{
        paddingHorizontal: SIZES.padding * 4,
        paddingBottom: SIZES.padding,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: SIZES.padding * 3,
        }}
      >
        <Text style={{ ...FONTS.h1, color: COLORS.white }}>{props.title}</Text>
        <Text style={{ ...FONTS.h2, color: COLORS.white }}>
          {props.stepNum}/3
        </Text>
      </View>
    </View>
  );
};

const ITEM_WIDTH = SIZES.width / 2 - SIZES.padding * 5;
const BUTTTON_WIDTH = SIZES.width * 0.35;

const Step1 = ({ navigation }) => {
  const [items, setItems] = useState([]);

  function addItem(obj) {
    if (items.includes(obj.id)) {
      setItems(items.filter((id) => id !== obj.id));
    } else {
      setItems([...items, obj.id]);
    }
  }

  return (
    <>
      <StatusBar backgroundColor={COLORS.black} />
      <View style={{ flex: 1, backgroundColor: COLORS.black }}>
        <Header title="Choose Clothes" stepNum="1" />
        {/* grid */}
        <FlatList
          data={CLOTHLIST}
          keyExtractor={(item) => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: SIZES.padding * 2,
            paddingHorizontal: SIZES.padding * 4,
            paddingBottom: SIZES.padding * 6.5,
          }}
          columnWrapperStyle={{
            justifyContent: "space-between",
            marginBottom: SIZES.padding * 2,
          }}
          renderItem={(item) => {
            return (
              <TouchableWithoutFeedback onPress={() => addItem(item.item)}>
                <View
                  key={item.item.name}
                  style={{
                    width: ITEM_WIDTH,
                    height: ITEM_WIDTH,
                    borderWidth: 1,
                    borderColor: COLORS.white,
                    borderRadius: SIZES.padding,
                    alignItems: "center",
                    padding: SIZES.padding2,
                    backgroundColor: items.includes(item.item.id)
                      ? COLORS.white
                      : COLORS.black,
                  }}
                >
                  <Image
                    source={item.item.image}
                    style={{
                      width: "62%",
                      height: "62%",
                      marginBottom: SIZES.padding,
                      tintColor: items.includes(item.item.id)
                        ? COLORS.black
                        : COLORS.white,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 15,
                      color: items.includes(item.item.id)
                        ? COLORS.black
                        : COLORS.white,
                    }}
                  >
                    {item.item.name}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            );
          }}
        />
        {/* button */}
        <View
          style={{
            position: "absolute",
            left: SIZES.width / 2 - BUTTTON_WIDTH / 2,
            bottom: SIZES.padding,
          }}
        >
          {items.length > 0 && (
            <FLoatingButton
              onPress={() =>
                navigation.navigate("Step2", { selectedItems: items })
              }
              title="Continue"
            />
          )}
        </View>
      </View>
    </>
  );
};

const FLoatingButton = ({ title, onPress, reverse }) => {
  if (!reverse) {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          width: BUTTTON_WIDTH,
          height: SIZES.padding * 5,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: COLORS.primary,
          borderRadius: SIZES.radius * 3,
          elevation: 1,
        }}
      >
        <Text
          style={{
            ...FONTS.body4,
            fontWeight: "bold",
            color: COLORS.black,
            marginRight: SIZES.padding - 5,
          }}
        >
          {title}
        </Text>
        <Image
          source={icons.arrow}
          style={{ tintColor: COLORS.black, height: 20, width: 20 }}
        />
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          width: BUTTTON_WIDTH,
          height: SIZES.padding * 5,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: COLORS.white,
          borderRadius: SIZES.radius * 3,
          elevation: 1,
        }}
      >
        <Image
          source={icons.arrow}
          style={{
            tintColor: COLORS.black,
            height: 20,
            width: 20,
            marginRight: SIZES.padding - 5,
            transform: [{ rotate: "180deg" }],
          }}
        />
        <Text
          style={{
            ...FONTS.body4,
            color: COLORS.black,
            fontWeight: "bold",
          }}
        >
          {title}
        </Text>
      </TouchableOpacity>
    );
  }
};
// ===========================

const Step2 = ({ route, navigation }) => {
  const [isPanelActive, setIsPanelActive] = useState(false);
  const [error, setError] = useState();
  const [panelProps, setPanelProps] = useState({
    fullWidth: true,
    openLarge: false,
    showCloseButton: true,
    onClose: () => closePanel(),
    onPressCloseButton: () => closePanel(),
    closeOnTouchOutside: true,
    style: {
      height: SIZES.height * 0.69,
    },
  });
  const dispatch = useDispatch();
  const items = useSelector((store) => store.items);
  const modelData = useSelector((store) => store.modalData);
  const userPrefernce = useSelector((store) => store.userPrefernce);
  const { selectedItems } = route.params;

  useEffect(() => {
    dispatch(getItems(selectedItems));
  }, []);

  const findTotal = () => {
    let total = userPrefernce.reduce((prev, cur) => {
      return prev + cur.price * (cur.qty ? cur.qty : 1);
    }, 0);
    return total;
  };

  const openPanel = (title, item) => {
    let data = [];
    if (title == "qty") {
      data = [1, 2, 3, 4, 5, 6, 7];
    } else {
      data = item[title + "s"];
    }
    dispatch(addPanelData({ id: item.id, title, data }));
    setIsPanelActive(true);
  };

  const closePanel = (id, title, value) => {
    if (value) {
      dispatch(addPrefrence({ id, title, value }));
    }
    setIsPanelActive(false);
  };

  const validateAndNavigate = () => {
    let allPriceSelected = true;
    let itemsLength = items.data.length;
    for (let i = 0; i < itemsLength; i++) {
      let userPreferObj = userPrefernce[i];
      let doesAlluserSelected =
        userPreferObj.price == null ||
        userPreferObj.qty == null ||
        userPreferObj.size == null;
      if (doesAlluserSelected) {
        allPriceSelected = false;
        break;
      }
    }
    if (allPriceSelected) {
      setError(null);
      navigation.navigate("Step3");
    } else {
      setError("Please Select all options ");
    }
  };

  return (
    <ModelContext.Provider value={{ openPanel, closePanel }}>
      <StatusBar backgroundColor={COLORS.black} />
      <View style={{ flex: 1, backgroundColor: COLORS.black }}>
        <Header title="Preference" stepNum="2" />
        {error && (
          <Text
            style={{
              paddingHorizontal: SIZES.padding * 4,
              color: COLORS.primary,
              fontWeight: "100",
              fontSize: 14,
            }}
          >
            {error}
          </Text>
        )}
        {/* content */}
        <ScrollView showsVerticalScrollIndicator={false}>
          {items.data.length !== 0 ? (
            <>
              <View
                style={{
                  paddingTop: SIZES.padding * 1.4,
                  paddingHorizontal: SIZES.padding * 4,
                }}
              >
                {items.data.map((item) => (
                  <SelectedItemPreference key={item.id} {...{ item }} />
                ))}
              </View>
              <View style={{ paddingHorizontal: SIZES.padding * 4 }}>
                <View
                  style={{
                    width: "100%",
                    padding: SIZES.padding2 * 2,
                    borderWidth: 1,
                    borderRadius: SIZES.radius * 0.4,
                    borderColor: COLORS.white,
                  }}
                >
                  {userPrefernce.map((userPrefer) => {
                    let item = items.data.find(
                      (item) => item.id === userPrefer.id
                    );

                    return (
                      <View
                        key={userPrefer.id}
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "flex-end",
                          paddingVertical: SIZES.padding * 0.2,
                        }}
                      >
                        <Text
                          style={{
                            textTransform: "capitalize",
                            paddingRight: SIZES.padding,
                            color: COLORS.white,
                          }}
                        >
                          {item.title}
                        </Text>
                        <Text style={{ color: COLORS.white }}>x</Text>
                        <Text
                          style={{
                            textTransform: "capitalize",
                            paddingRight: SIZES.padding,
                            color: COLORS.white,
                          }}
                        >
                          {userPrefer.qty ? userPrefer.qty : 1}
                        </Text>
                        <Text
                          style={{ fontWeight: "bold", color: COLORS.white }}
                        >
                          {userPrefer.price
                            ? userPrefer.price *
                              (userPrefer.qty ? userPrefer.qty : 1)
                            : "----"}
                        </Text>
                      </View>
                    );
                  })}
                  <View style={{ paddingTop: SIZES.padding }}>
                    <Text
                      style={{
                        fontSize: 17,
                        color: COLORS.white,
                      }}
                    >
                      Total Amount
                    </Text>
                    <Text style={{ ...FONTS.h4, color: COLORS.secondary }}>
                      {findTotal() ? (
                        findTotal()
                      ) : (
                        <Text
                          style={{
                            ...FONTS.body5,
                            fontWeight: "200",
                            color: COLORS.secondary,
                          }}
                        >
                          please select price
                        </Text>
                      )}
                    </Text>
                  </View>
                </View>
              </View>
            </>
          ) : (
            <View
              style={{ alignItems: "center", paddingTop: SIZES.padding * 4 }}
            >
              <Image
                resizeMode="contain"
                style={{
                  width: SIZES.width * 0.8,
                  height: SIZES.height * 0.45,
                }}
                source={require("../assets/images/sky.png")}
              />
              <Text style={{ color: COLORS.white }}>Noo.. preference here</Text>
              <Text style={{ color: COLORS.white }}>Select clothes</Text>
            </View>
          )}
        </ScrollView>

        {/* Floating buttons */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: SIZES.width,
            paddingHorizontal: SIZES.padding * 4,
            position: "absolute",
            bottom: SIZES.padding,
          }}
        >
          <FLoatingButton
            title="Back"
            onPress={() => navigation.navigate("Step1")}
            reverse={true}
          />
          <FLoatingButton
            onPress={() => validateAndNavigate()}
            title="Buy Now"
          />
        </View>
      </View>
      <SwipeablePanel {...panelProps} isActive={isPanelActive}>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            zIndex: 20,
            padding: SIZES.padding2 * 2,
          }}
        >
          {modelData.data.map((value) => (
            <Item
              key={value}
              value={value}
              id={modelData.id}
              title={modelData.title}
            />
          ))}
        </View>
      </SwipeablePanel>
    </ModelContext.Provider>
  );
};

const SelectedItemPreference = ({ item }) => {
  return (
    <View style={{ marginBottom: SIZES.padding * 1.5 }}>
      <View>
        <Text
          style={{
            color: COLORS.white,
            textTransform: "uppercase",
            marginBottom: -SIZES.padding,
          }}
        >
          {item.title}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: SIZES.padding * 2,
          }}
        >
          {["price", "size", "qty"].map((title) => (
            <ButtonContainer key={title} title={title} item={item} />
          ))}
        </View>
      </View>
    </View>
  );
};

const ButtonContainer = ({ title, item }) => {
  const preference = useSelector((store) => store.userPrefernce);
  const { openPanel } = useContext(ModelContext);

  const obj = preference.find((obj) => obj.id == item.id);
  return (
    <TouchableOpacity
      onPress={openPanel.bind(this, title, item)}
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        borderWidth: 1,
        borderColor: COLORS.white,
        borderRadius: 8,
        width: "30%",
        padding: SIZES.padding,
        backgroundColor: obj && obj[title] ? "white" : "none",
      }}
    >
      <Image
        source={icons[title]}
        style={{
          width: 17,
          height: 17,
          marginRight: SIZES.padding - 4,
          tintColor: obj && obj[title] ? "black" : "white",
        }}
        resizeMode="contain"
      />
      <Text
        style={{
          color: obj && obj[title] ? "black" : "white",
          textTransform: "capitalize",
        }}
      >
        {obj && obj[title] ? obj[title] : title}
      </Text>
    </TouchableOpacity>
  );
};

const Item = memo(({ id, title, value }) => {
  const { closePanel } = useContext(ModelContext);
  return (
    <TouchableOpacity
      onPress={closePanel.bind(this, id, title, value)}
      style={{
        padding: SIZES.padding,
        paddingHorizontal: SIZES.padding * 2,
        borderRadius: SIZES.padding,
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: SIZES.padding,
        marginBottom: SIZES.padding * 2,
      }}
    >
      <Text style={{ textTransform: "uppercase" }}>{value}</Text>
    </TouchableOpacity>
  );
});

const Step3 = ({ navigation }) => {
  return (
    <>
      <StatusBar backgroundColor={COLORS.black} />
      <View style={{ flex: 1, backgroundColor: COLORS.black }}>
        <Header title="Payment Now" stepNum={"3"} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              paddingHorizontal: SIZES.padding * 4,
              marginTop: SIZES.padding,
              paddingBottom: SIZES.padding * 3,
            }}
          >
            <Text style={{ color: COLORS.white }}>CONTACT DETAILS</Text>
            <View style={{ paddingVertical: SIZES.padding * 2 }}>
              <InputContainer placeholder="Name" />
              <InputContainer
                placeholder="Phone Number"
                keyboardType={"phone-pad"}
              />
              <Text
                style={{ color: COLORS.white, marginBottom: SIZES.padding2 }}
              >
                ADDRESS
              </Text>
              <InputContainer placeholder="Address (Hose no, Buliding, Street, Area)" />
              <InputContainer placeholder="Locality / Town" />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <InputContainer
                  keyboardType="numeric"
                  placeholder="Pincode"
                  width="30%"
                />
                <InputContainer placeholder="City / District" width="60%" />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      <View
        style={{
          position: "absolute",
          left: SIZES.width / 2 - BUTTTON_WIDTH / 2,
          bottom: SIZES.padding,
        }}
      >
        <FLoatingButton
          onPress={() => navigation.navigate("Delivery")}
          title="Place Order"
        />
      </View>
    </>
  );
};

const InputContainer = (props) => {
  return (
    <>
      <TextInput
        {...props}
        placeholder={props.placeholder}
        selectionColor={COLORS.primary}
        placeholderTextColor={COLORS.white}
        style={{
          width: props.width ? props.width : "100%",
          borderWidth: 1,
          padding: SIZES.padding,
          borderRadius: SIZES.padding,
          fontSize: 16,
          color: COLORS.white,
          borderColor: COLORS.white,
          marginBottom: SIZES.padding2 * 2,
        }}
      />
    </>
  );
};
