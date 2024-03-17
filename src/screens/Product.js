import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, filterProductData, addToCart, removeFromCart, incrementQuantity, decrementQuantity } from '../redux/ProductSlice';
import { widthToDp, heightToDp } from '../helpers/Responsive';
import * as Icon from "../helpers/Icons"

const Product = () => {
    const [data, setData] = useState('')
    const [selected, setSelected] = useState({});
    const dispatch = useDispatch();
    const { products, category, status, error, cart } = useSelector((state) => state.products);
    console.log("cart", cart);
    // console.log("category", category);
    // console.log("products", products);
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);
    if (status === 'loading') return <Text>Loading...</Text>;
    if (status === 'failed') return <Text>Error: {error}</Text>;
    const filterData = (category) => {
        setData(category)
    }
    const handleAddToCart = (item) => {
        if (selected[item.id]) {
            dispatch(removeFromCart(item));
            setSelected({ ...selected, [item.id]: false });
        } else {
            dispatch(addToCart(item));
            setSelected({ ...selected, [item.id]: true });
        }
    }

    const handleIncrementQuantity = (item) => {
        dispatch(addToCart(item));

    }

    const handleDecrementQuantity = (item) => {
        const currentItem = cart.find(cartItem => cartItem.id === item.id);
        if (currentItem && currentItem.quantity > 1) {
            dispatch(decrementQuantity(item));
        } else if (currentItem && currentItem.quantity === 1) {
            dispatch(removeFromCart(item));
            setSelected({ ...selected, [item.id]: false });
        }
    }

    return (
        <View>
            <FlatList
                horizontal={true}
                data={category?.products}
                renderItem={({ item }) => (
                    <TouchableOpacity style={{ margin: widthToDp(2), backgroundColor: "#0065B1", borderRadius: widthToDp(10), width: widthToDp(30), height: heightToDp(5.5) }} onPress={() => filterData(item.category)}>
                        <Text style={{ color: "#fff", fontSize: widthToDp(3.5), padding: widthToDp(4), textAlign: "center", paddingBottom: widthToDp(2), bottom: 4 }}>{item.category}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id.toString()}
            />
            <FlatList
                data={products?.products?.filter(product => product?.category.includes(data))}
                renderItem={({ item }) => (
                    <TouchableOpacity style={{ margin: widthToDp(5), flexDirection: "row", justifyContent: "space-between" }}>
                        <View>
                            <Text style={{ fontSize: widthToDp(4), fontWeight: "600" }}>{item.title.length > 30 ? item.title.substr(0, 25) + "..." : item.title}</Text>
                            <Text>₹{item.price}</Text>
                            <View style={{ marginTop: widthToDp(2), flexDirection: 'row', gap: 3 }}>
                                <Image source={Icon.star_icon} style={{ height: heightToDp(2), width: widthToDp(4) }} />
                                <Text>{item.rating}</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={{ marginRight: 10 }} onPress={() => {
                            setSelected({ ...selected, [item.id]: true });
                            handleAddToCart(item);
                        }}>
                            <Image source={{ uri: item.thumbnail }} style={{ height: 120, width: 120, borderRadius: 8 }} />
                            {selected[item.id] ? (
                                <Pressable
                                    onPress={() => handleAddToCart(item)}
                                    style={{
                                        position: "absolute",
                                        top: 90,
                                        left: 15,

                                        flexDirection: "row",
                                        paddingHorizontal: 10,
                                        paddingVertical: 5,
                                        alignItems: "center",
                                        backgroundColor: "white",
                                        borderRadius: 5,
                                    }}
                                >
                                    <Pressable onPress={() => {
                                        handleDecrementQuantity(item);
                                    }}>
                                        <Text
                                            style={{
                                                fontSize: 25,
                                                color: "#0065B1",
                                                paddingHorizontal: 6,
                                            }}
                                        >
                                            -
                                        </Text>
                                    </Pressable>
                                    <Text
                                        style={{
                                            fontSize: 20,
                                            color: "green",
                                            paddingHorizontal: 6,
                                        }}
                                    >
                                        {cart.find(cartItem => cartItem.id === item.id)?.quantity || 0}
                                    </Text>
                                    <Pressable onPress={() => {
                                        handleIncrementQuantity(item);
                                    }}>
                                        <Text
                                            style={{
                                                fontSize: 20,
                                                color: "#0065B1",
                                                paddingHorizontal: 6,
                                            }}
                                        >
                                            +
                                        </Text>
                                    </Pressable>
                                </Pressable>
                            ) : (
                                <Pressable
                                    onPress={() => {
                                        setSelected({ ...selected, [item.id]: true });
                                        handleAddToCart(item);
                                    }}
                                    style={{
                                        position: "absolute",
                                        top: 90,
                                        left: 20,

                                        flexDirection: "row",
                                        paddingHorizontal: 25,
                                        paddingVertical: 10,
                                        alignItems: "center",
                                        backgroundColor: "white",
                                        borderRadius: 5,
                                    }}

                                >
                                    <Text
                                        style={{
                                            fontSize: 18,
                                            fontWeight: "600",
                                            color: "#0065B1",
                                        }}
                                    >
                                        ADD
                                    </Text>
                                </Pressable>
                            )}
                        </TouchableOpacity>
                    </TouchableOpacity>

                )}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

export default Product;
