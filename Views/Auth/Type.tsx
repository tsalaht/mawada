import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import { VStack, Button, Text, Center, Box } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import { icons } from '../../assets/icons/Svgs';
import Colors from '../Colors/Color';

const Type = () => {
  const navigation: any = useNavigation();

  // Animated value for vertical movement
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -20,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 1200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <Box flex={1}>
      <LinearGradient
        colors={[Colors.background, '#f0f0f0']}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1, paddingHorizontal: 24, paddingTop: 60 }}
      >
        <Center>
          <Animated.View style={{ transform: [{ translateY: floatAnim }] }}>
            <SvgXml xml={icons.couple} width={180} height={180} />
          </Animated.View>
        </Center>

        <VStack space={8} mt="10" alignItems="center">
          <Text fontSize="3xl" fontWeight="bold" color={Colors.primary}>
            اختر نوع التسجيل
          </Text>

          <Box width="100%" maxW="full" gap={4}>
            <Button
              bg={Colors.primary}
              _pressed={{ bg: Colors.accent }}
              borderRadius="2xl"
              py="4"
              shadow={4}
              onPress={() => navigation.navigate('Register', { type: 'wife' })}
            >
              <Text color="white" fontSize="md" fontWeight="bold">
                التسجيل كزوجة 
              </Text>
            </Button>

            <Button
              bg={Colors.primary}
              _pressed={{ bg: Colors.accent }}
              borderRadius="2xl"
              py="4"
              shadow={4}
              onPress={() => navigation.navigate('Register', { type: 'husband' })}
            >
              <Text color="white" fontSize="md" fontWeight="bold">
                التسجيل كزوج 
              </Text>
            </Button>
          </Box>
        </VStack>
      </LinearGradient>
    </Box>
  );
};

export default Type;
