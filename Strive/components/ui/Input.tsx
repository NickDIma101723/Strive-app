import React from 'react'
import { TextInput, StyleSheet, TextInputProps, TextStyle } from 'react-native'

interface InputProps extends TextInputProps {
  className?: string
  style?: TextStyle
}

export const Input: React.FC<InputProps> = ({
  className = '',
  style,
  ...props
}) => {
  return (
    <TextInput
      style={[styles.input, style]}
      placeholderTextColor="#9ca3af"
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: '#374151',
    color: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 4,
    fontSize: 16,
    fontWeight: '300',
  },
})
