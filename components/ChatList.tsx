import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import { useChatStore } from '../store/chatStore';
import { formatDistanceToNow } from 'date-fns';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Chat: { chatId: string };
};

type ChatListNavigationProp = StackNavigationProp<RootStackParamList, 'Chat'>;

interface ChatListItem {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  lastMessage: {
    content: string;
    timestamp: Date;
  };
  unreadCount: number;
  isOnline: boolean;
  isVerified?: boolean;
}

const ChatList: React.FC = () => {
  const navigation = useNavigation<ChatListNavigationProp>();
  const { activeChats, pendingRequests, likedUsers, activeTab, setCurrentChat } = useChatStore();

  const getActiveList = (): ChatListItem[] => {
    switch (activeTab) {
      case 'chats':
        return activeChats;
      case 'requests':
        return pendingRequests;
      case 'liked':
        return likedUsers;
      default:
        return activeChats;
    }
  };

  const handleChatPress = (chatId: string) => {
    setCurrentChat(chatId);
    navigation.navigate('Chat', { chatId });
  };

  const renderChatItem = ({ item }: { item: ChatListItem }) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() => handleChatPress(item.id)}
    >
      {/* <View style={styles.avatarContainer}>
        <Image
          source={require('../assets/images/placeholder-avatar.png')}
          style={styles.avatar}
        />
        {item.isOnline && <View style={styles.onlineIndicator} />}
      </View> */}
      <View style={styles.chatInfo}>
        <View style={styles.nameContainer}>
          <Text style={styles.userName}>{item.userName}</Text>
          {item.isVerified && (
            <MaterialIcons name="verified" size={16} color="#4CAF50" style={styles.verifiedIcon} />
          )}
        </View>
        <Text style={styles.lastMessage} numberOfLines={1}>
          {item.lastMessage.content}
        </Text>
        <Text style={styles.timestamp}>
          {formatDistanceToNow(new Date(item.lastMessage.timestamp), { addSuffix: true })}
        </Text>
      </View>
      {item.unreadCount > 0 && (
        <View style={styles.unreadBadge}>
          <Text style={styles.unreadCount}>{item.unreadCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={getActiveList()}
        renderItem={renderChatItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContent: {
    padding: 16,
  },
  chatItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#fff',
  },
  chatInfo: {
    flex: 1,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  verifiedIcon: {
    marginLeft: 4,
  },
  lastMessage: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  unreadBadge: {
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  unreadCount: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default ChatList; 