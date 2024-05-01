import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {moderateScale, scale, verticalScale} from '../../utils/scaling';
import Colors from '../../Theme/Colors';

export default function ProductItem({
  image,
  title,
  price,
  onViewDetailPress,
  onCartPress,
}) {
  return (
    <TouchableOpacity
      onPress={onViewDetailPress}
      style={styles.product}
      activeOpacity={2}>
      <View style={styles.imageContainer}>
        <Image source={{uri: image}} style={styles.image} />
      </View>
      <View style={styles.details}>
        <Text>{title}</Text>
        <Text>${price}</Text>
      </View>
      <View style={styles.btn}>
        <Button
          title="View Details"
          color={Colors.primary}
          onPress={onViewDetailPress}
        />
        <Button title="To Cart" color={Colors.primary} onPress={onCartPress} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  product: {
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
    borderRadius: moderateScale(10),
    backgroundColor: 'white',
    margin: verticalScale(25),
    alignItems: 'center',
    height: verticalScale(210),
    width: scale(300),
  },
  image: {
    height: '100%',
    width: '100%',
  },
  btn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '25%',
    paddingHorizontal: scale(20),
  },
  details: {
    height: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    height: '60%',
    width: '100%',
    borderTopLeftRadius: moderateScale(10),
    borderTopRightRadius: moderateScale(10),
    overflow: 'hidden',
  },
});
