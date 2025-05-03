import React from 'react';
import {
  Box,
  ScrollView,
  VStack,
  HStack,
  Text,
  Button,
  Image,
  Heading,
  Badge,
  Divider,
  Card,
} from 'native-base';
import { useNavigation } from '@react-navigation/native';
import Colors from '../Colors/Color';

const Home = () => {
  const navigation: any = useNavigation();

  return (
    <Box flex={1} bg={Colors.background}>
      <ScrollView px={4} pt={10}>
        <VStack space={6} pb={20}>
          {/* Welcome Section */}
          <Box bg="white" p={4} borderRadius="xl" shadow={2}>
            <Heading size="lg" color={Colors.primary} textAlign="right">
              مرحبًا، أحمد!
            </Heading>
            <Text fontSize="md" color="gray.600" textAlign="right" mt={2}>
              ابدأ رحلتك للعثور على شريكة الحياة المثالية. استكشف الملفات المميزة وتواصل مع من
              تناسبك.
            </Text>
            <Button
              bg={Colors.primary}
              borderRadius="lg"
              mt={4}
              _text={{ color: 'white', fontWeight: 'bold' }}
              onPress={() => navigation.navigate('Profile')}
            >
              عرض ملفك الشخصي
            </Button>
          </Box>

          {/* Profile Highlights */}
          <Box>
            <Text bold fontSize="lg" color={Colors.primary} textAlign="right" mb={3}>
              أبرز المعلومات عنك
            </Text>
            <HStack space={3} justifyContent="flex-end">
              <Badge colorScheme="success" borderRadius="lg">
                <Text color="black" textAlign="right">
                  32 سنة
                </Text>
              </Badge>
              <Badge colorScheme="info" borderRadius="lg">
                <Text color="black" textAlign="right">
                  مهندس
                </Text>
              </Badge>
              <Badge colorScheme="warning" borderRadius="lg">
                <Text color="black" textAlign="right">
                  ملتزم دينيًا
                </Text>
              </Badge>
            </HStack>
          </Box>

          {/* Featured Matches */}
          <Box>
            <Text bold fontSize="lg" color={Colors.primary} textAlign="right" mb={3}>
              ملفات مميزة
            </Text>
            <VStack space={4}>
              {/* Match 1 */}
              <Card bg="white" borderRadius="xl" shadow={2} p={4}>
                <HStack space={4} alignItems="center">
                  <Image
                    source={{ uri: 'https://via.placeholder.com/80' }}
                    alt="صورة الملف"
                    size="md"
                    borderRadius="full"
                  />
                  <VStack flex={1}>
                    <Text bold fontSize="md" textAlign="right">
                      فاطمة الزهراء
                    </Text>
                    <Text fontSize="sm" color="gray.600" textAlign="right">
                      28 سنة | معلمة | الرياض
                    </Text>
                    <Text fontSize="xs" color="gray.500" textAlign="right">
                      ملتزمة، تحب السفر والقراءة
                    </Text>
                  </VStack>
                </HStack>
                <Button
                  variant="outline"
                  mt={3}
                  _text={{ color: Colors.primary }}
                  onPress={() => navigation.navigate('MatchDetails', { id: '1' })}
                >
                  عرض التفاصيل
                </Button>
              </Card>
              {/* Match 2 */}
              <Card bg="white" borderRadius="xl" shadow={2} p={4}>
                <HStack space={4} alignItems="center">
                  <Image
                    source={{ uri: 'https://via.placeholder.com/80' }}
                    alt="صورة الملف"
                    size="md"
                    borderRadius="full"
                  />
                  <VStack flex={1}>
                    <Text bold fontSize="md" textAlign="right">
                      سارة محمد
                    </Text>
                    <Text fontSize="sm" color="gray.600" textAlign="right">
                      25 سنة | طبيبة | جدة
’azienda                    </Text>
                    <Text fontSize="xs" color="gray.500" textAlign="right">
                      مرحة، تهتم باللياقة البدنية
                    </Text>
                  </VStack>
                </HStack>
                <Button
                  variant="outline"
                  mt={3}
                  _text={{ color: Colors.primary }}
                  onPress={() => navigation.navigate('MatchDetails', { id: '2' })}
                >
                  عرض التفاصيل
                </Button>
              </Card>
              {/* Match 3 */}
              <Card bg="white" borderRadius="xl" shadow={2} p={4}>
                <HStack space={4} alignItems="center">
                  <Image
                    source={{ uri: 'https://via.placeholder.com/80' }}
                    alt="صورة الملف"
                    size="md"
                    borderRadius="full"
                  />
                  <VStack flex={1}>
                    <Text bold fontSize="md" textAlign="right">
                      ليلى عبدالله
                    </Text>
                    <Text fontSize="sm" color="gray.600" textAlign="right">
                      30 سنة | محاسبة | الدمام
                    </Text>
                    <Text fontSize="xs" color="gray.500" textAlign="right">
                      هادئة، تحب الطبخ والفنون
                    </Text>
                  </VStack>
                </HStack>
                <Button
                  variant="outline"
                  mt={3}
                  _text={{ color: Colors.primary }}
                  onPress={() => navigation.navigate('MatchDetails', { id: '3' })}
                >
                  عرض التفاصيل
                </Button>
              </Card>
            </VStack>
          </Box>

          {/* Recent Activity */}
          <Box bg="white" p={4} borderRadius="xl" shadow={2}>
            <Text bold fontSize="lg" color={Colors.primary} textAlign="right" mb={3}>
              الأنشطة الأخيرة
            </Text>
            <VStack space={3}>
              <HStack justifyContent="flex-end" alignItems="center">
                <Text fontSize="sm" textAlign="right" color="gray.600">
                  قمت بإرسال طلب تواصل إلى فاطمة الزهراء
                </Text>
                <Badge colorScheme="info" mr={2}>
                  <Text color="black" fontSize="xs">
                    منذ يوم
                  </Text>
                </Badge>
              </HStack>
              <Divider />
              <HStack justifyContent="flex-end" alignItems="center">
                <Text fontSize="sm" textAlign="right" color="gray.600">
                  ليلى عبدالله شاهدت ملفك الشخصي
                </Text>
                <Badge colorScheme="warning" mr={2}>
                  <Text color="black" fontSize="xs">
                    منذ 3 ساعات
                  </Text>
                </Badge>
              </HStack>
              <Divider />
              <HStack justifyContent="flex-end" alignItems="center">
                <Text fontSize="sm" textAlign="right" color="gray.600">
                  قمت بتحديث وصف ملفك الشخصي
                </Text>
                <Badge colorScheme="success" mr={2}>
                  <Text color="black" fontSize="xs">
                    منذ أسبوع
                  </Text>
                </Badge>
              </HStack>
            </VStack>
          </Box>

          {/* Tips for Finding a Partner */}
          <Box bg="white" p={4} borderRadius="xl" shadow={2}>
            <Text bold fontSize="lg" color={Colors.primary} textAlign="right" mb={3}>
              نصائح للعثور على شريكة الحياة
            </Text>
            <VStack space={3}>
              <Text fontSize="sm" textAlign="right" color="gray.600">
                1. كن صادقًا في ملفك الشخصي: قدم معلومات دقيقة عن نفسك لجذب الشريكة المناسبة.
              </Text>
              <Text fontSize="sm" textAlign="right" color="gray.600">
                2. تواصل باحترام: ابدأ المحادثات بأسلوب مهذب وودود.
              </Text>
              <Text fontSize="sm" textAlign="right" color="gray.600">
                3. حدد أولوياتك: فكر في الصفات التي تبحث عنها في شريكة حياتك.
              </Text>
              <Text fontSize="sm" textAlign="right" color="gray.600">
                4. كن صبورًا: العثور على الشريكة المثالية قد يستغرق وقتًا.
              </Text>
            </VStack>
            <Button
              variant="link"
              mt={3}
              _text={{ color: Colors.primary, textAlign: 'right' }}
              onPress={() => navigation.navigate('Tips')}
            >
              اقرأ المزيد من النصائح
            </Button>
          </Box>

          {/* Call to Action */}
          <Box bg={Colors.primary} p={4} borderRadius="xl" shadow={2}>
            <Text bold fontSize="lg" color="white" textAlign="right">
              مستعد للخطوة التالية؟
            </Text>
            <Text fontSize="md" color="white" textAlign="right" mt={2}>
              ابحث عن المزيد من الملفات أو قم بترقية اشتراكك للحصول على ميزات إضافية.
            </Text>
            <HStack space={3} mt={4} justifyContent="flex-end">
              <Button
                bg="white"
                _text={{ color: Colors.primary, fontWeight: 'bold' }}
                borderRadius="lg"
                onPress={() => navigation.navigate('Search')}
              >
                ابحث الآن
              </Button>
              <Button
                variant="outline"
                borderColor="white"
                _text={{ color: 'white' }}
                borderRadius="lg"
                onPress={() => navigation.navigate('Upgrade')}
              >
                ترقية الاشتراك
              </Button>
            </HStack>
          </Box>
        </VStack>
      </ScrollView>
    </Box>
  );
};

export default Home;