import React from 'react';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import AuthPages from './Auth/Index';
import ProtectedScreens from './app/Index';

const Screens = () => {
  const passHome = useSelector((state: RootState) => state.passHome.value);
  return passHome ? <ProtectedScreens /> : <AuthPages />;
};

const styles = StyleSheet.create({});

export default Screens;
