import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {moderateScale, scale, verticalScale} from '../../utils/scaling';
import Colors from '../../Theme/Colors';
import {addToCart} from '../../features/CartSlice';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ProductDetail({navigation, route}) {
  const {id, title} = route.params;

  const selectedProduct = useSelector(state =>
    state.Products.avilableProducts.find(product => product.id === id),
  );

  const dispatch = useDispatch();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: title,
      headerRight: () => (
        <TouchableOpacity
          activeOpacity={2}
          onPress={() => navigation.navigate('Cart')}>
          <Ionicons name="cart" size={25} color="white" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <ScrollView style={styles.screen}>
      <Image
        source={{uri: selectedProduct.imageUrl}}
        style={styles.imageDetails}
      />
      <View style={styles.actions}>
        <Button
          title="Add to cart"
          color={Colors.primary}
          onPress={() => dispatch(addToCart(selectedProduct))}
        />
      </View>
      <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  imageDetails: {
    height: verticalScale(340),
    width: '100%',
  },
  price: {
    fontSize: moderateScale(18),
    color: '#888',
    textAlign: 'center',
    marginVertical: moderateScale(10),
  },
  description: {
    fontSize: moderateScale(16),
    color: 'black',
    textAlign: 'center',
    fontWeight: '600',
    marginHorizontal: scale(20),
  },
  actions: {
    marginVertical: moderateScale(10),
    alignItems: 'center',
  },
  screen: {
    backgroundColor: 'white',
  },
});
