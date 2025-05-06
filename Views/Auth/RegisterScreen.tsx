import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  VStack,
  Input,
  Button,
  Text,
  Select,
  TextArea,
  Switch,
  ScrollView,
  Slider,
  HStack,
  FormControl,
  Stack,
  Progress,
  Icon,
  useToast,
  Pressable,
  Modal,
} from 'native-base';
import { useRoute, useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Platform, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import Colors from '../Colors/Color';
import { AntDesign } from '@expo/vector-icons';
import { format } from 'date-fns';

const RegisterScreen = () => {
  const route = useRoute();
  const navigation: any = useNavigation();
  const toast = useToast();
  const { type }: any = route.params || {};
  const isHusband = type === 'husband';
  const isWife = type === 'wife';
  const swiperRef = useRef<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isValidating, setIsValidating] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(0);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    confirmPassword: '',
    dob: new Date(),
    age: '',
    maritalStatus: '',
    children: '',
    nationality: '',
    country: '',
    city: '',
    height: '',
    weight: '',
    skinTone: '',
    bodyType: '',
    religion: '',
    pray: false,
    smoker: false,
    alcohol: false,
    beard: false,
    hijab: false,
    employment: '',
    job: '',
    income: '',
    education: '',
    lookingFor: '',
    preferredAgeRange: { min: 18, max: 40 },
    preferredHeightRange: { min: 150, max: 190 },
    preferredEducation: '',
    preferredReligious: '',
    describeSelf: '',
    describePartner: '',
  });

  const [showDatePicker, setShowDatePicker] = useState(false);

  // Auto-calculate age based on DOB
  useEffect(() => {
    const today = new Date();
    const birthDate = new Date(formData.dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    setFormData(prev => ({ ...prev, age: age.toString() }));
  }, [formData.dob]);

  const handleChange = (name: string, value: any) => {
    if (name === 'preferredAgeRange' || name === 'preferredHeightRange') {
      setFormData(prev => ({ ...prev, [name]: { ...prev[name], ...value } }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleDateChange = (selectedDate: Date) => {
    setFormData(prev => ({ ...prev, dob: selectedDate }));
    setShowDatePicker(false);
  };

  const validateCurrentSection = () => {
    switch (currentIndex) {
      case 0: // Account Information
        if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
          toast.show({
            title: "خطأ",
            description: "يرجى ملء جميع الحقول المطلوبة في معلومات الحساب",
            variant: "solid",
            placement: "top",
          });
          return false;
        }
        if (formData.password !== formData.confirmPassword) {
          toast.show({
            title: "خطأ",
            description: "كلمة المرور وتأكيدها غير متطابقتين",
            variant: "solid",
            placement: "top",
          });
          return false;
        }
        break;
      case 1: // Personal Details
        if (!formData.dob || !formData.maritalStatus || !formData.nationality || !formData.country || !formData.city) {
          toast.show({
            title: "خطأ",
            description: "يرجى ملء جميع الحقول المطلوبة في المعلومات الشخصية",
            variant: "solid",
            placement: "top",
          });
          return false;
        }
        break;
      case 2: // Physical Attributes
        if (!formData.height || !formData.weight || !formData.skinTone || !formData.bodyType) {
          toast.show({
            title: "خطأ",
            description: "يرجى ملء جميع الحقول المطلوبة في الصفات الجسدية",
            variant: "solid",
            placement: "top",
          });
          return false;
        }
        break;
      case 3: // Religious & Lifestyle
        if (!formData.religion) {
          toast.show({
            title: "خطأ",
            description: "يرجى ملء جميع الحقول المطلوبة في الدين ونمط الحياة",
            variant: "solid",
            placement: "top",
          });
          return false;
        }
        break;
      case 4: // Professional Information
        if (!formData.employment || !formData.education) {
          toast.show({
            title: "خطأ",
            description: "يرجى ملء جميع الحقول المطلوبة في الوظيفة والدخل",
            variant: "solid",
            placement: "top",
          });
          return false;
        }
        break;
      case 5: // Additional Information
        if (!formData.describeSelf || !formData.describePartner) {
          toast.show({
            title: "خطأ",
            description: "يرجى ملء جميع الحقول المطلوبة في نبذة عنك",
            variant: "solid",
            placement: "top",
          });
          return false;
        }
        break;
    }
    return true;
  };

  const handleNext = () => {
    if (isValidating) return;
    
    setIsValidating(true);
    const isValid = validateCurrentSection();
    
    if (isValid) {
      setCurrentIndex(prev => prev + 1);
    }
    
    setIsValidating(false);
  };

  const handlePrev = () => {
    if (isValidating) return;
    
    setIsValidating(true);
    setCurrentIndex(prev => prev - 1);
    setIsValidating(false);
  };

  const handleSubmit = () => {
    if (!formData.fullName || !formData.email || !formData.password) {
      toast.show({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "solid",
        placement: "top",
      });
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.show({
        title: "خطأ",
        description: "كلمة المرور وتأكيدها غير متطابقتين",
        variant: "solid",
        placement: "top",
      });
      return;
    }
    console.log(formData);
    navigation.navigate('Home');
  };

  const inputStyle = {
    bg: Colors.background,
    borderRadius: 'lg',
    borderColor: Colors.border,
    _focus: {
      borderColor: Colors.primary,
      bg: Colors.background,
      _android: {
        borderColor: Colors.primary,
      },
      _ios: {
        borderColor: Colors.primary,
      },
    },
    _hover: {
      borderColor: Colors.border,
      bg: Colors.background,
    },
    _input: {
      selectionColor: Colors.primary,
    },
  };

  const renderProgressBar = () => {
    const totalSteps = 6;
    const progress = Math.floor(((currentIndex + 1) / totalSteps) * 100);
    
    return (
      <Box px={4} py={4} mt={4}>
        <Progress value={progress} colorScheme={Colors.primary} size="sm" bg={Colors.border} />
        <Text fontSize="xs" color={Colors.mutedText} textAlign="right" mt={1}>
          {currentIndex + 1} من {totalSteps}
        </Text>
      </Box>
    );
  };

  const renderNavigationButtons = () => {
    return (
      <HStack space={4} justifyContent="space-between" px={4} py={4} bg={Colors.surface}>
        <Button
          variant="outline"
          leftIcon={<Icon as={AntDesign} name="arrowright" size="sm" color={Colors.primary} />}
          onPress={handlePrev}
          isDisabled={currentIndex === 0}
          borderColor={Colors.primary}
          _text={{ color: Colors.primary }}
          _pressed={{ bg: Colors.surface }}
        >
          السابق
        </Button>
        {currentIndex === 5 ? (
          <Button
            bg={Colors.primary}
            _pressed={{ bg: Colors.accent }}
            onPress={handleSubmit}
            _text={{ color: Colors.background }}
          >
            تسجيل
          </Button>
        ) : (
          <Button
            variant="outline"
            rightIcon={<Icon as={AntDesign} name="arrowleft" size="sm" color={Colors.primary} />}
            onPress={handleNext}
            borderColor={Colors.primary}
            _text={{ color: Colors.primary }}
            _pressed={{ bg: Colors.surface }}
          >
            التالي
          </Button>
        )}
      </HStack>
    );
  };

  const renderSection = (index: number) => {
    const sections = [
      {
        title: "معلومات الحساب",
        content: (
          <FormControl>
            <Input
              placeholder="الاسم الكامل"
              onChangeText={(v) => handleChange('fullName', v)}
              {...inputStyle}
              mb={3}
              textAlign="right"
              size="lg"
            />
            <Input
              placeholder="البريد الإلكتروني"
              onChangeText={(v) => handleChange('email', v)}
              {...inputStyle}
              mb={3}
              textAlign="right"
              size="lg"
            />
            <Input
              placeholder="رقم الهاتف"
              onChangeText={(v) => handleChange('phone', v)}
              {...inputStyle}
              mb={3}
              textAlign="right"
              size="lg"
            />
            <Input
              placeholder="اسم المستخدم"
              onChangeText={(v) => handleChange('username', v)}
              {...inputStyle}
              mb={3}
              textAlign="right"
              size="lg"
            />
            <Input
              placeholder="كلمة المرور"
              type="password"
              onChangeText={(v) => handleChange('password', v)}
              {...inputStyle}
              mb={3}
              textAlign="right"
              size="lg"
            />
            <Input
              placeholder="تأكيد كلمة المرور"
              type="password"
              onChangeText={(v) => handleChange('confirmPassword', v)}
              {...inputStyle}
              textAlign="right"
              size="lg"
            />
          </FormControl>
        )
      },
      {
        title: "المعلومات الشخصية",
        content: (
          <FormControl>
            <Pressable onPress={() => setShowDatePicker(true)}>
              <Input
                value={format(formData.dob, 'dd/MM/yyyy')}
                isReadOnly
                rightElement={
                  <Icon
                    as={AntDesign}
                    name="calendar"
                    size={5}
                    mr={2}
                    color="gray.400"
                  />
                }
              />
            </Pressable>
            {renderDatePicker()}
            <Input
              placeholder="العمر"
              value={formData.age}
              isReadOnly
              bg="gray.100"
              borderRadius="lg"
              mb={3}
              textAlign="right"
              _focus={{
                borderColor: 'transparent',
                backgroundColor: 'gray.100',
              }}
            />
            <Select
              selectedValue={formData.maritalStatus}
              placeholder="الحالة الاجتماعية"
              onValueChange={(v) => handleChange('maritalStatus', v)}
              bg="white"
              borderRadius="lg"
              mb={3}
              textAlign="right"
            >
              <Select.Item label="أعزب" value="single" />
              <Select.Item label="متزوج" value="married" />
              <Select.Item label="مطلق" value="divorced" />
              <Select.Item label="أرمل" value="widowed" />
            </Select>
            {formData.maritalStatus !== 'single' && (
              <Input
                placeholder="عدد الأطفال"
                value={formData.children}
                onChangeText={(v) => handleChange('children', v)}
                {...inputStyle}
                mb={3}
                textAlign="right"
              />
            )}
            <Select
              selectedValue={formData.nationality}
              placeholder="الجنسية"
              onValueChange={(v) => handleChange('nationality', v)}
              bg="white"
              borderRadius="lg"
              mb={3}
              textAlign="right"
            >
              <Select.Item label="سعودي" value="saudi" />
              <Select.Item label="مصري" value="egyptian" />
              <Select.Item label="إماراتي" value="emirati" />
            </Select>
            <Select
              selectedValue={formData.country}
              placeholder="البلد"
              onValueChange={(v) => handleChange('country', v)}
              bg="white"
              borderRadius="lg"
              mb={3}
              textAlign="right"
            >
              <Select.Item label="السعودية" value="saudi_arabia" />
              <Select.Item label="مصر" value="egypt" />
              <Select.Item label="الإمارات" value="uae" />
            </Select>
            <Select
              selectedValue={formData.city}
              placeholder="المدينة"
              onValueChange={(v) => handleChange('city', v)}
              bg="white"
              borderRadius="lg"
              textAlign="right"
            >
              <Select.Item label="الرياض" value="riyadh" />
              <Select.Item label="جدة" value="jeddah" />
              <Select.Item label="القاهرة" value="cairo" />
            </Select>
          </FormControl>
        )
      },
      {
        title: "الصفات الجسدية",
        content: (
          <FormControl>
            <Select
              selectedValue={formData.height}
              placeholder="الطول (سم)"
              onValueChange={(v) => handleChange('height', v)}
              bg="white"
              borderRadius="lg"
              mb={3}
              textAlign="right"
            >
              <Select.Item label="150 سم" value="150" />
              <Select.Item label="160 سم" value="160" />
              <Select.Item label="170 سم" value="170" />
              <Select.Item label="180 سم" value="180" />
            </Select>
            <Input
              placeholder="الوزن (كجم)"
              value={formData.weight}
              onChangeText={(v) => handleChange('weight', v)}
              {...inputStyle}
              mb={3}
              textAlign="right"
            />
            <Select
              selectedValue={formData.skinTone}
              placeholder="لون البشرة"
              onValueChange={(v) => handleChange('skinTone', v)}
              bg="white"
              borderRadius="lg"
              mb={3}
              textAlign="right"
            >
              <Select.Item label="فاتح جدًا" value="very_fair" />
              <Select.Item label="فاتح" value="fair" />
              <Select.Item label="قمحي" value="wheatish" />
              <Select.Item label="داكن" value="dark" />
            </Select>
            <Select
              selectedValue={formData.bodyType}
              placeholder="نوع الجسم"
              onValueChange={(v) => handleChange('bodyType', v)}
              bg="white"
              borderRadius="lg"
              textAlign="right"
            >
              <Select.Item label="نحيف" value="slim" />
              <Select.Item label="رياضي" value="athletic" />
              <Select.Item label="متوسط" value="average" />
              <Select.Item label="ثقيل" value="heavy" />
            </Select>
          </FormControl>
        )
      },
      {
        title: "الدين ونمط الحياة",
        content: (
          <FormControl>
            <Select
              selectedValue={formData.religion}
              placeholder="الديانة"
              onValueChange={(v) => handleChange('religion', v)}
              bg="white"
              borderRadius="lg"
              mb={3}
              textAlign="right"
            >
              <Select.Item label="الإسلام" value="islam" />
              <Select.Item label="المسيحية" value="christianity" />
            </Select>
            <HStack justifyContent="space-between" alignItems="center" mb={3} flexDirection={'row-reverse'}>
              <Text>هل تصلي بانتظام؟</Text>
              <Switch
                isChecked={formData.pray}
                onToggle={(v) => handleChange('pray', v)}
                onTrackColor={Colors.primary}
              />
            </HStack>
            <HStack justifyContent="space-between" alignItems="center" mb={3} flexDirection={'row-reverse'}>
              <Text>هل تدخن؟</Text>
              <Switch
                isChecked={formData.smoker}
                onToggle={(v) => handleChange('smoker', v)}
                onTrackColor={Colors.primary}
              />
            </HStack>
            <HStack justifyContent="space-between" alignItems="center" mb={3} flexDirection={'row-reverse'}>
              <Text>هل تتناول الكحول؟</Text>
              <Switch
                isChecked={formData.alcohol}
                onToggle={(v) => handleChange('alcohol', v)}
                onTrackColor={Colors.primary}
              />
            </HStack>
            {isHusband && (
              <HStack justifyContent="space-between" alignItems="center" mb={3} flexDirection={'row-reverse'}>
                <Text>هل لديك لحية؟</Text>
                <Switch
                  isChecked={formData.beard}
                  onToggle={(v) => handleChange('beard', v)}
                  onTrackColor={Colors.primary}
                />
              </HStack>
            )}
            {isWife && (
              <HStack justifyContent="space-between" alignItems="center" flexDirection={'row-reverse'}>
                <Text>هل ترتدين الحجاب؟</Text>
                <Switch
                  isChecked={formData.hijab}
                  onToggle={(v) => handleChange('hijab', v)}
                  onTrackColor={Colors.primary}
                />
              </HStack>
            )}
          </FormControl>
        )
      },
      {
        title: "الوظيفة والدخل",
        content: (
          <FormControl>
            <Select
              selectedValue={formData.employment}
              placeholder="الحالة الوظيفية"
              onValueChange={(v) => handleChange('employment', v)}
              bg="white"
              borderRadius="lg"
              mb={3}
              textAlign="right"
            >
              <Select.Item label="موظف" value="employed" />
              <Select.Item label="عمل حر" value="self_employed" />
              <Select.Item label="غير موظف" value="unemployed" />
              <Select.Item label="طالب" value="student" />
            </Select>
            <Input
              placeholder="الوظيفة"
              value={formData.job}
              onChangeText={(v) => handleChange('job', v)}
              {...inputStyle}
              mb={3}
              textAlign="right"
            />
            <Input
              placeholder="الدخل الشهري"
              value={formData.income}
              onChangeText={(v) => handleChange('income', v)}
              {...inputStyle}
              mb={3}
              textAlign="right"
            />
            <Select
              selectedValue={formData.education}
              placeholder="المستوى التعليمي"
              onValueChange={(v) => handleChange('education', v)}
              bg="white"
              borderRadius="lg"
              textAlign="right"
            >
              <Select.Item label="ثانوية" value="high_school" />
              <Select.Item label="بكالوريوس" value="bachelor" />
              <Select.Item label="ماجستير" value="master" />
              <Select.Item label="دكتوراه" value="phd" />
            </Select>
          </FormControl>
        )
      },
      {
        title: "نبذة عنك",
        content: (
          <FormControl>
            <TextArea
              height={24}
              placeholder="صف نفسك"
              value={formData.describeSelf}
              onChangeText={(v) => handleChange('describeSelf', v)}
              bg="white"
              borderRadius="lg"
              mb={3}
              textAlign="right"
              autoCompleteType="off"
              onTextInput={() => {}}
              tvParallaxProperties={{}}
              _focus={{
                borderColor: Colors.primary,
                backgroundColor: 'white',
              }}
            />
            <TextArea
              height={24}
              placeholder="صف شريك حياتك المثالي"
              value={formData.describePartner}
              onChangeText={(v) => handleChange('describePartner', v)}
              bg="white"
              borderRadius="lg"
              textAlign="right"
              autoCompleteType="off"
              onTextInput={() => {}}
              tvParallaxProperties={{}}
              _focus={{
                borderColor: Colors.primary,
                backgroundColor: 'white',
              }}
            />
          </FormControl>
        )
      },
    ];

    const section = sections[index];
    if (!section) return null;

    return (
      <Box flex={1} px={4} py={4}>
        <Box bg={Colors.background} p={4} borderRadius="xl" shadow={2}>
          <Text bold fontSize="lg" color={Colors.primary} mb={4} textAlign={'right'}>
            {section.title}
          </Text>
          {section.content}
        </Box>
      </Box>
    );
  };

  const renderDatePicker = () => {
    return (
      <Modal isOpen={showDatePicker} onClose={() => setShowDatePicker(false)}>
        <Modal.Content>
          <Modal.Header>Select Date of Birth</Modal.Header>
          <Modal.Body>
            <ScrollView>
              <VStack space={4}>
                {Array.from({ length: 100 }, (_, i) => {
                  const year = new Date().getFullYear() - i;
                  return (
                    <Pressable
                      key={year}
                      onPress={() => {
                        const newDate = new Date(formData.dob);
                        newDate.setFullYear(year);
                        handleDateChange(newDate);
                      }}
                      p={2}
                      bg={formData.dob.getFullYear() === year ? "primary.100" : "white"}
                    >
                      <Text>{year}</Text>
                    </Pressable>
                  );
                })}
              </VStack>
            </ScrollView>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    );
  };

  return (
    <LinearGradient
      colors={[Colors.background, Colors.surface]}
      start={{ x: 0.1, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      {renderProgressBar()}
      <Box flex={1}>
        {renderSection(currentIndex)}
      </Box>
      {renderNavigationButtons()}
    </LinearGradient>
  );
};

export default RegisterScreen;