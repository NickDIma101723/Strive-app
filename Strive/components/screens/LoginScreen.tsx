import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, Animated } from 'react-native'
import { AnimatedButton } from '../ui/AnimatedButton'
import { Input } from '../ui/Input'
import { AppState, User } from '../../types/index'

interface LoginScreenProps {
  onNavigate: (state: AppState) => void
  onLogin: (email: string, password: string) => void
  users: User[]
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ 
  onNavigate, 
  onLogin 
}) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(30)).current
  const formAnim = useRef(new Animated.Value(20)).current
  const loginHoverAnim = useRef(new Animated.Value(0)).current
  const signupHoverAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    // Animate in sequence
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(formAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start()
  }, [fadeAnim, slideAnim, formAnim])

  const handleLogin = () => {
    setError("")
    
    if (!email || !password) {
      setError("Vul alstublieft alle velden in")
      return
    }
    
    onLogin(email, password)
  }

  const handleBack = () => {
    onNavigate("welcome")
    setError("")
    setEmail("")
    setPassword("")
  }

  const handleSignupNavigation = () => {
    onNavigate("signup")
    setError("")
  }

  return (
    <View style={styles.container}>
      <Animated.View 
        style={[
          styles.content,
          {
            opacity: fadeAnim,
          }
        ]}
      >
        <Animated.View 
          style={[
            styles.header,
            {
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <Text style={styles.title}>Welkom Terug</Text>
          <Text style={styles.subtitle}>Log in om door te gaan</Text>
        </Animated.View>

        <Animated.View 
          style={[
            styles.form,
            {
              transform: [{ translateY: formAnim }]
            }
          ]}
        >
          {error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          <View style={styles.inputContainer}>
            <Input
              placeholder="E-mailadres"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
            />
            <Input
              placeholder="Wachtwoord"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.input}
            />
          </View>

          <AnimatedButton
            onPress={handleLogin}
            style={styles.loginButton}
            hoverColor="#0ea5e9"
          >
            <Text style={styles.loginButtonText}>Sign In</Text>
          </AnimatedButton>

          <View style={styles.footer}>
            <AnimatedButton
              onPress={handleSignupNavigation}
              variant="ghost"
              hoverColor="#0ea5e9"
            >
              <Text style={styles.linkText}>Sign Up</Text>
            </AnimatedButton>
            <AnimatedButton
              onPress={handleBack}
              variant="ghost"
            >
              <Text style={styles.backText}>←</Text>
            </AnimatedButton>
          </View>
        </Animated.View>
      </Animated.View>
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
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: '300',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '300',
    color: '#9ca3af',
  },
  form: {
    gap: 24,
  },
  errorContainer: {
    backgroundColor: 'rgba(153, 27, 27, 0.2)',
    borderWidth: 1,
    borderColor: '#ef4444',
    padding: 16,
    borderRadius: 4,
  },
  errorText: {
    color: '#fca5a5',
    fontSize: 14,
  },
  inputContainer: {
    gap: 16,
  },
  input: {
    paddingVertical: 12,
    fontSize: 16,
    fontWeight: '300',
  },
  loginButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 12,
  },
  loginButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '400',
  },
  footer: {
    alignItems: 'center',
    gap: 16,
  },
  linkText: {
    color: '#9ca3af',
    fontSize: 16,
    fontWeight: '300',
  },
  backText: {
    color: '#6b7280',
    fontSize: 14,
    fontWeight: '300',
  },
})
