import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { homeStyles as styles } from '../assets/styling/home';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Strive</Text>
        <Text style={styles.subtitle}>Welcome to your app</Text>
      </View>

      <View style={styles.content}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => router.push('/signup')}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

