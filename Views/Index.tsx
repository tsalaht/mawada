import React from 'react';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import AuthPages from './Auth/Index';
import Screens from '../Views/app/Screens';

const MainScreens = () => {
  const passHome = useSelector((state: RootState) => state.passHome.value);
  return passHome ? <Screens /> : <AuthPages />;
};

const styles = StyleSheet.create({});

export default MainScreens;
