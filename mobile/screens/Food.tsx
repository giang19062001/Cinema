import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import axios from 'axios';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {IChooseFood, IFood} from '../interface/food.interface';
import {useIsFocused} from '@react-navigation/native';

const FoodScreen = () => {
  const [foodList, setFoodList] = useState<IFood[]>([]);
  const [foodChooseList, setFoodChooseList] = useState<IChooseFood[]>([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {data: response} = await axios.get('http://10.0.2.2:5000/Food');
        console.log(response);
        setFoodList(response);
      } catch (error: unknown) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  //Reset
  useEffect(() => {
    if (!isFocused) {
      setFoodChooseList([]);
    }
  }, [isFocused]);

  const handleDecrease = (food: IFood) => {
    setFoodChooseList(
      prevState =>
        prevState
          .map(fod =>
            fod.foodId === food.foodId
              ? {...fod, quantity: fod.quantity - 1}
              : fod,
          )
          .filter(fod => fod.quantity > 0), 
    );
  };
  const hanldeAdd = (food: IFood) => {
    setFoodChooseList(prevState => {
      const isExist = prevState.find(fod => fod.foodId === food.foodId);
      if (isExist) {
        return prevState.map(fod =>
          fod.foodId === food.foodId
            ? {...fod, quantity: fod.quantity + 1}
            : fod,
        );
      } else {
        return [...prevState, {...food, quantity: 1}];
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chọn đồ ăn nhanh</Text>
      <ScrollView style={styles.scrollList}>
        {foodList.map((food, index) => {
          let quantity =
            foodChooseList.find(fod => fod.foodId === food.foodId)?.quantity ||
            0;
          return (
            <View style={styles.row} key={food.foodId}>
              <Image
                style={styles.image}
                source={{
                  uri: food.foodImage,
                }}
              />
              <View style={styles.col}>
                <Text style={styles.textName}>{food.foodName}</Text>
                <Text style={styles.textDes}>{food.foodDescription}</Text>
                <View style={styles.boxBetween}>
                  <View style={styles.boxIcon}>
                    <AntDesignIcon
                      name="minuscircle"
                      size={20}
                      color="#ffffff"
                      onPress={value => handleDecrease(food)}
                    />
                    <Text style={styles.textQuantity}>{quantity}</Text>
                    <AntDesignIcon
                      name="pluscircle"
                      size={20}
                      color="#52f52ac0"
                      onPress={value => hanldeAdd(food)}
                    />
                  </View>
                  <Text style={styles.textPrice}>
                    {new Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    }).format(food.foodPrice)}{' '}
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>

      <View style={styles.footerBox}>
        <View style={styles.boxBetween}>
          <Text style={styles.text}>Tổng tiền (đã bao gồm phụ thu)</Text>
          <Text style={styles.textPrice}>
            {new Intl.NumberFormat('vi-VN', {
              style: 'currency',
              currency: 'VND',
            }).format(
              foodChooseList.reduce(
                (accumulator, currentValue) =>
                  accumulator + currentValue.foodPrice * currentValue.quantity,
                0,
              ),
            )}
          </Text>
        </View>
        <TouchableOpacity style={foodChooseList.length > 0 ? styles.btnActive : styles.btn}>
          <Text style={styles.textBtn}>Hoàn tất thanh toán</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
    paddingTop: 70,
    paddingHorizontal: 20,
  },
  title: {color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: 20},
  text: {
    color: '#ffffff',
    fontSize: 15,
  },
  scrollList:{
    marginBottom:120
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    gap: 15,
    marginBottom: 20,
    backgroundColor: '#353535b8',
    padding: 20,
    borderRadius: 10,
  },
  image: {
    width: 80,
    height: 80,
  },
  col: {
    flexDirection: 'column',
    flex: 1,
    gap: 5,
  },
  textName: {color: 'white', fontSize: 16, fontWeight: '600'},
  boxBetween: {
    marginTop: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  boxIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  textDes: {
    color: 'gray',
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'justify',
    flex: 1,
    flexWrap: 'wrap',
    lineHeight: 20,
  },
  textQuantity: {
    color: 'white',
  },
  textPrice: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
  },
  footerBox: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -10,
    backgroundColor: '#353535',
    height: 120,
    paddingHorizontal: 25,
    paddingBottom: 25,
  },
  btn: {
    backgroundColor: '#b9b7b7be',
    padding: 10,
    borderRadius: 5,
  },
  btnActive: {
    backgroundColor:  '#52f52ac0',
    padding: 10,
    borderRadius: 5,
  },
  textBtn: {
    color:  '#ffffff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
  },

});
export default FoodScreen;
