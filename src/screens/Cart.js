import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { widthToDp, heightToDp } from '../helpers/Responsive';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '../redux/ProductSlice';
import * as Icon from "../helpers/Icons"

const Cart = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const cartItems = useSelector((state) => state.products.cart);
  const totalAmount = cartItems.reduce((acc, curr) => {
    return acc + curr.price * curr.quantity;
  }, 0);
  const dispatch = useDispatch();

  const renderCartItem = ({ item }) => {
    return (
      <View style={{ flexDirection: "row", justifyContent: "space-between", backgroundColor: "#fff", marginTop: widthToDp(3), marginRight: widthToDp(3), marginLeft: widthToDp(3), padding: widthToDp(5), borderRadius: 5 }}>
        <View style={{ flexDirection: "column" }}>
          <Text style={{ fontSize: widthToDp(4.5), color: "#0065B1" }}>{item.title}</Text>
          <Text style={{ fontSize: widthToDp(3.5), color: "#0065B1" }} >Quantity: {item.quantity}</Text>
        </View>
        <View>
          <Text style={{ fontSize: widthToDp(4.5), color: "#0065B1" }}>Price</Text>
          <Text style={{ fontSize: widthToDp(3.5), color: "#209B14" }}>₹{(item.price * item.quantity).toFixed(2)}</Text>
        </View>
      </View>
    );
  };


  const handleCheckout = async () => {
    const orderDate = moment().format("MMM Do YY");
    const orderTime = moment().format('LT');
    const order = {
      orderNo: Math.floor(Math.random() * 1000000) + 1,
      date: orderDate,
      time: orderTime,
      totalAmount: totalAmount.toFixed(2),
      items: cartItems,
    };
    const updatedOrderHistory = [...orderHistory, order];
    setOrderHistory(updatedOrderHistory);
    console.log("updatedOrderHistory", updatedOrderHistory);
    try {
      await AsyncStorage.setItem('orderHistory', JSON.stringify(updatedOrderHistory));
      // Clear cart after checkout
      dispatch(removeFromCart())
      set
    } catch (error) {
      console.log('Error saving order to AsyncStorage:', error);
    }
  };

  // console.log("setOrderHistory", setOrderHistory);
  return (
    <>
      <View>
        <FlatList
          data={cartItems}
          renderItem={renderCartItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
      {cartItems.length > 0 ? (
        <View style={{ alignItems: 'center', position: "absolute", bottom: 0, flexDirection: "row", gap: widthToDp(1) }}>
          <View style={{ alignItems: 'center', width: widthToDp(45), marginBottom: widthToDp(2.5), backgroundColor: "#AECDFF", padding: widthToDp(2.5), borderRadius: 5, marginLeft: widthToDp(5) }}>
            <Text style={{ fontSize: widthToDp(3.5), color: "#1D7BFE" }}>
              Total Amount: ₹{totalAmount.toFixed(2)}
            </Text>
          </View>
          <TouchableOpacity style={{ alignItems: 'center', width: widthToDp(45), marginBottom: widthToDp(2.5), backgroundColor: "#1A6031", padding: widthToDp(2.5), borderRadius: 5, marginRight: widthToDp(5) }} onPress={handleCheckout}>
            <Text style={{ fontSize: widthToDp(3.5), color: "#23FE21" }}>
              Checkout
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ height: heightToDp(100), flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <Image source={Icon.cart_icon} style={{ height: heightToDp(20), width: widthToDp(40) }} tintColor="#0065B1" />
          <Text style={{ color: "black", fontSize: widthToDp(4.5) }}>Your cart is empty. Add something from the menu</Text>
        </View>
      )}

    </>

  );
};

export default Cart;
