import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import {useDispatch} from 'react-redux';
import {addToCart} from '../../features/CartSlice';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ProductOverview({navigation}) {
  const products = useSelector(state => state.Products.avilableProducts);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          activeOpacity={2}
          onPress={() => navigation.navigate('Cart')}>
          <Ionicons name="cart" size={25} color="white" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const dispatch = useDispatch();
  return (
    <FlatList
      data={products}
      renderItem={({item}) => (
        <ProductItem
          image={item.imageUrl}
          title={item.title}
          price={item.price}
          navigation={navigation}
          onViewDetailPress={() =>
            navigation.navigate('ProductDetail', {
              id: item.id,
              title: item.title,
            })
          }
          onCartPress={() => dispatch(addToCart(item))}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({});
