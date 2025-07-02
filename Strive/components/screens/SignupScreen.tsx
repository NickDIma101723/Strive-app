import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { AppState } from '../../types/index'

interface SignupScreenProps {
  onNavigate: (state: AppState) => void
  onSignup: (email: string, password: string, name: string) => void
}

export const SignupScreen: React.FC<SignupScreenProps> = ({ 
  onNavigate, 
  onSignup 
}) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [error, setError] = useState("")

  const handleSignup = () => {
    setError("")
    
    if (!email || !password || !name) {
      setError("Please fill in all fields")
      return
    }
    
    onSignup(email, password, name)
  }

  const handleBack = () => {
    onNavigate("welcome")
    setError("")
    setEmail("")
    setPassword("")
    setName("")
  }

  const handleLoginNavigation = () => {
    onNavigate("login")
    setError("")
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Join Stripe</Text>
          <Text style={styles.subtitle}>Create your account</Text>
        </View>

        <View style={styles.form}>
          {error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          <View style={styles.inputContainer}>
            <Input
              placeholder="Full Name"
              value={name}
              onChangeText={setName}
              style={styles.input}
            />
            <Input
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
            />
            <Input
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.input}
            />
          </View>

          <Button
            onPress={handleSignup}
            style={styles.signupButton}
          >
            <Text style={styles.signupButtonText}>Create Account</Text>
          </Button>

          <View style={styles.footer}>
            <Button
              onPress={handleLoginNavigation}
              variant="ghost"
            >
              <Text style={styles.linkText}>Already have an account?</Text>
            </Button>
            <Button
              onPress={handleBack}
              variant="ghost"
            >
              <Text style={styles.backText}>← Back</Text>
            </Button>
          </View>
        </View>
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
  signupButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 12,
  },
  signupButtonText: {
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
