import {StyleSheet, Text, View, FlatList, Platform} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import Colors from '../../Theme/Colors';
import {moderateScale, scale, verticalScale} from '../../utils/scaling';
import {formatDateTime} from '../../utils/DateFunction';

export default function Order({navigation}) {
  const orders = useSelector(state => state.Order.orders);
  const [showDetails, setShowDetails] = useState(false);

  console.log('this is order : ', orders);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
      },
      headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
    });
  }, [navigation]);

  const renderOrderItem = ({item}) => {
    console.log('order : ', item.items);
    return (
      <View style={styles.orderItem}>
        <View style={styles.amountContainer}>
          <Text
            style={{
              color: 'black',
              fontWeight: '800',
              fontSize: moderateScale(15),
            }}>
            $ {item.totalAmount.toFixed(2)}
          </Text>
          <Text style={{color: 'black'}}>{formatDateTime(item.date)}</Text>
        </View>
        <Text
          style={styles.detailText}
          onPress={() => setShowDetails(prevState => !prevState)}>
          Show Details
        </Text>
        {showDetails &&
          item.items.map((item, index) => (
            <View
              style={{
                flexDirection: 'row',
                width: '50%',
                justifyContent: 'space-between',
                margin: scale(10),
              }}
              key={index}>
              <View style={{flexDirection: 'row'}}>
                <Text>{item.quantity}</Text>
                <Text style={{marginHorizontal: scale(5)}}>{item.title}</Text>
              </View>
              <Text>$ {item.sum}</Text>
            </View>
          ))}
      </View>
    );
  };

  return (
    <View style={styles.screen}>
      <FlatList
        data={orders}
        renderItem={renderOrderItem}
        contentContainerStyle={styles.container}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  orderItem: {
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: moderateScale(10),
    overflow: 'hidden',
    padding: scale(10),
    marginVertical: verticalScale(10),
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  container: {
    height: '100%',
    width: scale(350),
    alignItems: 'center',
    padding: verticalScale(10),
  },
  amountContainer: {
    flexDirection: 'row',
    width: '100%',
    marginVertical: verticalScale(5),
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(10),
  },
  detailText: {
    color: Colors.primary,
    fontWeight: '800',
    marginVertical: verticalScale(10),
  },
});
