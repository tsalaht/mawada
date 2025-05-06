import React from 'react';
import { Alert, StyleSheet } from 'react-native';
import {
  Box,
  ScrollView,
  VStack,
  HStack,
  Text,
  View,
  Icon,
  Pressable,
  Center,
  Button,
  Divider,
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../../../Views/Colors/Color';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setPassHome } from '../../../store/PassHomeSlice';

const ProfileScreen: React.FC = () => {
  const navigation:any = useNavigation();
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.primary + '20', Colors.background, Colors.background]}
        style={{ flex: 1 }}
      >
        <Box safeAreaTop />
        <ScrollView
          px={4}
          pt={4}
          pb={20}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <VStack space={6}>
            {/* Profile Header */}
            <Box
              bg="white"
              p={6}
              borderRadius="3xl"
              style={styles.profileCard}
            >
              <VStack space={6} alignItems="center">
                <Center
                  bg={Colors.primary + '15'}
                  p={6}
                  borderRadius="full"
                  style={styles.profileImageContainer}
                >
                  <Icon
                    as={MaterialIcons}
                    name="person"
                    size="3xl"
                    color={Colors.primary}
                  />
                </Center>
                <VStack space={2} alignItems="center">
                  <Text bold fontSize="2xl" color={Colors.text} textAlign="right">
                    أحمد محمد
                  </Text>
                  <HStack space={2} alignItems="center">
                    <Icon
                      as={MaterialIcons}
                      name="cake"
                      size="sm"
                      color={Colors.mutedText}
                    />
                    <Text fontSize="md" color={Colors.mutedText} textAlign="right">
                      28 سنة
                    </Text>
                  </HStack>
                  <HStack space={2} alignItems="center">
                    <Icon
                      as={MaterialIcons}
                      name="location-on"
                      size="sm"
                      color={Colors.mutedText}
                    />
                    <Text fontSize="sm" color={Colors.mutedText} textAlign="right">
                      الرياض، المملكة العربية السعودية
                    </Text>
                  </HStack>
                </VStack>
              </VStack>
            </Box>

            {/* About Me */}
            <Box
              bg="white"
              p={6}
              borderRadius="2xl"
              style={styles.card}
            >
              <VStack space={4}>
                <HStack space={3} alignItems="center" flexDirection={'row-reverse'}>
                  <Icon
                    as={MaterialIcons}
                    name="info"
                    size="lg"
                    color={Colors.primary}
                  />
                  <Text bold fontSize="lg" color={Colors.text}>
                    عني
                  </Text>
                </HStack>
                <Divider bg={Colors.primary + '20'} />
                <Text color={Colors.mutedText} textAlign="right" fontSize="md" lineHeight={24}>
                  مهندس برمجيات متحمس للتكنولوجيا والابتكار. أحب السفر والقراءة والرياضة.
                </Text>
              </VStack>
            </Box>

            {/* Interests */}
            <Box
              bg="white"
              p={6}
              borderRadius="2xl"
              style={styles.card}
            >
              <VStack space={4}>
                <HStack space={3} alignItems="center" flexDirection={'row-reverse'}>
                  <Icon
                    as={MaterialIcons}
                    name="favorite"
                    size="lg"
                    color={Colors.primary}
                  />
                  <Text bold fontSize="lg" color={Colors.text}>
                    الاهتمامات
                  </Text>
                </HStack>
                <Divider bg={Colors.primary + '20'} />
                <HStack space={2} flexWrap="wrap" justifyContent="flex-end">
                  {['البرمجة', 'السفر', 'القراءة', 'الرياضة'].map((interest, index) => (
                    <Box
                      key={index}
                      bg={Colors.primary + '10'}
                      px={4}
                      py={2}
                      borderRadius="full"
                      mb={2}
                      style={styles.interestTag}
                    >
                      <Text color={Colors.primary} textAlign="right" fontSize="sm">
                        {interest}
                      </Text>
                    </Box>
                  ))}
                </HStack>
              </VStack>
            </Box>

            {/* Actions */}
            <VStack space={4} mb={20}>
              {/* Primary Actions */}
              <Box
                bg="white"
                p={4}
                borderRadius="2xl"
                style={styles.card}
              >
                <VStack space={3}>
                  <Text bold fontSize="lg" color={Colors.text} textAlign="right" mb={2}>
                    الإجراءات الرئيسية
                  </Text>
                  <Button
                    rightIcon={<Icon as={MaterialIcons} name="edit" size="sm" color="white" />}
                    bg={Colors.primary}
                    _pressed={{ bg: Colors.primary + '80' }}
                    py={4}
                    borderRadius="xl"
                    onPress={() => navigation.navigate('EditProfileScreen')}
                    style={styles.primaryButton}
                    _text={{
                      color: 'white',
                      fontSize: 'md',
                      fontWeight: 'bold',
                      textAlign: 'right',
                    }}
                  >
                    تعديل الملف الشخصي
                  </Button>
                  <Button
                    rightIcon={<Icon as={MaterialIcons} name="privacy-tip" size="sm" color={Colors.primary} />}
                    bg="transparent"
                    borderColor={Colors.primary}
                    _pressed={{ bg: Colors.primary + '10' }}
                    py={4}
                    borderRadius="xl"
                    onPress={() => navigation.navigate('PolicyScreen')}
                    style={styles.secondaryButton}
                    _text={{
                      color: Colors.primary,
                      fontSize: 'md',
                      fontWeight: 'bold',
                      textAlign: 'right',
                    }}
                  >
                    سياسة الخصوصية
                  </Button>
                </VStack>
              </Box>

              {/* Account Actions */}
              <Box
                bg="white"
                p={4}
                borderRadius="2xl"
                style={styles.card}
              >
                <VStack space={3}>
                  <Text bold fontSize="lg" color={Colors.text} textAlign="right" mb={2}>
                    إعدادات الحساب
                  </Text>
                  <Button
                    rightIcon={<Icon as={MaterialIcons} name="logout" size="sm" color={Colors.primary} />}
                    bg="transparent"
                    borderColor={Colors.primary}
                    _pressed={{ bg: Colors.primary + '10' }}
                    py={4}
                    borderRadius="xl"
                    onPress={() => {
                      Alert.alert(
                        'تسجيل الخروج',
                        'هل أنت متأكد من رغبتك في تسجيل الخروج؟',
                        [
                          {
                            text: 'إلغاء',
                            style: 'cancel'
                          },
                          {
                            text: 'تسجيل الخروج',
                            onPress: () => {
                              dispatch(setPassHome(false));
                              console.log('User logged out');
                            },
                            style: 'destructive'
                          }
                        ]
                      );
                    }}
                    style={styles.secondaryButton}
                    _text={{
                      color: Colors.primary,
                      fontSize: 'md',
                      fontWeight: 'bold',
                      textAlign: 'right',
                    }}
                  >
                    تسجيل الخروج
                  </Button>
                  <Button
                    rightIcon={<Icon as={MaterialIcons} name="delete-forever" size="sm" color="red.500" />}
                    bg="transparent"
                    borderColor="red.500"
                    _pressed={{ bg: 'red.100' }}
                    py={4}
                    borderRadius="xl"
                    onPress={() => {
                      Alert.alert(
                        'حذف الحساب',
                        'هل أنت متأكد من رغبتك في حذف حسابك؟ لا يمكن التراجع عن هذا الإجراء.',
                        [
                          {
                            text: 'إلغاء',
                            style: 'cancel'
                          },
                          {
                            text: 'حذف الحساب',
                            onPress: () => {
                              console.log('Account deleted');
                            },
                            style: 'destructive'
                          }
                        ]
                      );
                    }}
                    style={styles.dangerButton}
                    _text={{
                      color: 'red.500',
                      fontSize: 'md',
                      fontWeight: 'bold',
                      textAlign: 'right',
                    }}
                  >
                    حذف الحساب
                  </Button>
                </VStack>
              </Box>
            </VStack>
          </VStack>
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingBottom: 50,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  profileCard: {
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  profileImageContainer: {
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  card: {
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  interestTag: {
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  primaryButton: {
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  secondaryButton: {
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  dangerButton: {
    shadowColor: 'red',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
});

export default ProfileScreen; 