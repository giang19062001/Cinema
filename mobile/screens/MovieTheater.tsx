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
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {IShowDateTime} from '../interface/showDateTime';
import {RootState} from '../store/store';
import {useSelector} from 'react-redux';

// const [dateList, setDateList] = useState([
//   moment().format('YYYY-MM-DD'),
//   moment().add(1, 'days').format('YYYY-MM-DD'),
// ]);
// const [dateChoose, setDateChoose] = useState(moment().format('YYYY-MM-DD'));

const MovieTheaterScreen = ({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) => {
  const {movie} = route.params as {movie: IMovie};
  const [theaterList, setTheaterList] = useState<IShowDateTime[]>([]);

  //AUTH
  const user = useSelector((state: RootState) => state.auth.user);
  // const dispatch = useDispatch<AppDispatch>();

  const [dateList, setDateList] = useState(['2025-02-26', '2025-02-27']);
  const [dateChoose, setDateChoose] = useState('2025-02-26');
  const [activeSections, setActiveSections] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {data: response} = await axios.post(
          'http://10.0.2.2:5000/ShowDate/dateByMovie',
          {movieCode: movie.movieCode, date: dateChoose},
        );
        console.log(response);
        setTheaterList(response);
      } catch (error: unknown) {
        console.error(error);
      }
    };

    fetchData();
  }, [dateChoose]);

  const gotoOrderOrLogin = () => {
    if (user) {
    } else {
      navigation.navigate('Login');
    }
  };

  const _renderHeader = (
    section: IShowDateTime,
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

  const _renderContent = (section: IShowDateTime) => {
    return (
      <View style={styles.listTime}>
        {section.timeList.map((time, index) => (
          <TouchableOpacity
            style={styles.btnTime}
            key={index}
            onPress={() => gotoOrderOrLogin()}>
            <Text style={styles.textTime}>
              {moment(time.timeRelease, 'HH:mm:ss').format('HH:mm')}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  console.log('user', user);
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
  listTime: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    paddingBottom: 10,
  },
  btnTime: {
    backgroundColor: '#3f3f3f90',
    alignItems: 'center',
    height: 40,
    padding: 0,
    cursor: 'pointer',
    width: '20%',
    borderRadius: 5,
  },
  textTime: {
    fontSize: 15,
    color: 'white',
    marginVertical: 10,
  },
});

export default MovieTheaterScreen;
