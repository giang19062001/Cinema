import React, {useEffect, useState} from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import axios from 'axios';
import {IMovie} from '../interface/movie.interface';
import {SwiperFlatList} from 'react-native-swiper-flatlist';

const MovieSwiper = () => {
  const [movieList, setMovieList] = useState<IMovie[]>([]);
  useEffect(() => {
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
      <SwiperFlatList
        autoplay
        autoplayDelay={5}
        autoplayLoop
        index={0}
        horizontal={true} // row instead of column
        showPagination
        data={movieList}
        renderItem={({item, index}) => (
          <View key={index} style={styles.movie}>
            <Image
            
              style={styles.movieThumbnail}
              source={{
                uri: item.movieThumbnail,
              }}
            />
          </View>
        )}
      />
  );
};
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  movie: {
    width,
  },
  movieThumbnail: {
    width: width,
    height: '100%',
    resizeMode: 'cover',
  },
});

export default MovieSwiper;
