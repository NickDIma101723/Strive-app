import React, { useRef } from 'react'
import { Pressable, Text, StyleSheet, ViewStyle, TextStyle, Animated } from 'react-native'

interface AnimatedButtonProps {
  children: React.ReactNode
  onPress?: () => void
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'sm' | 'default' | 'lg'
  style?: ViewStyle
  textStyle?: TextStyle
  disabled?: boolean
  onHoverIn?: () => void
  onHoverOut?: () => void
  hoverColor?: string
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  onPress,
  variant = 'default',
  size = 'default',
  style,
  textStyle,
  disabled = false,
  hoverColor = '#0ea5e9'
}) => {
  const slideAnim = useRef(new Animated.Value(-100)).current
  const scaleAnim = useRef(new Animated.Value(1)).current

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 0.95,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true
      })
    ]).start()
  }

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true
      })
    ]).start()
  }

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
    <Pressable
      style={[
        getButtonStyle(),
        style,
        { overflow: 'hidden', position: 'relative' }
      ]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
    >
      <Animated.View
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: '100%',
          backgroundColor: hoverColor,
          opacity: variant === 'ghost' ? 0.1 : 1,
          transform: [{
            translateX: slideAnim
          }]
        }}
      />
      <Animated.View 
        style={{ 
          transform: [{ scale: scaleAnim }],
          zIndex: 1
        }}
      >
        {children}
      </Animated.View>
    </Pressable>
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
