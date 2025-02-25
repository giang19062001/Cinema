import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {IMovie} from '../interface/movie.interface';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import YoutubePlayer from 'react-native-youtube-iframe';
import {Image} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

const MovieTheaterScreen = ({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) => {
  const {movie} = route.params as {movie: IMovie};

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: movie.movieThumbnail,
        }}
      />
      <View style={styles.container}>
        <View style={styles.boxPadding}>
          <Text style={styles.textName}>{movie.movieName}</Text>
          <View style={styles.boxIcon}>
            <AntDesignIcon name="clockcircleo" size={18} color="#5a5a5a" />
            <Text style={styles.textDuration}>{movie.movieDuration} phút</Text>

          </View>
        </View>
      </View>
    </View>
  );
};
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  //common
  container: {
    flex: 1,
    backgroundColor: Colors.black,
    height: height,
  },

  boxPadding: {paddingHorizontal: 20, paddingVertical: 5},
  divider: {
    borderBottomColor: 'white',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 10,
  },
  col: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'baseline',
    gap: 0,
    marginBottom: 15,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'baseline',
    marginVertical: 2.5,
  },
  image: {
    width: width,
    height: 200,
    resizeMode: 'cover',
  },
  textName: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
    marginBottom: 10,
    marginTop: 20,
  },
  boxIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  textDuration: {
    fontSize: 15,
    fontWeight: '500',
    color: '#5a5a5a',
  },
});

export default MovieTheaterScreen;
