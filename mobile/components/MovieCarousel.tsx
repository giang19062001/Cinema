import axios from 'axios';
import * as React from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import Carousel, {ICarouselInstance} from 'react-native-reanimated-carousel';
import {IMovie, IMovieCategories} from '../interface/movie.interface';
import {Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ICategory} from '../interface/category.inteface';
import {useIsFocused} from '@react-navigation/native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

function MovieCarousel({navigation}: {navigation: any}) {
  const ref = React.useRef<ICarouselInstance>(null);
  const isFocused = useIsFocused();

  const [movieInitalList, setMovieInitialList] = React.useState<
    IMovieCategories[]
  >([]);
  const [movieList, setMovieList] = React.useState<IMovieCategories[]>([]);
  const [cateList, setCateList] = React.useState<ICategory[]>([]);

  const [cateChoose, setCateChoose] = React.useState<string>('');
  const [movieCurrent, setMovieCurrent] = React.useState<IMovie | null>(null);
  const progress = useSharedValue(0);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const {data: resMovie} = await axios.get('http://10.0.2.2:5000/Movie');
        setMovieInitialList(resMovie);
        setMovieList(resMovie);

        const {data: resCate} = await axios.get(
          'http://10.0.2.2:5000/Category',
        );
        setCateList(resCate);
      } catch (error: unknown) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  React.useEffect(() => {
    setMovieCurrent(null);

    if (cateChoose) {
      const filterList = movieInitalList.filter(movie =>
        movie.categories.some(category => category.categoryCode === cateChoose),
      );
      setMovieList(filterList);
    } else {
      // 0
      setMovieList(movieInitalList);
    }
  }, [cateChoose]);

  //Reset
  React.useEffect(() => {
    if (!isFocused) {
      setMovieCurrent(null);
      setCateChoose('');
      setMovieList(movieInitalList);
    }
  }, [isFocused]);

  return (
    <View style={{flex: 1}}>
      <View style={styles.containerCate}>
      <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{flex: 1}}>
          <View style={styles.boxCate}>
            <TouchableOpacity
              style={[styles.btnCate, cateChoose == '' ? styles.btnActive : '']}
              onPress={() => setCateChoose('')}>
              <Text style={styles.textCate}>Tất cả</Text>
            </TouchableOpacity>
          </View>
          {cateList.map((cate, index) => (
            <View style={styles.boxCate} key={index}>
              <TouchableOpacity
                style={[
                  styles.btnCate,
                  cateChoose == cate.categoryCode ? styles.btnActive : '',
                ]}
                onPress={() => setCateChoose(cate.categoryCode)}>
                <Text style={styles.textCate}>{cate.categoryName}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
      {movieList.length > 1 ? (
        <>
          <View style={styles.containerCarousel}>
            <Carousel
              ref={ref}
              width={width}
              height={height / 2}
              style={{marginTop: -40}}
              data={movieList}
              mode="parallax"
              modeConfig={{
                parallaxScrollingOffset: width * 1.65,
                parallaxScrollingScale: 0.8,
                parallaxAdjacentItemScale: 0.7,
              }}
              onProgressChange={(offsetProgress, absoluteProgress) => {
                // setMovieCurrent(null);
                if (Number.isInteger(absoluteProgress)) {
                  setMovieCurrent(movieList[absoluteProgress]);
                }
              }}
              renderItem={({item, index}) => {
                return (
                  <View style={styles.itemContainer} key={index}>
                    <TouchableOpacity
                      style={[styles.imageContainer]}
                      onPress={() =>
                        navigation.navigate('MovieDetail', {
                          movie: movieCurrent,
                        })
                      }>
                      <Image
                        source={{uri: item.movieImage}}
                        style={styles.image}
                      />
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          </View>
          <View style={styles.containerTitle}>
            <Text style={styles.title}>
              {movieCurrent ? movieCurrent?.movieName : ''}
            </Text>

            <TouchableOpacity
              style={styles.btnOrder}
              onPress={() =>
                navigation.navigate('MovieTheater', {
                  movie: movieCurrent,
                })
              }>
              <Ionicons name="ticket" size={20} color="#ffffff" />
              <Text style={styles.textOrder}> Đặt vé</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : movieList.length == 1 ? (
        <>
          <View style={styles.containerCarousel}>
            <View style={styles.itemContainer}>
              <TouchableOpacity
                style={[styles.imageContainerEvent]}
                onPress={() =>
                  navigation.navigate('MovieDetail', {
                    movie: movieCurrent,
                  })
                }>
                <Image
                  source={{uri: movieList[0].movieImage}}
                  style={styles.image}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.containerTitle}>
            <Text style={styles.title}>
              {movieList[0] ? movieList[0]?.movieName : ''}
            </Text>

            <TouchableOpacity
              style={styles.btnOrder}
              onPress={() =>
                navigation.navigate('MovieTheater', {
                  movie: movieList[0],
                })
              }>
              <Ionicons name="ticket" size={20} color="#ffffff" />
              <Text style={styles.textOrder}> Đặt vé</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  //filter
  containerCate: {
    alignItems: 'center',
    marginTop: 15,
    height: '10%',
    paddingHorizontal: 5,
  },
  boxCate: {
    width: 100,
    height: 50,
    backgroundColor: '#3f3f3f90',
    paddingVertical: 5,
    paddingHorizontal: 3,
  },
  btnActive: {
    backgroundColor: '#666666b8',
    borderWidth: 1,
  },
  btnCate: {
    alignItems: 'center',
    paddingVertical: 10,
    cursor: 'pointer',
    width: '100%',
    height: 40,
    borderRadius: 5,
  },
  textCate: {
    color: 'white',
    fontSize: 15,
    fontWeight: '400',
    textAlign: 'center',
  },
  //carousel
  containerCarousel: {
    height: '80%',
    flex: 1,
    marginVertical: 10,
  },
  //item
  itemContainer: {
    alignItems: 'center',
    flex: 1,
  },
  imageContainer: {
    width: width * 0.8,
    overflow: 'scroll',
    borderRadius: 10,
  },
  imageContainerEvent: {
    width: width * 0.625,
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  //title
  containerTitle: {
    alignItems: 'center',
    height: '20%',
  },
  title: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // order button
  btnOrder: {
    backgroundColor: '#52f52ac0',
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    paddingVertical: 10,
    gap: 10,
    borderRadius: 5,
  },
  textOrder: {
    color: 'white',
    fontSize: 15,
    fontWeight: '400',
    textAlign: 'center',
  },
});

export default MovieCarousel;
