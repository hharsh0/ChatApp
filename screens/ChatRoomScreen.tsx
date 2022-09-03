import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native'
import React from 'react'
import Message from '../components/Message'
import chatRoomData from "../assets/dummy-data/Chats"
import MessageInput from '../components/MessageInput'
import { useRoute } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'

const ChatRoomScreen = () => {
  const route = useRoute()
  const navigation = useNavigation()

  navigation.setOptions({title: 'Elon musk'})
    
  return (
    <SafeAreaView style={styles.root}>
        <FlatList
           data={chatRoomData.messages} 
           renderItem={({ item }) => <Message message={item} />}
           inverted
        />
        <MessageInput />
    </SafeAreaView>
  )
}

export default ChatRoomScreen

const styles = StyleSheet.create({
    root: {
        flex: 1,
    }
})