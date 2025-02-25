import axios from 'axios';
import * as React from 'react';
import {
  Dimensions,
  Pressable,
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
import {IMovie} from '../interface/movie.interface';
import {Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

function MovieCarousel({navigation}: {navigation: any}) {
  const ref = React.useRef<ICarouselInstance>(null);
  const [movieList, setMovieList] = React.useState<IMovie[]>([]);
  const [isShowing, setIsShowing] = React.useState(true);
  const [movieCurrent, setMovieCurrent] = React.useState<IMovie | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const {data: response} = await axios.get('http://10.0.2.2:5000/Movie');
        console.log(response);
        setMovieList(response);
      } catch (error: unknown) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={{flex: 1}}>
      <View style={styles.containerBtn}>
        <View style={styles.boxBtn}>
          <TouchableOpacity
            style={[styles.button, isShowing && styles.buttonActive]}
            onPress={() => setIsShowing(true)}>
            <Text style={styles.text}>Đang chiếu</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, !isShowing && styles.buttonActive]}
            onPress={() => setIsShowing(false)}>
            <Text style={styles.text}>Sắp chiếu</Text>
          </TouchableOpacity>
        </View>
      </View>
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
            // setMovieCurrent(null)
            // console.log(' absoluteProgress', absoluteProgress);
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
                  <Image source={{uri: item.movieImage}} style={styles.image} />
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
      <View style={styles.containerTitle}>
        <Text style={styles.title}>
          {movieCurrent && movieCurrent?.movieName}
        </Text>

        <TouchableOpacity
          style={styles.orderBtn}
          onPress={() =>
            navigation.navigate('MovieTheater', {
              movie: movieCurrent,
            })
          }>
          <Ionicons name="ticket" size={20} color="#ffffff" />
          <Text style={styles.text}> Đặt vé</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  //filter
  containerBtn: {alignItems: 'center', marginTop: 15, height: '10%'},
  boxBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#4b4b4b90',
    width: width * 0.8,
    borderRadius: 5,
    padding: 5,
  },
  buttonActive: {
    backgroundColor: '#6b6b6bba',
  },
  button: {
    alignItems: 'center',
    paddingVertical: 8,
    cursor: 'pointer',
    width: '50%',
    borderRadius: 5,
  },
  text: {
    color: 'white',
    fontSize: 15,
    fontWeight: '500',
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
  orderBtn: {
    backgroundColor: '#52f52ac0',
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    paddingVertical: 10,
    gap: 10,
    borderRadius: 5,
  },
});

export default MovieCarousel;
