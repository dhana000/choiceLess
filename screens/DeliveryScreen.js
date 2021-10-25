import React from "react";
import {
  View,
  Text,
  StatusBar,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { COLORS, FONTS, icons, SIZES } from "../constants";

const orders = [
  {
    orderNo: "3894840hdd390",
    date: "4/3/2010",
    items: {
      collared: 2,
      tshirt: 5,
      jeans: 5,
    },
    status: "Order Confirmed",
  },
  {
    orderNo: "8393903hHJf9",
    date: "9/1/2010",
    items: {
      tshirt: 3,
      jeans: 1,
    },
    status: "Pending",
  },
];

export default function DeliveryScreen() {
  return (
    <>
      <StatusBar backgroundColor={COLORS.fourth} />
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.fourth,
          paddingHorizontal: SIZES.padding * 4,
          paddingVertical: SIZES.padding * 3,
        }}
      >
        <Text style={{ ...FONTS.h1 }}>Santhosh Naik</Text>
        <Text style={{ ...FONTS.body3, marginBottom: SIZES.padding * 3 }}>
          6309583248
        </Text>
        <ScrollView>
          <Text style={{ ...FONTS.h3, marginBottom: SIZES.padding }}>
            Your Orders
          </Text>
          <View style={{ alignItems: "center" }}>
            {orders.length === 0 ? (
              <>
                <Image
                  source={require("../assets/images/empty.png")}
                  resizeMode="contain"
                  style={{
                    width: SIZES.width * 0.6,
                    height: SIZES.height * 0.44,
                  }}
                />
                <Text style={{ ...FONTS.body2 }}>Empty Box</Text>
              </>
            ) : (
              orders.map((order) => (
                <OrderItem key={order.orderNo} order={order} />
              ))
            )}
          </View>
          <View>
            <TouchableWithoutFeedback>
              <Text style={{ ...FONTS.body3 }}>Logout</Text>
            </TouchableWithoutFeedback>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const OrderItem = ({ order }) => {
  return (
    <View
      style={{
        width: "100%",
        marginBottom: SIZES.padding * 2,
        borderBottomWidth: 1,
        paddingBottom: SIZES.padding * 2,
        borderColor: COLORS.lightGray4,
      }}
    >
      <Text
        style={{
          marginBottom: SIZES.padding * 0.3,
          fontWeight: "700",
        }}
      >
        Order No: {order.orderNo}
      </Text>
      <Text style={{ marginBottom: SIZES.padding * 0.3 }}>
        Date: {order.date}
      </Text>
      <View style={{ flexDirection: "row", marginBottom: SIZES.padding * 0.3 }}>
        <Text style={{ color: COLORS.black, textTransform: "capitalize" }}>
          Status:{" "}
        </Text>
        <Text style={{ color: findStatusColor(order.status) }}>
          {order.status}
        </Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text>Items: </Text>
        <View style={{ flexWrap: "wrap" }}>
          {Object.entries(order.items).map(([key, value]) => (
            <View
              key={key}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginRight: SIZES.padding,
                flexWrap: "wrap",
                marginBottom: SIZES.padding,
              }}
            >
              <Image
                source={icons[key]}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: COLORS.black,
                  marginRight: SIZES.padding * 0.3,
                }}
              />
              <Text style={{ textTransform: "capitalize" }}>
                {key}: {value}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const findStatusColor = (status) => {
  if (status == "Pending") return COLORS.primary;
  else if (status == "Order Confirmed") return COLORS.fifth;
  else if (status == "Delivered") return COLORS.secondary;
  else if (status == "Shipped") return COLORS.fifth;
  else return COLORS.black;
};
