import React, { useState } from 'react';
import { Alert, TextInput, StyleSheet } from 'react-native';
import {
  Box,
  ScrollView,
  VStack,
  HStack,
  Text,
  View,
  Icon,
  Button,
  Pressable,
  Center,
  Image,
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../../../Views/Colors/Color';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ProfileStackParamList } from '../../../navigation/AppNavigator';
import * as ImagePicker from 'expo-image-picker';

type EditProfileScreenNavigationProp = StackNavigationProp<ProfileStackParamList, 'EditProfile'>;

const EditProfileScreen: React.FC = () => {
  const navigation = useNavigation<EditProfileScreenNavigationProp>();
  const [name, setName] = useState('أحمد محمد');
  const [age, setAge] = useState('28');
  const [location, setLocation] = useState('الرياض، المملكة العربية السعودية');
  const [about, setAbout] = useState('مهندس برمجيات متحمس للتكنولوجيا والابتكار. أحب السفر والقراءة والرياضة.');
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['البرمجة', 'السفر', 'القراءة', 'الرياضة']);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const interests = [
    'البرمجة',
    'السفر',
    'القراءة',
    'الرياضة',
    'الطبخ',
    'الموسيقى',
    'التصوير',
    'الرسم',
    'الكتابة',
    'التصميم',
  ];

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('تنبيه', 'الرجاء منح الإذن للوصول إلى المعرض!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    const profileData = {
      name,
      age,
      location,
      about,
      interests: selectedInterests,
      profileImage,
    };
    console.log('Saving profile:', profileData);
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background, paddingBottom: 50 }}>
      <LinearGradient
        colors={[Colors.primary + '20', Colors.background, Colors.background]}
        style={{ flex: 1 }}
      >
        <Box safeAreaTop />
        <Box flexDirection="row" justifyContent="space-between" alignItems="center" px={4} mt={5}>
          <Pressable onPress={() => navigation.goBack()}>
            <Icon
              as={MaterialIcons}
              name="arrow-back"
              size="lg"
              color={Colors.primary}
            />
          </Pressable>
          <Text bold fontSize="xl" color={Colors.text} textAlign="right">
            تعديل الملف الشخصي
          </Text>
        </Box>
        <ScrollView
          px={4}
          pt={4}
          pb={24}
          showsVerticalScrollIndicator={false}
        >
          <VStack space={6}>
            <Box
              bg="white"
              p={6}
              borderRadius="3xl"
              style={{
                shadowColor: Colors.primary,
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.2,
                shadowRadius: 12,
                elevation: 8,
              }}
            >
              <VStack space={4} alignItems="center">
                <Center
                  bg={Colors.primary + '15'}
                  p={6}
                  borderRadius="full"
                  style={{
                    shadowColor: Colors.primary,
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.2,
                    shadowRadius: 8,
                    elevation: 4,
                  }}
                >
                  {profileImage ? (
                    <Image
                      source={{ uri: profileImage }}
                      size="2xl"
                      borderRadius="full"
                      alt="Profile Picture"
                    />
                  ) : (
                    <Icon
                      as={MaterialIcons}
                      name="person"
                      size="2xl"
                      color={Colors.primary}
                    />
                  )}
                </Center>
                <Button
                  rightIcon={<Icon as={MaterialIcons} name="camera-alt" size="sm" color="white" />}
                  bg={Colors.primary}
                  _pressed={{ bg: Colors.primary + '80' }}
                  py={2}
                  px={4}
                  borderRadius="full"
                  onPress={pickImage}
                >
                  <Text color="white" fontSize="sm" textAlign="right">
                    تغيير الصورة
                  </Text>
                </Button>
              </VStack>
            </Box>
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
                <Text bold fontSize="lg" color={Colors.text} textAlign="right">
                  المعلومات الأساسية
                </Text>
                <TextInput
                  value={name}
                  onChangeText={setName}
                  placeholder="الاسم"
                  style={styles.input}
                  placeholderTextColor={Colors.primary + '80'}
                />
                <TextInput
                  value={age}
                  onChangeText={setAge}
                  placeholder="العمر"
                  style={styles.input}
                  placeholderTextColor={Colors.primary + '80'}
                  keyboardType="numeric"
                />
                <TextInput
                  value={location}
                  onChangeText={setLocation}
                  placeholder="الموقع"
                  style={styles.input}
                  placeholderTextColor={Colors.primary + '80'}
                />
              </VStack>
            </Box>
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
                <Text bold fontSize="lg" color={Colors.text} textAlign="right">
                  عني
                </Text>
                <TextInput
                  value={about}
                  onChangeText={setAbout}
                  placeholder="اكتب عن نفسك..."
                  style={[styles.input, styles.multilineInput]}
                  placeholderTextColor={Colors.primary + '80'}
                  multiline
                  textAlignVertical="top"
                />
              </VStack>
            </Box>
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
                <Text bold fontSize="lg" color={Colors.text} textAlign="right">
                  الاهتمامات
                </Text>
                <HStack space={2} flexWrap="wrap" justifyContent="flex-end">
                  {interests.map((interest, index) => (
                    <Pressable
                      key={index}
                      onPress={() => toggleInterest(interest)}
                    >
                      <Box
                        bg={selectedInterests.includes(interest) ? Colors.primary : Colors.primary + '10'}
                        px={4}
                        py={2}
                        borderRadius="full"
                        mb={2}
                      >
                        <Text
                          color={selectedInterests.includes(interest) ? 'white' : Colors.primary}
                          textAlign="right"
                        >
                          {interest}
                        </Text>
                      </Box>
                    </Pressable>
                  ))}
                </HStack>
              </VStack>
            </Box>
            <Button
              bg={Colors.primary}
              _pressed={{ bg: Colors.primary + '80' }}
              py={4}
              borderRadius="2xl"
              onPress={handleSave}
              mb={20}
            >
              <Text color="white" fontSize="lg" fontWeight="bold" textAlign="right">
                حفظ التغييرات
              </Text>
            </Button>
          </VStack>
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: Colors.primary + '30',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    textAlign: 'right',
    backgroundColor: 'white',
    fontFamily: 'Tajawal_500Medium',
  },
  multilineInput: {
    height: 120,
    textAlignVertical: 'top',
  },
});

export default EditProfileScreen;