import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../../../Views/Colors/Color';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ProfileStackParamList } from '../../../navigation/AppNavigator';

type UpgradeScreenNavigationProp = StackNavigationProp<ProfileStackParamList>;

interface Plan {
  id: string;
  title: string;
  price: string;
  duration: string;
  features: string[];
  isPopular?: boolean;
}

const plans: Plan[] = [
  {
    id: '1',
    title: 'الخطة الأساسية',
    price: '29.99',
    duration: 'شهرياً',
    features: [
      'وصول غير محدود للمحادثات',
      'إمكانية إرسال الصور',
      'دعم العملاء على مدار الساعة',
      'إشعارات فورية',
    ],
  },
  {
    id: '2',
    title: 'الخطة المميزة',
    price: '49.99',
    duration: 'شهرياً',
    features: [
      'كل مميزات الخطة الأساسية',
      'إمكانية إرسال الملفات',
      'ميزة البحث المتقدم',
      'إمكانية إضافة ملاحظات',
      'دعم متميز',
    ],
    isPopular: true,
  },
  {
    id: '3',
    title: 'الخطة الاحترافية',
    price: '99.99',
    duration: 'شهرياً',
    features: [
      'كل مميزات الخطة المميزة',
      'إمكانية إجراء مكالمات صوتية',
      'إمكانية إجراء مكالمات فيديو',
      'تخزين غير محدود',
      'دعم فوري على مدار الساعة',
      'إمكانية إضافة مستخدمين إضافيين',
    ],
  },
];

const Upgrade: React.FC = () => {
  const navigation = useNavigation<UpgradeScreenNavigationProp>();

  const handleSubscribe = (planId: string) => {
    console.log('Subscribing to plan:', planId);
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[Colors.primary + '20', Colors.background]}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={24} color={Colors.primary} />
          </TouchableOpacity>
          <View style={styles.headerText}>
            <Text style={styles.title}>ترقية الحساب</Text>
            <Text style={styles.subtitle}>اختر الخطة المناسبة لك</Text>
          </View>
        </View>
        <ScrollView style={styles.scrollView}>
          <View style={styles.plansContainer}>
            {plans.map((plan) => (
              <TouchableOpacity
                key={plan.id}
                style={[
                  styles.planCard,
                  plan.isPopular && styles.popularPlan,
                ]}
                onPress={() => handleSubscribe(plan.id)}
              >
                {plan.isPopular && (
                  <View style={styles.popularBadge}>
                    <Text style={styles.popularText}>الأكثر شعبية</Text>
                  </View>
                )}
                <Text style={styles.planTitle}>{plan.title}</Text>
                <View style={styles.priceContainer}>
                  <Text style={styles.price}>{plan.price}</Text>
                  <Text style={styles.duration}> {plan.duration}</Text>
                </View>
                <View style={styles.featuresContainer}>
                  {plan.features.map((feature, index) => (
                    <View key={index} style={styles.featureRow}>
                      <MaterialIcons
                        name="check-circle"
                        size={20}
                        color={Colors.primary}
                      />
                      <Text style={styles.featureText}>{feature}</Text>
                    </View>
                  ))}
                </View>
                <TouchableOpacity
                  style={[
                    styles.subscribeButton,
                    plan.isPopular && styles.popularButton,
                  ]}
                  onPress={() => handleSubscribe(plan.id)}
                >
                  <Text
                    style={{
                      ...styles.subscribeText,
                      color: plan.isPopular ? 'white' : undefined,
                    }}
                  >
                    اشترك الآن
                  </Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  gradient: {
    flex: 1,
    paddingVertical: 40,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 20,
    zIndex: 1,
  },
  headerText: {
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    color: Colors.text,
    marginBottom: 8,
    fontFamily: 'Tajawal_700Bold',
  },
  subtitle: {
    fontSize: 16,
    color: Colors.mutedText,
    marginBottom: 20,
    fontFamily: 'Tajawal_500Medium',
  },
  plansContainer: {
    padding: 16,
    gap: 20,
  },
  planCard: {
    backgroundColor: Colors.background,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.primary + '20',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  popularPlan: {
    borderColor: Colors.primary,
    borderWidth: 2,
  },
  popularBadge: {
    position: 'absolute',
    top: -12,
    right: 20,
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  popularText: {
    color: Colors.background,
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'Tajawal_700Bold',
  },
  planTitle: {
    fontSize: 20,
    color: Colors.text,
    marginBottom: 12,
    textAlign: 'right',
    fontFamily: 'Tajawal_700Bold',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 20,
    justifyContent: 'flex-end',
  },
  price: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.primary,
    fontFamily: 'Tajawal_700Bold',
  },
  duration: {
    fontSize: 16,
    color: Colors.mutedText,
    marginRight: 4,
    fontFamily: 'Tajawal_500Medium',
  },
  featuresContainer: {
    marginBottom: 20,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  featureText: {
    fontSize: 14,
    color: Colors.text,
    flex: 1,
    textAlign: 'right',
    fontFamily: 'Tajawal_500Medium',
  },
  subscribeButton: {
    backgroundColor: Colors.primary + '15',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  popularButton: {
    backgroundColor: Colors.primary,
  },
  subscribeText: {
    color: Colors.primary,
    fontSize: 16,
    fontFamily: 'Tajawal_700Bold',
  },
});

export default Upgrade;