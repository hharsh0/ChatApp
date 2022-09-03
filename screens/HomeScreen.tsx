import { StyleSheet, View, Text, Image, FlatList } from 'react-native';
import { RootTabScreenProps } from '../types';
import ChatRoomItem from '../components/ChatRoomItem';
import chatRoomData from "../assets/dummy-data/ChatRooms"

const chatRoom1 = chatRoomData[0]
const chatRoom2 = chatRoomData[1]

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  return (
    <View style={styles.root}>
      <FlatList
        data={chatRoomData}
        renderItem={({ item }) => <ChatRoomItem chatRoom={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
  },
});
