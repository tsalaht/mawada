import React from 'react';
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
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../../../Views/Colors/Color';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../navigation/AppNavigator';

type MatchDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MatchDetails'>;

const MatchDetailsScreen: React.FC = () => {
  const navigation = useNavigation<MatchDetailsScreenNavigationProp>();

  // Sample match data - in a real app, this would come from your data store
  const matchData = {
    id: '2',
    userName: 'نور محمد',
    age: 27,
    location: 'جدة',
    distance: 10,
    commonInterests: ['الطبخ', 'الرياضة', 'التصوير'],
    matchedAt: new Date(),
    lastInteraction: new Date(),
    isSuperLike: false,
    status: 'accepted'
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
            {/* Profile Header */}
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
              <VStack space={6} alignItems="center">
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
                  <Icon
                    as={MaterialIcons}
                    name="person"
                    size="2xl"
                    color={Colors.primary}
                  />
                </Center>
                <VStack space={1} alignItems="center">
                  <Text bold fontSize="2xl" color={Colors.text}>
                    {matchData.userName}
                  </Text>
                  <Text fontSize="md" color={Colors.mutedText}>
                    {matchData.age} سنة
                  </Text>
                  <Text fontSize="sm" color={Colors.mutedText}>
                    {matchData.location} • على بعد {matchData.distance} كم
                  </Text>
                </VStack>
              </VStack>
            </Box>

            {/* Common Interests */}
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
                <HStack space={3} alignItems="center">
                  <Icon
                    as={MaterialIcons}
                    name="favorite"
                    size="lg"
                    color={Colors.primary}
                  />
                  <Text bold fontSize="lg" color={Colors.text}>
                    الاهتمامات المشتركة
                  </Text>
                </HStack>
                <HStack space={2} flexWrap="wrap">
                  {matchData.commonInterests.map((interest, index) => (
                    <Box
                      key={index}
                      bg={Colors.primary + '10'}
                      px={4}
                      py={2}
                      borderRadius="full"
                      mb={2}
                    >
                      <Text color={Colors.primary} fontWeight="600">
                        {interest}
                      </Text>
                    </Box>
                  ))}
                </HStack>
              </VStack>
            </Box>

            {/* Match Info */}
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
                <HStack space={3} alignItems="center">
                  <Icon
                    as={MaterialIcons}
                    name="info"
                    size="lg"
                    color={Colors.primary}
                  />
                  <Text bold fontSize="lg" color={Colors.text}>
                    معلومات التطابق
                  </Text>
                </HStack>
                <VStack space={2}>
                  <HStack justifyContent="space-between">
                    <Text color={Colors.mutedText}>تاريخ التطابق</Text>
                    <Text color={Colors.text}>
                      {matchData.matchedAt.toLocaleDateString('ar-SA')}
                    </Text>
                  </HStack>
                  <HStack justifyContent="space-between">
                    <Text color={Colors.mutedText}>آخر تفاعل</Text>
                    <Text color={Colors.text}>
                      {matchData.lastInteraction.toLocaleDateString('ar-SA')}
                    </Text>
                  </HStack>
                  <HStack justifyContent="space-between">
                    <Text color={Colors.mutedText}>الحالة</Text>
                    <Text color={Colors.primary} fontWeight="600">
                      {matchData.status === 'accepted' ? 'مقبول' : 'قيد الانتظار'}
                    </Text>
                  </HStack>
                </VStack>
              </VStack>
            </Box>

            {/* Actions */}
            <VStack space={3}>
              <Button
                leftIcon={<Icon as={MaterialIcons} name="chat" size="sm" color="white" />}
                bg={Colors.primary}
                _pressed={{ bg: Colors.primary + '80' }}
                py={4}
                borderRadius="2xl"
                onPress={() => console.log('Start chat')}
              >
                <Text color="white" fontSize="lg" fontWeight="600">
                  بدء المحادثة
                </Text>
              </Button>
              <Button
                leftIcon={<Icon as={MaterialIcons} name="block" size="sm" color={Colors.error} />}
                variant="outline"
                borderColor={Colors.error}
                _pressed={{ bg: Colors.error + '10' }}
                py={4}
                borderRadius="2xl"
                onPress={() => console.log('Block user')}
              >
                <Text color={Colors.error} fontSize="lg" fontWeight="600">
                  حظر المستخدم
                </Text>
              </Button>
            </VStack>
          </VStack>
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

export default MatchDetailsScreen; 