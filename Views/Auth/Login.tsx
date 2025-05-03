import React, { useState } from 'react';
import { VStack, Input, Button, Text, Center, Box, Link, HStack, Pressable } from 'native-base';
import Colors from '../Colors/Color';
import { SvgXml } from 'react-native-svg';
import { icons } from '../../assets/icons/Svgs';
import { useNavigation } from '@react-navigation/native';
import { setPassHome } from "../../store/PassHomeSlice";
import { useSelector , useDispatch } from 'react-redux';

const Login = () => {

  const [showPassword, setShowPassword] = useState(false);
    const navigation:any = useNavigation();
    const dispatch = useDispatch()
  return (
    <Center flex={1} bg={Colors.background} px="4">
      <Box w="100%" maxW="300px">
        <VStack space={4}>
            <Center>

        <SvgXml xml={icons.logo} width={150} height={150} />
            </Center>
          <Text fontSize="2xl" fontWeight="bold" color={Colors.primary} textAlign="center">
            تسجيل الدخول
          </Text>

          <Input
            placeholder="اسم المستخدم"
            variant="unstyled"
            bg="transparent"
            borderWidth={1}
            borderColor={Colors.border}
            _focus={{ borderColor: Colors.primary, bg: 'transparent' }}
            fontFamily="Tajawal_400Regular"
            InputLeftElement={
              <Box pl="3">
                <SvgXml xml={icons.user} width={20} height={20} fill={'#C9A460'}/>
              </Box>
            }
          />

          <Input
            placeholder="كلمة المرور"
            variant="unstyled"
            bg="transparent"
            borderWidth={1}
            borderColor={Colors.border}
            _focus={{ borderColor: Colors.primary, bg: 'transparent' }}
            type={showPassword ? 'text' : 'password'}
        
            InputLeftElement={
              <Box pl="3">
                <SvgXml xml={icons.lock} width={20} height={20} fill={'#C9A460'} />
              </Box>
            }
            InputRightElement={
              <Pressable onPress={() => setShowPassword(!showPassword)} pr="3">
          <SvgXml
  xml={(showPassword ? icons.eye_slach : icons.eye).replace(/fill="[^"]*"/g, 'fill="#E5E5E5"')}
  width={20}
  height={20}
/>

              </Pressable>
            }
          />

          <HStack justifyContent="space-between">
            <Link _text={{ color: Colors.mutedText, fontSize: 'sm' }}>
              نسيت اسم المستخدم؟
            </Link>
            <Link _text={{ color: Colors.mutedText, fontSize: 'sm' }}>
              نسيت كلمة المرور؟
            </Link>
          </HStack>

          <Button bg={Colors.primary} _pressed={{ bg: Colors.accent }} borderRadius="md" onPress={()=>dispatch(setPassHome(true))}>
            <Text color="white" fontWeight="bold">
              تسجيل الدخول
            </Text>
          </Button>

          <Button
  variant="outline"
  borderColor={Colors.primary}
  borderRadius="md"
  bg="transparent"
  _text={{ color: Colors.primary }}
  _pressed={{
    bg: 'transparent',
    borderColor: Colors.primary,
  }}
  _focus={{
    bg: 'transparent',
    borderColor: Colors.primary,
  }}
  _hover={{
    bg: 'transparent',
    borderColor: Colors.primary,
  }}
  onPress={() => navigation.navigate('Type')}
>
  <Text color={Colors.primary} fontWeight="bold">
    إنشاء حساب جديد
  </Text>
</Button>

        </VStack>
      </Box>
    </Center>
  );
};

export default Login;
