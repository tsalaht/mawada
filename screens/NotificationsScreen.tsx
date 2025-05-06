import React, { useState } from 'react';
import {
  Box,
  ScrollView,
  VStack,
  HStack,
  Text,
  Switch,
  View,
  Icon,
  Pressable,
  Divider,
  Center,
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../Views/Colors/Color';
import { LinearGradient } from 'expo-linear-gradient';

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: Date;
  read: boolean;
  type: 'match' | 'message' | 'like' | 'system';
}

const NotificationsScreen: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: '1',
      title: 'تطابق جديد!',
      description: 'لديك تطابق مع سارة أحمد',
      time: new Date(Date.now() - 3600000),
      read: false,
      type: 'match',
    },
    {
      id: '2',
      title: 'رسالة جديدة',
      description: 'رسالة من نور محمد',
      time: new Date(Date.now() - 7200000),
      read: true,
      type: 'message',
    },
    {
      id: '3',
      title: 'إعجاب جديد',
      description: 'أعجبت بك مريم خالد',
      time: new Date(Date.now() - 86400000),
      read: true,
      type: 'like',
    },
    {
      id: '4',
      title: 'تحديث النظام',
      description: 'تم تحديث التطبيق إلى الإصدار 1.2.0',
      time: new Date(Date.now() - 172800000),
      read: true,
      type: 'system',
    },
  ]);

  const [settings, setSettings] = useState({
    matchNotifications: true,
    messageNotifications: true,
    likeNotifications: true,
    systemNotifications: true,
  });

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'match':
        return 'favorite';
      case 'message':
        return 'chat';
      case 'like':
        return 'thumb-up';
      case 'system':
        return 'info';
      default:
        return 'notifications';
    }
  };

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <LinearGradient
        colors={[Colors.primary + '20', Colors.background, Colors.background]}
        style={{ flex: 1 }}
      >
        <Box safeAreaTop />
        <ScrollView
          px={4}
          pt={4}
          pb={24}
          showsVerticalScrollIndicator={false}
        >
          <VStack space={6}>
            {/* Notification Settings */}
            <Box
              bg="white"
              p={6}
              borderRadius="2xl"
              style={{
                shadowColor: Colors.primary,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
                elevation: 4,
              }}
            >
              <VStack space={4}>
                <Text bold fontSize="lg" color={Colors.text}>
                  إعدادات الإشعارات
                </Text>
                <HStack justifyContent="space-between" alignItems="center">
                  <HStack space={3} alignItems="center">
                    <Icon
                      as={MaterialIcons}
                      name="favorite"
                      size="md"
                      color={Colors.primary}
                    />
                    <Text color={Colors.text}>إشعارات التطابقات</Text>
                  </HStack>
                  <Switch
                    isChecked={settings.matchNotifications}
                    onToggle={() => toggleSetting('matchNotifications')}
                    colorScheme="primary"
                  />
                </HStack>
                <HStack justifyContent="space-between" alignItems="center">
                  <HStack space={3} alignItems="center">
                    <Icon
                      as={MaterialIcons}
                      name="chat"
                      size="md"
                      color={Colors.primary}
                    />
                    <Text color={Colors.text}>إشعارات الرسائل</Text>
                  </HStack>
                  <Switch
                    isChecked={settings.messageNotifications}
                    onToggle={() => toggleSetting('messageNotifications')}
                    colorScheme="primary"
                  />
                </HStack>
                <HStack justifyContent="space-between" alignItems="center">
                  <HStack space={3} alignItems="center">
                    <Icon
                      as={MaterialIcons}
                      name="thumb-up"
                      size="md"
                      color={Colors.primary}
                    />
                    <Text color={Colors.text}>إشعارات الإعجابات</Text>
                  </HStack>
                  <Switch
                    isChecked={settings.likeNotifications}
                    onToggle={() => toggleSetting('likeNotifications')}
                    colorScheme="primary"
                  />
                </HStack>
                <HStack justifyContent="space-between" alignItems="center">
                  <HStack space={3} alignItems="center">
                    <Icon
                      as={MaterialIcons}
                      name="info"
                      size="md"
                      color={Colors.primary}
                    />
                    <Text color={Colors.text}>إشعارات النظام</Text>
                  </HStack>
                  <Switch
                    isChecked={settings.systemNotifications}
                    onToggle={() => toggleSetting('systemNotifications')}
                    colorScheme="primary"
                  />
                </HStack>
              </VStack>
            </Box>

            {/* Notifications List */}
            <VStack space={4}>
              <Text bold fontSize="lg" color={Colors.text}>
                الإشعارات
              </Text>
              {notifications.map((notification, index) => (
                <Pressable
                  key={notification.id}
                  onPress={() => markAsRead(notification.id)}
                >
                  <Box
                    bg="white"
                    p={4}
                    borderRadius="xl"
                    style={{
                      shadowColor: Colors.primary,
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.1,
                      shadowRadius: 4,
                      elevation: 2,
                    }}
                  >
                    <HStack space={3} alignItems="center">
                      <Center
                        bg={Colors.primary + '15'}
                        p={3}
                        borderRadius="full"
                      >
                        <Icon
                          as={MaterialIcons}
                          name={getNotificationIcon(notification.type)}
                          size="md"
                          color={Colors.primary}
                        />
                      </Center>
                      <VStack flex={1}>
                        <HStack justifyContent="space-between" alignItems="center">
                          <Text
                            bold
                            fontSize="md"
                            color={notification.read ? Colors.mutedText : Colors.text}
                          >
                            {notification.title}
                          </Text>
                          <Text fontSize="xs" color={Colors.mutedText}>
                            {notification.time.toLocaleTimeString('ar-SA', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </Text>
                        </HStack>
                        <Text
                          fontSize="sm"
                          color={notification.read ? Colors.mutedText : Colors.text}
                        >
                          {notification.description}
                        </Text>
                      </VStack>
                    </HStack>
                  </Box>
                </Pressable>
              ))}
            </VStack>
          </VStack>
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

export default NotificationsScreen; 