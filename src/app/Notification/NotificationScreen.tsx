import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Box,
  ScrollView,
  VStack,
  HStack,
  Text,
  View,
  Icon,
  Pressable,
  Divider,
  IconButton,
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../../../Views/Colors/Color';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
  NotificationDetail: { notification: any };
  Home: undefined;
};

type NavigationPropType = NavigationProp<RootStackParamList>;

// Sample notification data
const notifications = [
  {
    id: 1,
    title: 'تم تحديث ملفك الشخصي بنجاح',
    message: 'تم تحديث معلوماتك الشخصية بنجاح. يمكنك مراجعة التغييرات في صفحة الملف الشخصي.',
    time: 'منذ 5 دقائق',
    type: 'profile',
    read: false,
  },
  {
    id: 2,
    title: 'تم إضافة اهتمام جديد',
    message: 'تم إضافة "البرمجة" إلى قائمة اهتماماتك. يمكنك إضافة المزيد من الاهتمامات في صفحة الملف الشخصي.',
    time: 'منذ ساعة',
    type: 'interest',
    read: true,
  },
  {
    id: 3,
    title: 'تحديث سياسة الخصوصية',
    message: 'تم تحديث سياسة الخصوصية الخاصة بالتطبيق. يرجى مراجعة التغييرات الجديدة.',
    time: 'منذ 3 ساعات',
    type: 'policy',
    read: false,
  },
  {
    id: 4,
    title: 'تم تسجيل الدخول من جهاز جديد',
    message: 'تم تسجيل الدخول إلى حسابك من جهاز جديد. إذا لم تكن أنت، يرجى تغيير كلمة المرور.',
    time: 'منذ يوم',
    type: 'security',
    read: true,
  },
  {
    id: 5,
    title: 'تم تحديث التطبيق',
    message: 'تم تحديث التطبيق إلى الإصدار الجديد. استمتع بالميزات الجديدة!',
    time: 'منذ يومين',
    type: 'update',
    read: true,
  },
];

const NotificationScreen: React.FC = () => {
  const navigation = useNavigation<NavigationPropType>();

  const getIcon = (type: string) => {
    switch (type) {
      case 'profile':
        return 'person';
      case 'interest':
        return 'favorite';
      case 'policy':
        return 'privacy-tip';
      case 'security':
        return 'security';
      case 'update':
        return 'system-update';
      default:
        return 'notifications';
    }
  };

  return (
    <View style={styles.container}>
      <Box safeAreaTop bg={Colors.background} />
      <Box px={4} py={2}>
        <IconButton
          icon={<Icon as={MaterialIcons} name="arrow-back" size="lg" color={Colors.text} />}
          onPress={() => navigation.goBack()}
          variant="ghost"
          _pressed={{ bg: Colors.primary + '10' }}
        />
      </Box>
      <ScrollView
        px={4}
        pt={4}
        pb={20}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <VStack space={4}>
          {notifications.map((notification) => (
            <Pressable
              key={notification.id}
              onPress={() => navigation.navigate('NotificationDetail', { notification })}
            >
              <Box
                bg="white"
                p={4}
                borderRadius="2xl"
                style={[
                  styles.notificationCard,
                  !notification.read && styles.unreadCard,
                ]}
              >
                <HStack space={3} alignItems="center">
                  <Box
                    bg={Colors.primary + '15'}
                    p={3}
                    borderRadius="full"
                  >
                    <Icon
                      as={MaterialIcons}
                      name={getIcon(notification.type)}
                      size="md"
                      color={Colors.primary}
                    />
                  </Box>
                  <VStack flex={1} space={1}>
                    <HStack justifyContent="space-between" alignItems="center">
                      <Text fontSize="xs" color={Colors.mutedText}>
                        {notification.time}
                      </Text>
                      {!notification.read && (
                        <Box
                          bg={Colors.primary}
                          w={2}
                          h={2}
                          borderRadius="full"
                        />
                      )}
                    </HStack>
                    <Text bold fontSize="md" color={Colors.text} textAlign="right">
                      {notification.title}
                    </Text>
                    <Text
                      fontSize="sm"
                      color={Colors.mutedText}
                      numberOfLines={2}
                      textAlign="right"
                    >
                      {notification.message}
                    </Text>
                  </VStack>
                </HStack>
              </Box>
            </Pressable>
          ))}
        </VStack>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  notificationCard: {
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  unreadCard: {
    borderLeftWidth: 3,
    borderLeftColor: Colors.primary,
  },
});

export default NotificationScreen; 