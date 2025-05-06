import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import Colors from '../Colors/Color';

interface HeaderProps {
  onSearch?: (text: string) => void;
  onProfilePress?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch, onProfilePress }) => {
  return (
    <View style={{
      backgroundColor: Colors.background,
      paddingHorizontal: 20,
      paddingTop: 50,
      paddingBottom: 15,
      borderBottomWidth: 1,
      borderBottomColor: Colors.border,
    }}>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15,
      }}>
        <Text style={{
          fontSize: 24,
          fontWeight: '700',
          color: Colors.text,
        }}>
          مرحباً بك
        </Text>
        <TouchableOpacity 
          onPress={onProfilePress}
          style={{
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
          }}
        >
          <AntDesign name="user" size={22} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.surface,
        borderRadius: 12,
        paddingHorizontal: 15,
        height: 45,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
      }}>
        <Ionicons name="search" size={20} color={Colors.mutedText} />
        <TextInput
          placeholder="ابحث عن..."
          placeholderTextColor={Colors.mutedText}
          style={{
            flex: 1,
            marginLeft: 10,
            fontSize: 14,
            color: Colors.text,
            textAlign: 'right',
          }}
          onChangeText={onSearch}
        />
      </View>
    </View>
  );
};

export default Header; 