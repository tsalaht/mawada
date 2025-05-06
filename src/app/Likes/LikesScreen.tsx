import React from 'react';
import {
  Box,
  ScrollView,
  VStack,
  HStack,
  Text,
  Button,
  Badge,
  View,
  Icon,
  Pressable,
  Center,
} from 'native-base';
import { useMatchStore } from '../store/matchStore';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Colors from '../../../Views/Colors/Color';
import { LinearGradient } from 'expo-linear-gradient';
import { RootStackParamList } from '../../../navigation/AppNavigator';

type LikesScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Chat'>;

interface MatchItem {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  age: number;
  location: string;
  distance: number;
  commonInterests: string[];
  matchedAt: Date;
  lastInteraction: Date;
  isSuperLike: boolean;
  status: 'pending' | 'accepted' | 'rejected';
}

const LikesScreen: React.FC = () => {
  const navigation = useNavigation<LikesScreenNavigationProp>();
  const { matches, likes, superLikes, activeTab, setActiveTab } = useMatchStore();

  // Default data
  const defaultMatches: MatchItem[] = [
    {
      id: '1',
      userId: 'user1',
      userName: 'سارة أحمد',
      userAvatar: '',
      age: 25,
      location: 'الرياض',
      distance: 5,
      commonInterests: ['القراءة', 'السفر', 'الموسيقى'],
      matchedAt: new Date(),
      lastInteraction: new Date(),
      isSuperLike: false,
      status: 'accepted'
    },
    {
      id: '2',
      userId: 'user2',
      userName: 'نور محمد',
      userAvatar: '',
      age: 27,
      location: 'جدة',
      distance: 10,
      commonInterests: ['الطبخ', 'الرياضة', 'التصوير'],
      matchedAt: new Date(),
      lastInteraction: new Date(),
      isSuperLike: false,
      status: 'accepted'
    }
  ];

  const defaultLikes: MatchItem[] = [
    {
      id: '3',
      userId: 'user3',
      userName: 'مريم خالد',
      userAvatar: '',
      age: 26,
      location: 'الدمام',
      distance: 15,
      commonInterests: ['الرسم', 'الكتابة', 'السينما'],
      matchedAt: new Date(),
      lastInteraction: new Date(),
      isSuperLike: false,
      status: 'pending'
    }
  ];

  const defaultSuperLikes: MatchItem[] = [
    {
      id: '4',
      userId: 'user4',
      userName: 'لينا عبدالله',
      userAvatar: '',
      age: 24,
      location: 'الرياض',
      distance: 3,
      commonInterests: ['البرمجة', 'التصميم', 'التكنولوجيا'],
      matchedAt: new Date(),
      lastInteraction: new Date(),
      isSuperLike: true,
      status: 'pending'
    }
  ];

  const getActiveList = (): MatchItem[] => {
    switch (activeTab) {
      case 'matches':
        return matches.length > 0 ? matches : defaultMatches;
      case 'likes':
        return likes.length > 0 ? likes : defaultLikes;
      case 'superLikes':
        return superLikes.length > 0 ? superLikes : defaultSuperLikes;
      default:
        return matches.length > 0 ? matches : defaultMatches;
    }
  };

  const renderTabButton = (
    tab: 'matches' | 'likes' | 'superLikes',
    icon: keyof typeof MaterialIcons.glyphMap
  ) => {
    const tabLabels = {
      matches: 'التطابقات',
      likes: 'الإعجابات',
      superLikes: 'المميزة'
    };

    const isActive = activeTab === tab;

    return (
      <Pressable onPress={() => setActiveTab(tab)} flex={1} >
        <Box
          bg={isActive ? Colors.primary : 'transparent'}
     
          py={1.5}
          borderRadius="2xl"
          borderWidth={1}
          borderColor={isActive ? Colors.primary : Colors.primary + '30'}
          style={{
            shadowColor: isActive ? Colors.primary : 'transparent',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: isActive ? 0.2 : 0,
            shadowRadius: 4,
            elevation: isActive ? 4 : 0,
          }}
        >
          <HStack space={1} alignItems="center" justifyContent="center">
            <Box
              bg={isActive ? 'white' : Colors.primary + '20'}
              p={1}
              borderRadius="full"
            >
              <Icon
                as={MaterialIcons}
                name={icon}
                size={3}
                color={isActive ? Colors.primary : Colors.primary}
              />
            </Box>
            <Text
              color={isActive ? 'white' : Colors.primary}
              fontWeight="600"
              fontSize="xs"
            >
              {tabLabels[tab]}
            </Text>
          </HStack>
        </Box>
      </Pressable>
    );
  };

  const renderItem = ({ item }: { item: MatchItem }) => (
    <Pressable mb={4}>
      <Box
        bg="white"
        borderRadius="2xl"
        overflow="hidden"
        style={{
          shadowColor: Colors.primary,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 5,
        }}
      >
        <LinearGradient
          colors={[Colors.primary + '20', 'white']}
          style={{ padding: 16 }}
        >
          <HStack space={4} alignItems="center">
            <Center
              bg={Colors.primary + '20'}
              p={4}
              borderRadius="full"
              style={{
                shadowColor: Colors.primary,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
                elevation: 3,
              }}
            >
              <Icon
                as={MaterialIcons}
                name="person"
                size="xl"
                color={Colors.primary}
              />
            </Center>
            <VStack flex={1}>
              <Text bold fontSize="lg" textAlign="right" color={Colors.text}>
                {item.userName}، {item.age} سنة
              </Text>
              <Text fontSize="sm" color={Colors.mutedText} textAlign="right">
                {item.location} • على بعد {item.distance} كم
              </Text>
              <HStack space={2} mt={2} flexWrap="wrap" justifyContent="flex-end">
                {item.commonInterests.slice(0, 3).map((interest, index) => (
                  <Badge
                    key={index}
                    bg={Colors.primary + '20'}
                    borderRadius="lg"
                    mr={1}
                    mb={1}
                    px={3}
                    py={1}
                  >
                    <Text color={Colors.primary} fontSize="xs" fontWeight="600">
                      {interest}
                    </Text>
                  </Badge>
                ))}
                {item.commonInterests.length > 3 && (
                  <Badge
                    bg="gray.100"
                    borderRadius="lg"
                    mr={1}
                    mb={1}
                    px={3}
                    py={1}
                  >
                    <Text color="gray.600" fontSize="xs" fontWeight="600">
                      +{item.commonInterests.length - 3}
                    </Text>
                  </Badge>
                )}
              </HStack>
            </VStack>
          </HStack>
          <HStack justifyContent="flex-end" mt={4} space={3}>
            <Button
              leftIcon={<Icon as={MaterialIcons} name="chat" size="sm" color="white" />}
              bg={Colors.primary}
              _pressed={{ bg: Colors.primary + '80' }}
              px={6}
              py={3}
              borderRadius="xl"
              onPress={() => navigation.navigate('Chat')}
            >
              <Text color="white" fontWeight="600">محادثة</Text>
            </Button>
            <Button
              leftIcon={<Icon as={MaterialIcons} name="more-vert" size="sm" color={Colors.mutedText} />}
              variant="ghost"
              _pressed={{ bg: 'gray.100' }}
              px={4}
              py={3}
              borderRadius="xl"
            >
              <Text color={Colors.mutedText} fontWeight="600">المزيد</Text>
            </Button>
          </HStack>
        </LinearGradient>
      </Box>
    </Pressable>
  );

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <Box safeAreaTop bg={Colors.background} />
      <ScrollView
        px={4}
        pt={4}
        pb={24}
        showsVerticalScrollIndicator={false}
      >
        <VStack space={6}>
          <Box>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ 
                gap: 8, 
                paddingHorizontal: 4,
                justifyContent: 'center',
                alignItems: 'center',
                flexGrow: 1
              }}
            >
              <HStack space={2} mb={4} justifyContent="center" alignItems="center">
                {renderTabButton('matches', 'favorite')}
                {renderTabButton('likes', 'thumb-up')}
                {renderTabButton('superLikes', 'star')}
              </HStack>
            </ScrollView>
            {getActiveList().map((item) => renderItem({ item }))}
          </Box>
        </VStack>
      </ScrollView>
    </View>
  );
};

export default LikesScreen; 