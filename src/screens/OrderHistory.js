import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { widthToDp } from '../helpers/Responsive';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    retrieveOrderHistory();
  }, []);

  const retrieveOrderHistory = async () => {
    try {
      const storedOrderHistory = await AsyncStorage.getItem('orderHistory');
      if (storedOrderHistory) {
        setOrderHistory(JSON.parse(storedOrderHistory));
      }
    } catch (error) {
      console.error('Error retrieving order history from AsyncStorage:', error);
    }
  };

  const renderOrderItem = ({ item }) => {
    return (
      <View style={{ flexDirection: "row", justifyContent: "space-between", backgroundColor: "#fff", marginTop: widthToDp(3), marginRight: widthToDp(3), marginLeft: widthToDp(3), padding: widthToDp(5), borderRadius: 5 }}>
        <View>
          <Text style={{ fontSize: widthToDp(3.5), color: "#0065B1" }}>Order No: {item.orderNo}</Text>
          <Text style={{ fontSize: widthToDp(3.5), color: "#209B14" }}>Total Amount: ₹{item.totalAmount}</Text>
        </View>
        <View>
          <Text style={{ fontSize: widthToDp(3.5), color: "#0065B1" }}>Date: {item.date}</Text>
          <Text style={{ fontSize: widthToDp(3.5), color: "#0065B1" }}>Time: {item.time}</Text>
        </View>
      </View>
    );
  };


  return (
    <View>
      <Text style={{ fontSize: widthToDp(5), fontWeight: 'bold', marginBottom: widthToDp(2), marginTop: widthToDp(2) }}>Orders History</Text>
      <FlatList
        data={orderHistory}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.orderNo}
      />
    </View>
  );
};

export default OrderHistory;
