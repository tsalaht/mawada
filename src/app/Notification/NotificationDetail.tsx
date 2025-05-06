import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Box,
  VStack,
  HStack,
  Text,
  View,
  Icon,
  IconButton,
  Center,
  ScrollView,
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../../../Views/Colors/Color';
import { useNavigation, useRoute, NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
  ProfileScreen: undefined;
  PolicyScreen: undefined;
  ChangePasswordScreen: undefined;
  UpdateScreen: undefined;
  NotificationScreen: undefined;
};

type NavigationPropType = NavigationProp<RootStackParamList>;

interface NotificationType {
  id: number;
  title: string;
  message: string;
  time: string;
  type: string;
  read: boolean;
}

const NotificationDetail: React.FC = () => {
  const navigation = useNavigation<NavigationPropType>();
  const route = useRoute();
  const { notification } = route.params as { notification: NotificationType };

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

  const getActionButton = (type: string) => {
    switch (type) {
      case 'profile':
        return {
          text: 'عرض الملف الشخصي',
          action: () => navigation.navigate('ProfileScreen'),
        };
      case 'interest':
        return {
          text: 'تعديل الاهتمامات',
          action: () => navigation.navigate('ProfileScreen'),
        };
      case 'policy':
        return {
          text: 'قراءة السياسة',
          action: () => navigation.navigate('PolicyScreen'),
        };
      case 'security':
        return {
          text: 'تغيير كلمة المرور',
          action: () => navigation.navigate('ChangePasswordScreen'),
        };
      case 'update':
        return {
          text: 'عرض التحديثات',
          action: () => navigation.navigate('UpdateScreen'),
        };
      default:
        return null;
    }
  };

  const actionButton = getActionButton(notification.type);

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
        <VStack space={6}>
          <Center>
            <Box
              bg={Colors.primary + '15'}
              p={6}
              borderRadius="full"
              style={styles.iconContainer}
            >
              <Icon
                as={MaterialIcons}
                name={getIcon(notification.type)}
                size="4xl"
                color={Colors.primary}
              />
            </Box>
          </Center>

          <VStack space={4} alignItems="center">
            <Text bold fontSize="2xl" color={Colors.text} textAlign="center">
              {notification.title}
            </Text>
            <Text fontSize="sm" color={Colors.mutedText}>
              {notification.time}
            </Text>
          </VStack>

          <Box
            bg="white"
            p={6}
            borderRadius="2xl"
            style={styles.detailCard}
          >
            <VStack space={4}>
              <Text fontSize="lg" color={Colors.text} textAlign="right" lineHeight={28}>
                {notification.message}
              </Text>
              {actionButton && (
                <Center mt={4}>
                  <IconButton
                    icon={
                      <HStack space={2} alignItems="center">
                        <Text
                          color={Colors.primary}
                          fontSize="md"
                          fontWeight="bold"
                        >
                          {actionButton.text}
                        </Text>
                        <Icon
                          as={MaterialIcons}
                          name="arrow-back"
                          size="sm"
                          color={Colors.primary}
                        />
                      </HStack>
                    }
                    onPress={actionButton.action}
                    variant="ghost"
                    _pressed={{ bg: Colors.primary + '10' }}
                  />
                </Center>
              )}
            </VStack>
          </Box>
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
  iconContainer: {
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  detailCard: {
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
});

export default NotificationDetail;
