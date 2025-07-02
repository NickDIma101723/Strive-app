import React, { useEffect, useRef } from 'react'
import { View, Text, StyleSheet, Animated } from 'react-native'
import { Button } from '../ui/Button'
import { AppState } from '../../types/index'

interface WelcomeScreenProps {
  onNavigate: (state: AppState) => void
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onNavigate }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideUpAnim = useRef(new Animated.Value(50)).current
  const slideDownAnim = useRef(new Animated.Value(-30)).current
  const scaleAnim = useRef(new Animated.Value(0.8)).current

  useEffect(() => {
    // Sequential animations
    Animated.sequence([
      // Title slide down and fade in
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(slideDownAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
      // Buttons slide up
      Animated.timing(slideUpAnim, {
        toValue: 0,
        duration: 600,
        delay: 200,
        useNativeDriver: true,
      }),
    ]).start()
  }, [fadeAnim, slideUpAnim, slideDownAnim, scaleAnim])

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Animated.View 
          style={[
            styles.header,
            {
              opacity: fadeAnim,
              transform: [
                { translateY: slideDownAnim },
                { scale: scaleAnim }
              ]
            }
          ]}
        >
          <Text style={styles.title}>Stripe</Text>
          <View style={styles.divider} />
          <Text style={styles.subtitle}>School Rooster</Text>
        </Animated.View>

        <Animated.View 
          style={[
            styles.buttonContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideUpAnim }]
            }
          ]}
        >
          <Button
            onPress={() => onNavigate("login")}
            variant="outline"
            style={styles.button}
          >
            <Text style={styles.buttonText}>Log In</Text>
          </Button>
          <Button
            onPress={() => onNavigate("signup")}
            variant="outline"
            style={styles.button}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </Button>
        </Animated.View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  content: {
    width: '100%',
    maxWidth: 384,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    fontSize: 60,
    fontWeight: '300',
    color: '#ffffff',
    letterSpacing: 2,
    marginBottom: 24,
  },
  divider: {
    width: 64,
    height: 1,
    backgroundColor: '#ffffff',
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '300',
    color: '#9ca3af',
  },
  buttonContainer: {
    width: '100%',
    gap: 16,
  },
  button: {
    borderColor: '#6b7280',
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '400',
  },
})
