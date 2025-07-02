import React from 'react'
import { View, StyleSheet, ViewStyle } from 'react-native'

interface CardProps {
  children: React.ReactNode
  className?: string
  style?: ViewStyle
}

export const Card: React.FC<CardProps> = ({ children, className = '', style }) => {
  return (
    <View style={[styles.card, style]}>
      {children}
    </View>
  )
}

interface CardContentProps {
  children: React.ReactNode
  className?: string
  style?: ViewStyle
}

export const CardContent: React.FC<CardContentProps> = ({ 
  children, 
  className = '', 
  style 
}) => {
  return (
    <View style={[styles.content, style]}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: '#1f2937',
    borderRadius: 8,
    overflow: 'hidden',
  },
  content: {
    padding: 16,
  },
})
