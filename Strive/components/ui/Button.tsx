import React from 'react'
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native'

interface ButtonProps {
  children: React.ReactNode
  onPress?: () => void
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'sm' | 'default' | 'lg'
  className?: string
  style?: ViewStyle
  textStyle?: TextStyle
  disabled?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onPress,
  variant = 'default',
  size = 'default',
  className = '',
  style,
  textStyle,
  disabled = false
}) => {
  const getButtonStyle = () => {
    let buttonStyle = { ...styles.button }
    
    if (variant === 'outline') {
      buttonStyle = { ...buttonStyle, ...styles.outline }
    } else if (variant === 'ghost') {
      buttonStyle = { ...buttonStyle, ...styles.ghost }
    } else {
      buttonStyle = { ...buttonStyle, ...styles.default }
    }
    
    if (size === 'sm') {
      buttonStyle = { ...buttonStyle, ...styles.small }
    } else if (size === 'lg') {
      buttonStyle = { ...buttonStyle, ...styles.large }
    }
    
    if (disabled) {
      buttonStyle = { ...buttonStyle, ...styles.disabled }
    }
    
    return buttonStyle
  }

  const getTextStyle = () => {
    let textStyle = { ...styles.text }
    
    if (variant === 'outline' || variant === 'ghost') {
      textStyle = { ...textStyle, ...styles.outlineText }
    } else {
      textStyle = { ...textStyle, ...styles.defaultText }
    }
    
    if (size === 'sm') {
      textStyle = { ...textStyle, ...styles.smallText }
    } else if (size === 'lg') {
      textStyle = { ...textStyle, ...styles.largeText }
    }
    
    return textStyle
  }

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={[getTextStyle(), textStyle]}>
        {children}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  default: {
    backgroundColor: '#ffffff',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#6b7280',
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  small: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  large: {
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
  },
  defaultText: {
    color: '#000000',
  },
  outlineText: {
    color: '#ffffff',
  },
  smallText: {
    fontSize: 14,
  },
  largeText: {
    fontSize: 18,
  },
})
