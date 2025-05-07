import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import * as ExpoImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../../Views/Colors/Color';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'other';
  image?: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
}

const ChatRoom: React.FC = () => {
  const navigation = useNavigation();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'مرحباً! كيف حالك اليوم؟',
      sender: 'other',
      timestamp: '10:00 ص',
      status: 'read',
    },
    {
      id: '2',
      text: 'أنا بخير، شكراً!',
      sender: 'user',
      timestamp: '10:01 ص',
      status: 'read',
    },
    {
      id: '3',
      text: 'انظر إلى هذه الصورة!',
      sender: 'other',
      timestamp: '10:02 ص',
      status: 'read',
      image: 'https://example.com/image1.jpg',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isImageLoading, setIsImageLoading] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setTimeout(() => {
          flatListRef.current?.scrollToEnd({ animated: true });
        }, 100);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
    };
  }, []);

  const requestGalleryPermission = async (): Promise<boolean> => {
    console.log('Requesting gallery permission...');
    const { status } = await ExpoImagePicker.requestMediaLibraryPermissionsAsync();
    console.log('Permission status:', status);
    return status === 'granted';
  };

  const handleImagePicker = async () => {
    console.log('Photo library icon pressed');
    try {
      setIsImageLoading(true);
      const hasPermission = await requestGalleryPermission();
      if (!hasPermission) {
        Alert.alert(
          'إذن مرفوض',
          'يرجى السماح بالوصول إلى معرض الصور لإرسال الصور. يمكنك تفعيل الإذن من إعدادات الجهاز.',
          [{ text: 'موافق' }]
        );
        setIsImageLoading(false);
        return;
      }

      const result = await ExpoImagePicker.launchImageLibraryAsync({
        mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 0.7,
      });

      console.log('Image picker result:', result);

      if (result.canceled) {
        console.log('تم إلغاء اختيار الصورة');
        setIsImageLoading(false);
        return;
      }

      if (result.assets && result.assets[0].uri) {
        const newMessage: Message = {
          id: Date.now().toString(),
          text: '',
          sender: 'user',
          timestamp: new Date().toLocaleTimeString('ar-SA', {
            hour: '2-digit',
            minute: '2-digit',
          }),
          status: 'sent',
          image: result.assets[0].uri,
        };
        setMessages([...messages, newMessage]);
        setTimeout(() => {
          flatListRef.current?.scrollToEnd({ animated: true });
        }, 100);
      }

      setIsImageLoading(false);
    } catch (error) {
      setIsImageLoading(false);
      Alert.alert('خطأ', 'حدث خطأ أثناء اختيار الصورة. حاول مرة أخرى.');
      console.error('خطأ في اختيار الصورة:', error);
    }
  };

  const sendMessage = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputText,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString('ar-SA', {
          hour: '2-digit',
          minute: '2-digit',
        }),
        status: 'sent',
      };
      setMessages([...messages, newMessage]);
      setInputText('');
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View
      style={[
        styles.messageContainer,
        item.sender === 'user' ? styles.userMessage : styles.otherMessage,
      ]}
    >
      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.messageImage} />
      ) : (
        <Text style={styles.messageText}>{item.text}</Text>
      )}
      <Text style={styles.timestamp}>{item.timestamp}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <LinearGradient
        colors={[Colors.primary + '20', Colors.background, Colors.background]}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <MaterialIcons name="arrow-back" size={24} color={Colors.primary} />
          </TouchableOpacity>
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 110 : 70} // Adjusted for bottom bar and header
        >
          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={renderMessage}
            keyExtractor={(item) => item.id}
            onContentSizeChange={() =>
              flatListRef.current?.scrollToEnd({ animated: true })
            }
            onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
            contentContainerStyle={styles.messagesContent}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="none"
            style={styles.messagesContainer}
          />
          <View style={styles.inputContainer}>
            <TouchableOpacity
              style={[styles.attachmentButton, isImageLoading && styles.disabledButton]}
              onPress={handleImagePicker}
              disabled={isImageLoading}
              activeOpacity={0.7}
            >
              <MaterialIcons
                name="photo-library"
                size={24}
                color={isImageLoading ? Colors.mutedText : Colors.primary}
              />
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              value={inputText}
              onChangeText={setInputText}
              placeholder="اكتب رسالة..."
              multiline
              textAlign="right"
            />
            <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
              <Text style={styles.sendText}>إرسال</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingBottom: 50, // Preserved for bottom bar
  },
  gradient: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: Colors.primary + '20',
    position: 'absolute',
    top: 0,
    width: '100%',
    padding: 2,
    zIndex: 2,
  },
  backButton: {
    padding: 2,
  },
  keyboardView: {
    flex: 1,
    marginTop: 48,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    paddingBottom: 16,
    flexGrow: 1,
  },
  messageContainer: {
    maxWidth: '80%',
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.primary + '20',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: Colors.primary,
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.background,
  },
  messageText: {
    color: Colors.text,
    fontSize: 16,
    textAlign: 'right',
    fontFamily: 'Tajawal_500Medium',
  },
  messageImage: {
    width: 200,
    height: 200,
    borderRadius: 8,
  },
  timestamp: {
    fontSize: 12,
    color: Colors.mutedText,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 8,
    backgroundColor: Colors.background,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.primary + '20',
    position: 'relative',
    zIndex: 1,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 8,
    maxHeight: 100,
    color: Colors.text,
    fontFamily: 'Tajawal_500Medium',
  },
  attachmentButton: {
    padding: 8,
    zIndex: 1,
  },
  disabledButton: {
    opacity: 0.5,
  },
  sendButton: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  sendText: {
    color: Colors.background,
    fontFamily: 'Tajawal_700Bold',
  },
});

export default ChatRoom;