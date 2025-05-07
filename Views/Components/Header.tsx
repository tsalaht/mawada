import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import Colors from '../Colors/Color';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
  NotificationScreen: undefined;
  Home: undefined;
  ProfileScreen: undefined;
  ChatScreen: undefined;
  LikesScreen: undefined;
};

type NavigationPropType = NavigationProp<RootStackParamList>;

interface HeaderProps {
  onProfilePress?: () => void;
  showBackButton?: boolean;
  title?: string;
  showNotification?: boolean;
  showProfile?: boolean;
  notificationCount?: number;
}

const Header: React.FC<HeaderProps> = ({ 
  onProfilePress, 
  showBackButton = false, 
  title = 'مرحباً بك',
  showNotification = true,
  showProfile = true,
  notificationCount = 3
}) => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Left Section */}
        <View style={styles.leftSection}>
          {showBackButton ? (
            <TouchableOpacity 
              onPress={() => navigation.goBack()}
              style={styles.iconButton}
            >
              <MaterialIcons name="arrow-back" size={24} color={Colors.text} />
            </TouchableOpacity>
          ) : (
            <View style={styles.welcomeSection}>
              <Text style={styles.welcomeText}>{title}</Text>
              <Text style={styles.subText}>أهلاً وسهلاً بك في تطبيقنا</Text>
            </View>
          )}
        </View>

        {/* Right Section */}
        <View style={styles.rightSection}>
          {showNotification && (
            <TouchableOpacity 
              onPress={() => navigation.navigate('Notification')}
              style={styles.iconButton}
            >
              <MaterialIcons name="notifications" size={24} color={Colors.text} />
              {notificationCount > 0 && (
                <View style={styles.notificationBadge}>
                  <Text style={styles.badgeText}>{notificationCount}</Text>
                </View>
              )}
            </TouchableOpacity>
          )}

          {showProfile && (
        <TouchableOpacity 
        onPress={() => navigation.navigate('ProtectedScreens', { screen: 'حسابي' })}
        style={styles.profileButton}
      >
        <AntDesign name="user" size={22} color={Colors.primary} />
      </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    paddingTop: 10,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  content: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  leftSection: {
    // flex: 1,
  },
  rightSection: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 12,
  },
  welcomeSection: {
    gap: 4,
  },
  welcomeText: {
    fontSize: 24,

    color: Colors.text,
    fontFamily: 'Tajawal_700Bold',
    textAlign: 'right',
  },
  subText: {
    fontSize: 14,
    color: Colors.mutedText,
    fontFamily: 'Tajawal_400Regular',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary + '15',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  notificationBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.background,
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default Header; 