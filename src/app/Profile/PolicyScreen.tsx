import React from 'react';
import {
  Box,
  ScrollView,
  VStack,
  Text,
  View,
  Icon,
  HStack,
  Pressable,
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../../../Views/Colors/Color';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ProfileStackParamList } from '../../../navigation/AppNavigator';

type PolicyScreenNavigationProp = StackNavigationProp<ProfileStackParamList, 'Policy'>;

const PolicyScreen: React.FC = () => {
  const navigation = useNavigation<PolicyScreenNavigationProp>();

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background, paddingBottom: 50 }}>
      <LinearGradient
        colors={[Colors.primary + '20', Colors.background, Colors.background]}
        style={{ flex: 1 }}
      >
        <Box safeAreaTop />
        <Box flexDirection="row" justifyContent="space-between" alignItems="center" px={4} mt={-4}>
          <Pressable onPress={() => navigation.goBack()}>
            <Icon
              as={MaterialIcons}
              name="arrow-back"
              size="lg"
              color={Colors.primary}
            />
          </Pressable>
          <Text bold fontSize="xl" color={Colors.text} textAlign="right">
            سياسة الخصوصية
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
              <HStack space={3} alignItems="center" justifyContent="flex-end">
                <VStack>
                  <Text bold fontSize="2xl" color={Colors.text} textAlign="right">
                    سياسة الخصوصية
                  </Text>
                  <Text fontSize="sm" color={Colors.mutedText} textAlign="right">
                    آخر تحديث: {new Date().toLocaleDateString('ar-SA')}
                  </Text>
                </VStack>
                <Icon
                  as={MaterialIcons}
                  name="privacy-tip"
                  size="2xl"
                  color={Colors.primary}
                />
              </HStack>
            </Box>
            <VStack space={4}>
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
                    جمع المعلومات
                  </Text>
                  <Text color={Colors.mutedText} textAlign="right">
                    نقوم بجمع المعلومات الشخصية التي تقدمها لنا عند إنشاء حسابك، مثل اسمك وعمرك وموقعك واهتماماتك. نستخدم هذه المعلومات لتوفير تجربة تطابق أفضل لك.
                  </Text>
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
                    استخدام المعلومات
                  </Text>
                  <Text color={Colors.mutedText} textAlign="right">
                    نستخدم المعلومات التي نجمعها لتوفير خدمات التطابق وتحسين تجربة المستخدم. لا نشارك معلوماتك الشخصية مع أطراف ثالثة دون موافقتك.
                  </Text>
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
                    الأمان
                  </Text>
                  <Text color={Colors.mutedText} textAlign="right">
                    نستخدم تدابير أمنية متقدمة لحماية معلوماتك الشخصية. ومع ذلك، لا يمكننا ضمان الأمان المطلق للمعلومات المرسلة عبر الإنترنت.
                  </Text>
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
                  marginBottom: 100,
                }}
              >
                <VStack space={4}>
                  <Text bold fontSize="lg" color={Colors.text} textAlign="right">
                    حقوقك
                  </Text>
                  <Text color={Colors.mutedText} textAlign="right">
                    لديك الحق في الوصول إلى معلوماتك الشخصية وتعديلها أو حذفها في أي وقت. يمكنك أيضًا طلب إيقاف استخدام معلوماتك لأغراض التسويق.
                  </Text>
                </VStack>
              </Box>
            </VStack>
          </VStack>
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

export default PolicyScreen;