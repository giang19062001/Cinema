import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import {IMovie} from '../interface/movie.interface';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Accordion from 'react-native-collapsible/Accordion';
import {Image} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import {ITheater} from '../interface/theater.inteface';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';

const times = [
  {
    dateId: 1,
    date: '14:05',
  },
  {
    dateId: 2,
    date: '14:05',
  },
  {
    dateId: 3,
    date: '14:05',
  },
  {
    dateId: 4,
    date: '14:05',
  },
  {
    dateId: 5,
    date: '14:05',
  },
  {
    dateId: 6,
    date: '14:05',
  },
  {
    dateId: 7,
    date: '14:05',
  },
];
const MovieTheaterScreen = ({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) => {
  const {movie} = route.params as {movie: IMovie};
  const [theaterList, setTheaterList] = useState<ITheater[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const {data: response} = await axios.get(
          'http://10.0.2.2:5000/Theater',
        );
        console.log(response);
        setTheaterList(response);
      } catch (error: unknown) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  const [dateList, setDateList] = useState([
    moment().format('YYYY-MM-DD'),
    moment().add(1, 'days').format('YYYY-MM-DD'),
  ]);
  const [timeList, setTimeList] = useState(times);

  const [dateChoose, setDateChoose] = useState(moment().format('YYYY-MM-DD'));
  const [activeSections, setActiveSections] = useState<number[]>([]);

  const _renderHeader = (
    section: ITheater,
    index: number,
    isActive: boolean,
  ) => {
    return (
      <View style={styles.boxHeader}>
        <Text style={styles.textHeader}>{section.theaterName}</Text>
        <Ionicons
          name={isActive ? 'chevron-up-sharp' : 'chevron-down-sharp'}
          size={20}
          color="#ffffff"
        />
      </View>
    );
  };

  const _renderContent = (section: ITheater) => {
    return (
      <View style={{flex: 1}}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{flex: 1}}>
          {timeList.map((time, index) => (
            <View style={styles.boxTime} key={index}>
              <TouchableOpacity
                style={[
                  styles.btnTime,
                  // cateChoose == cate.categoryId ? styles.buttonActive : '',
                ]}
                // onPress={() => setCateChoose(cate.categoryId)}
              >
                <Text style={styles.textTime}>{time.date}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  };

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
          <View style={styles.boxDate}>
            {dateList.map((date, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.btnDate,
                  dateChoose === date ? styles.btnDateActive : '',
                ]}
                onPress={() => setDateChoose(date)}>
                <Text style={styles.textDD}>{moment(date).format('DD')}</Text>
                <Text style={styles.textddd}>{moment(date).format('ddd')}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.conatinerAccordion}>
            <Accordion
              sections={theaterList}
              activeSections={activeSections}
              renderHeader={_renderHeader}
              renderContent={_renderContent}
              onChange={(sections: number[]) => setActiveSections(sections)}
            />
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

  boxPadding: {paddingHorizontal: 25, paddingVertical: 5},
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
  boxDate: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 15,
  },
  textDuration: {
    fontSize: 15,
    fontWeight: '500',
    color: '#5a5a5a',
  },
  btnDateActive: {
    alignItems: 'center',
    backgroundColor: '#52f52ac0',
    padding: 5,
    borderRadius: 5,
    width: 45,
  },
  btnDate: {
    alignItems: 'center',
    padding: 5,
    borderRadius: 5,
    width: 45,
  },
  textDD: {
    fontSize: 20,
    fontWeight: '500',
    color: 'white',
  },
  textddd: {
    fontSize: 15,
    fontWeight: '400',
    color: 'white',
  },

  conatinerAccordion: {
    marginTop: 30,
    borderBottomWidth: 0.2,
    borderColor: 'white',
  },
  boxHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 0.2,
    borderColor: 'white',
    paddingVertical: 15,
  },
  textHeader: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
  },
  boxTime: {
    width: 100,
    height: 100,
    marginRight: 5,
    flex: 1,
  },
  btnTime: {
    backgroundColor: '#838282b9',
    alignItems: 'center',
    paddingVertical: 10,
    cursor: 'pointer',
    width: '100%',
    borderRadius: 5,
  },
  textTime: {
    fontSize: 15,
    color: 'white',
    marginVertical: 10,
  },
});

export default MovieTheaterScreen;
