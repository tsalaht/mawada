import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Switch,
  Modal,
  Alert,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import Colors from '../Colors/Color';
import { format } from 'date-fns';

const RegisterScreen = () => {
  const route = useRoute();
  const navigation: any = useNavigation();
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
          Alert.alert(
            "خطأ",
            "يرجى ملء جميع الحقول المطلوبة في معلومات الحساب"
          );
          return false;
        }
        if (formData.password !== formData.confirmPassword) {
          Alert.alert(
            "خطأ",
            "كلمة المرور وتأكيدها غير متطابقتين"
          );
          return false;
        }
        break;
      case 1: // Personal Details
        if (!formData.dob || !formData.maritalStatus || !formData.nationality || !formData.country || !formData.city) {
          Alert.alert(
            "خطأ",
            "يرجى ملء جميع الحقول المطلوبة في المعلومات الشخصية"
          );
          return false;
        }
        break;
      case 2: // Physical Attributes
        if (!formData.height || !formData.weight || !formData.skinTone || !formData.bodyType) {
          Alert.alert(
            "خطأ",
            "يرجى ملء جميع الحقول المطلوبة في الصفات الجسدية"
          );
          return false;
        }
        break;
      case 3: // Religious & Lifestyle
        if (!formData.religion) {
          Alert.alert(
            "خطأ",
            "يرجى ملء جميع الحقول المطلوبة في الدين ونمط الحياة"
          );
          return false;
        }
        break;
      case 4: // Professional Information
        if (!formData.employment || !formData.education) {
          Alert.alert(
            "خطأ",
            "يرجى ملء جميع الحقول المطلوبة في الوظيفة والدخل"
          );
          return false;
        }
        break;
      case 5: // Additional Information
        if (!formData.describeSelf || !formData.describePartner) {
          Alert.alert(
            "خطأ",
            "يرجى ملء جميع الحقول المطلوبة في نبذة عنك"
          );
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
      Alert.alert(
        "خطأ",
        "يرجى ملء جميع الحقول المطلوبة"
      );
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      Alert.alert(
        "خطأ",
        "كلمة المرور وتأكيدها غير متطابقتين"
      );
      return;
    }
    console.log(formData);
    navigation.navigate('Home');
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.background,
      paddingVertical:40
    },
    gradient: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
      padding: 20,
    },
    header: {
      marginTop: 60,
      marginBottom: 40,
    },
    title: {
      fontSize: 32,
      color: Colors.text,
      marginBottom: 8,
      textAlign: 'right',
      fontFamily: 'Tajawal_700Bold',
    },
    subtitle: {
      fontSize: 16,
      color: Colors.mutedText,
      textAlign: 'right',
      fontFamily: 'Tajawal_500Medium',
    },
    form: {
      gap: 20,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: Colors.surface,
      borderRadius: 12,
      paddingHorizontal: 16,
      borderWidth: 1,
      borderColor: Colors.primary + '20',
      marginBottom: 12,
    },
    input: {
      flex: 1,
      height: 50,
      color: Colors.text,
      fontSize: 16,
      fontFamily: 'Tajawal_500Medium',
      paddingHorizontal: 12,
      textAlign: 'right',
    },
    textArea: {
      flex: 1,
      height: 120,
      color: Colors.text,
      fontSize: 16,
      fontFamily: 'Tajawal_500Medium',
      paddingHorizontal: 12,
      textAlign: 'right',
      textAlignVertical: 'top',
    },
    sectionContainer: {
      flex: 1,
      padding: 16,
    },
    sectionContent: {
      backgroundColor: Colors.background,
      padding: 16,
      borderRadius: 16,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 3,
    },
    sectionTitle: {
      fontSize: 20,
      color: Colors.primary,
      marginBottom: 16,
      textAlign: 'right',
      fontFamily: 'Tajawal_700Bold',
    },
    switchContainer: {
      flexDirection: 'row-reverse',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    switchLabel: {
      fontSize: 16,
      color: Colors.text,
      fontFamily: 'Tajawal_500Medium',
    },
    navigationButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 16,
      backgroundColor: Colors.surface,
      marginBottom:20
    },
    button: {
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 12,
      backgroundColor: Colors.primary,
    },
    buttonText: {
      color: Colors.background,
      fontSize: 16,
      fontFamily: 'Tajawal_700Bold',
    },
    outlineButton: {
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: Colors.primary,
    },
    outlineButtonText: {
      color: Colors.primary,
      fontSize: 16,
      fontFamily: 'Tajawal_700Bold',
    },
    progressContainer: {
      padding: 16,
      marginTop: 16,
    },
    progressText: {
      fontSize: 12,
      color: Colors.mutedText,
      textAlign: 'right',
      marginTop: 4,
      fontFamily: 'Tajawal_500Medium',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      width: '80%',
      backgroundColor: Colors.background,
      borderRadius: 16,
      overflow: 'hidden',
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: Colors.border,
    },
    modalTitle: {
      fontSize: 18,
      color: Colors.text,
      fontFamily: 'Tajawal_700Bold',
    },
    modalBody: {
      maxHeight: 400,
    },
    yearList: {
      padding: 16,
    },
    yearItem: {
      padding: 12,
      borderRadius: 8,
      marginBottom: 8,
    },
    selectedYearItem: {
      backgroundColor: Colors.primary + '20',
    },
    yearText: {
      fontSize: 16,
      color: Colors.text,
      fontFamily: 'Tajawal_500Medium',
      textAlign: 'center',
    },
    selectedYearText: {
      color: Colors.primary,
      fontFamily: 'Tajawal_700Bold',
    },
  });

  const renderProgressBar = () => {
    const totalSteps = 6;
    const progress = Math.floor(((currentIndex + 1) / totalSteps) * 100);
    
    return (
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          {currentIndex + 1} من {totalSteps}
        </Text>
      </View>
    );
  };

  const renderSection = (index: number) => {
    const sections = [
      {
        title: "معلومات الحساب",
        content: (
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <MaterialIcons name="person" size={24} color={Colors.mutedText} />
              <TextInput
                style={styles.input}
                placeholder="الاسم الكامل"
                placeholderTextColor={Colors.mutedText}
                value={formData.fullName}
                onChangeText={(v) => handleChange('fullName', v)}
              />
            </View>
            <View style={styles.inputContainer}>
              <MaterialIcons name="email" size={24} color={Colors.mutedText} />
              <TextInput
                style={styles.input}
                placeholder="البريد الإلكتروني"
                placeholderTextColor={Colors.mutedText}
                value={formData.email}
                onChangeText={(v) => handleChange('email', v)}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            <View style={styles.inputContainer}>
              <MaterialIcons name="phone" size={24} color={Colors.mutedText} />
              <TextInput
                style={styles.input}
                placeholder="رقم الهاتف"
                placeholderTextColor={Colors.mutedText}
                value={formData.phone}
                onChangeText={(v) => handleChange('phone', v)}
                keyboardType="phone-pad"
              />
            </View>
            <View style={styles.inputContainer}>
              <MaterialIcons name="person-outline" size={24} color={Colors.mutedText} />
              <TextInput
                style={styles.input}
                placeholder="اسم المستخدم"
                placeholderTextColor={Colors.mutedText}
                value={formData.username}
                onChangeText={(v) => handleChange('username', v)}
                autoCapitalize="none"
              />
            </View>
            <View style={styles.inputContainer}>
              <MaterialIcons name="lock" size={24} color={Colors.mutedText} />
              <TextInput
                style={styles.input}
                placeholder="كلمة المرور"
                placeholderTextColor={Colors.mutedText}
                value={formData.password}
                onChangeText={(v) => handleChange('password', v)}
                secureTextEntry
              />
            </View>
            <View style={styles.inputContainer}>
              <MaterialIcons name="lock-outline" size={24} color={Colors.mutedText} />
              <TextInput
                style={styles.input}
                placeholder="تأكيد كلمة المرور"
                placeholderTextColor={Colors.mutedText}
                value={formData.confirmPassword}
                onChangeText={(v) => handleChange('confirmPassword', v)}
                secureTextEntry
              />
            </View>
          </View>
        )
      },
      {
        title: "المعلومات الشخصية",
        content: (
          <View style={styles.form}>
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <View style={styles.inputContainer}>
                <MaterialIcons name="date-range" size={24} color={Colors.mutedText} />
                <TextInput
                  style={styles.input}
                  value={format(formData.dob, 'dd/MM/yyyy')}
                  readOnly
                />
              </View>
            </TouchableOpacity>
            {renderDatePicker()}
            <View style={styles.inputContainer}>
              <MaterialIcons name="person" size={24} color={Colors.mutedText} />
              <TextInput
                style={styles.input}
                placeholder="العمر"
                value={formData.age}
                readOnly
                editable={false}
              />
            </View>
            <View style={styles.inputContainer}>
              <MaterialIcons name="group" size={24} color={Colors.mutedText} />
              <TextInput
                style={styles.input}
                placeholder="الحالة الاجتماعية"
                value={formData.maritalStatus}
                onChangeText={(v) => handleChange('maritalStatus', v)}
              />
            </View>
            {formData.maritalStatus !== 'single' && (
              <View style={styles.inputContainer}>
                <MaterialIcons name="child-care" size={24} color={Colors.mutedText} />
                <TextInput
                  style={styles.input}
                  placeholder="عدد الأطفال"
                  value={formData.children}
                  onChangeText={(v) => handleChange('children', v)}
                />
              </View>
            )}
            <View style={styles.inputContainer}>
              <MaterialIcons name="flag" size={24} color={Colors.mutedText} />
              <TextInput
                style={styles.input}
                placeholder="الجنسية"
                value={formData.nationality}
                onChangeText={(v) => handleChange('nationality', v)}
              />
            </View>
            <View style={styles.inputContainer}>
              <MaterialIcons name="location-on" size={24} color={Colors.mutedText} />
              <TextInput
                style={styles.input}
                placeholder="البلد"
                value={formData.country}
                onChangeText={(v) => handleChange('country', v)}
              />
            </View>
            <View style={styles.inputContainer}>
              <MaterialIcons name="location-on" size={24} color={Colors.mutedText} />
              <TextInput
                style={styles.input}
                placeholder="المدينة"
                value={formData.city}
                onChangeText={(v) => handleChange('city', v)}
              />
            </View>
          </View>
        )
      },
      {
        title: "الصفات الجسدية",
        content: (
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <MaterialIcons name="height" size={24} color={Colors.mutedText} />
              <TextInput
                style={styles.input}
                placeholder="الطول (سم)"
                value={formData.height}
                onChangeText={(v) => handleChange('height', v)}
              />
            </View>
            <View style={styles.inputContainer}>
              <MaterialIcons name="monitor-weight" size={24} color={Colors.mutedText} />
              <TextInput
                style={styles.input}
                placeholder="الوزن (كجم)"
                value={formData.weight}
                onChangeText={(v) => handleChange('weight', v)}
              />
            </View>
            <View style={styles.inputContainer}>
              <MaterialIcons name="face" size={24} color={Colors.mutedText} />
              <TextInput
                style={styles.input}
                placeholder="لون البشرة"
                value={formData.skinTone}
                onChangeText={(v) => handleChange('skinTone', v)}
              />
            </View>
            <View style={styles.inputContainer}>
              <MaterialIcons name="fitness-center" size={24} color={Colors.mutedText} />
              <TextInput
                style={styles.input}
                placeholder="نوع الجسم"
                value={formData.bodyType}
                onChangeText={(v) => handleChange('bodyType', v)}
              />
            </View>
          </View>
        )
      },
      {
        title: "الدين ونمط الحياة",
        content: (
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <MaterialIcons name="group" size={24} color={Colors.mutedText} />
              <TextInput
                style={styles.input}
                placeholder="الديانة"
                value={formData.religion}
                onChangeText={(v) => handleChange('religion', v)}
              />
            </View>
            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>هل تصلي بانتظام؟</Text>
              <Switch
                value={formData.pray}
                onValueChange={(v) => handleChange('pray', v)}
                trackColor={{ false: Colors.border, true: Colors.primary }}
              />
            </View>
            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>هل تدخن؟</Text>
              <Switch
                value={formData.smoker}
                onValueChange={(v) => handleChange('smoker', v)}
                trackColor={{ false: Colors.border, true: Colors.primary }}
              />
            </View>
            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>هل تتناول الكحول؟</Text>
              <Switch
                value={formData.alcohol}
                onValueChange={(v) => handleChange('alcohol', v)}
                trackColor={{ false: Colors.border, true: Colors.primary }}
              />
            </View>
            {isHusband && (
              <View style={styles.switchContainer}>
                <Text style={styles.switchLabel}>هل لديك لحية؟</Text>
                <Switch
                  value={formData.beard}
                  onValueChange={(v) => handleChange('beard', v)}
                  trackColor={{ false: Colors.border, true: Colors.primary }}
                />
              </View>
            )}
            {isWife && (
              <View style={styles.switchContainer}>
                <Text style={styles.switchLabel}>هل ترتدين الحجاب؟</Text>
                <Switch
                  value={formData.hijab}
                  onValueChange={(v) => handleChange('hijab', v)}
                  trackColor={{ false: Colors.border, true: Colors.primary }}
                />
              </View>
            )}
          </View>
        )
      },
      {
        title: "الوظيفة والدخل",
        content: (
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <MaterialIcons name="work" size={24} color={Colors.mutedText} />
              <TextInput
                style={styles.input}
                placeholder="الحالة الوظيفية"
                value={formData.employment}
                onChangeText={(v) => handleChange('employment', v)}
              />
            </View>
            <View style={styles.inputContainer}>
              <MaterialIcons name="work" size={24} color={Colors.mutedText} />
              <TextInput
                style={styles.input}
                placeholder="الوظيفة"
                value={formData.job}
                onChangeText={(v) => handleChange('job', v)}
              />
            </View>
            <View style={styles.inputContainer}>
              <MaterialIcons name="attach-money" size={24} color={Colors.mutedText} />
              <TextInput
                style={styles.input}
                placeholder="الدخل الشهري"
                value={formData.income}
                onChangeText={(v) => handleChange('income', v)}
              />
            </View>
            <View style={styles.inputContainer}>
              <MaterialIcons name="school" size={24} color={Colors.mutedText} />
              <TextInput
                style={styles.input}
                placeholder="المستوى التعليمي"
                value={formData.education}
                onChangeText={(v) => handleChange('education', v)}
              />
            </View>
          </View>
        )
      },
      {
        title: "نبذة عنك",
        content: (
          <View style={styles.form}>
            <TextInput
              style={styles.textArea}
              placeholder="صف نفسك"
              value={formData.describeSelf}
              onChangeText={(v) => handleChange('describeSelf', v)}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
            <TextInput
              style={styles.textArea}
              placeholder="صف شريك حياتك المثالي"
              value={formData.describePartner}
              onChangeText={(v) => handleChange('describePartner', v)}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
        )
      },
    ];

    const section = sections[index];
    if (!section) return null;

    return (
      <View style={styles.sectionContainer}>
        <View style={styles.sectionContent}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          {section.content}
        </View>
      </View>
    );
  };

  const renderDatePicker = () => {
    return (
      <Modal
        visible={showDatePicker}
        transparent
        animationType="slide"
        onRequestClose={() => setShowDatePicker(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>اختر تاريخ الميلاد</Text>
              <TouchableOpacity onPress={() => setShowDatePicker(false)}>
                <MaterialIcons name="close" size={24} color={Colors.text} />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalBody}>
              <View style={styles.yearList}>
                {Array.from({ length: 100 }, (_, i) => {
                  const year = new Date().getFullYear() - i;
                  return (
                    <TouchableOpacity
                      key={year}
                      onPress={() => {
                        const newDate = new Date(formData.dob);
                        newDate.setFullYear(year);
                        handleDateChange(newDate);
                      }}
                      style={[
                        styles.yearItem,
                        formData.dob.getFullYear() === year && styles.selectedYearItem
                      ]}
                    >
                      <Text style={[
                        styles.yearText,
                        formData.dob.getFullYear() === year && styles.selectedYearText
                      ]}>
                        {year}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  };

  return (

      <LinearGradient
        colors={[Colors.background, Colors.surface]}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {renderProgressBar()}
          {renderSection(currentIndex)}
        </ScrollView>
        <View style={styles.navigationButtons}>
          {currentIndex > 0 && (
            <TouchableOpacity
              style={styles.outlineButton}
              onPress={handlePrev}
            >
              <Text style={styles.outlineButtonText}>السابق</Text>
            </TouchableOpacity>
          )}
          {currentIndex < 5 ? (
            <TouchableOpacity
              style={styles.button}
              onPress={handleNext}
            >
              <Text style={styles.buttonText}>التالي</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit}
            >
              <Text style={styles.buttonText}>تسجيل</Text>
            </TouchableOpacity>
          )}
        </View>
      </LinearGradient>

  );
};

export default RegisterScreen;