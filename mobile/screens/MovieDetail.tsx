import React, {useState} from 'react';
import {View, Text, StyleSheet, Platform, TouchableOpacity} from 'react-native';
import {IMovie} from '../interface/movie.interface';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import YoutubePlayer from 'react-native-youtube-iframe';
import Ionicons from 'react-native-vector-icons/Ionicons';

const MovieDetailScreen = ({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) => {
  const {movie} = route.params as {movie: IMovie};

  return (
    <View style={styles.container}>
      <YoutubePlayer
        height={200}
        play={false}
        videoId={movie.movieTrailer?.replace('https://youtu.be/', '')}
      />
      <View style={styles.boxPadding}>
        <Text style={styles.name}>{movie.movieName}</Text>
        <Text style={styles.preText}>Nội dung:</Text>
        <Text style={styles.textMute} numberOfLines={5}>{movie.movieDescription}</Text>
      </View>
      <View style={styles.divider}></View>

      <View style={styles.boxPadding}>
        <View style={styles.row}>
          <Text style={styles.preText}>Khởi chiếu:</Text>
          <Text style={styles.textMute}>
            {new Date(movie.movieStartDate).toLocaleDateString()}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.preText}>Thời lượng:</Text>
          <Text style={styles.textMute}> {movie.movieDuration} Phút</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.preText}>Ngôn ngữ:</Text>
          <Text style={styles.textMute}>Phụ đề tiếng việt</Text>
        </View>
   
      </View>
      <View style={styles.divider}></View>
      <View style={styles.boxPadding}>
        <View style={styles.col}>
          <Text style={styles.preText}>Đạo diễn:</Text>
          <Text style={styles.textMute}>N/A</Text>
        </View>
        <View style={styles.col}>
        <Text style={styles.preText}>Phân khúc:</Text>
          <Text style={styles.textRed}>
            Phim chỉ dành cho khán giả trên 16 tuổi
          </Text>
        </View>
      </View>
      <View style={[styles.containerOrder, styles.boxPadding]}>
        <TouchableOpacity style={styles.orderBtn} 
         onPress={() =>
          navigation.navigate('MovieTheater', {
            movie: movie,
          })
        }
        >
          <Ionicons name="ticket" size={20} color="#ffffff" />
          <Text style={styles.textOrder}> Đặt vé</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  //common
  container: {flex: 1, padding: 20, backgroundColor: Colors.black},
  boxPadding: {paddingHorizontal: 15, paddingVertical: 5},
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
    marginBottom: 15
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'baseline',
    marginVertical: 2.5
  },
  preText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginBottom: 10,
    minWidth: 100,
  },
  textMute: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'justify',
    lineHeight: 20,
    flexShrink: 1,
  },
  textRed: {
    fontSize: 16,
    color: '#b60404dd',
    textAlign: 'justify',
    lineHeight: 20,
    fontWeight: '400',
    flexShrink: 1,
  },
  //data
  youtube: {alignSelf: 'stretch', height: 300},
  name: {
    fontSize: 20,
    fontWeight: '500',
    color: 'white',
    marginBottom: 10,
    marginTop: 20,
  },
  //order
  containerOrder: {
    alignItems: 'center',
  },

  textOrder: {
    color: 'white',
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
  },
  orderBtn: {
    backgroundColor: '#52f52ac0',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    paddingVertical: 10,
    gap: 10,
    borderRadius: 5,
  },
});

export default MovieDetailScreen;
