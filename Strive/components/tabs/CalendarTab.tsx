import React, { useEffect, useRef } from 'react'
import { View, Text, StyleSheet, ScrollView, Animated } from 'react-native'
import { CalendarItem } from '../../types/index'

interface CalendarTabProps {
  calendarItems: CalendarItem[]
}

export const CalendarTab: React.FC<CalendarTabProps> = ({ calendarItems }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current
  const headerAnim = useRef(new Animated.Value(-20)).current
  const itemAnims = useRef(calendarItems.map(() => new Animated.Value(0))).current

  useEffect(() => {
    // Header animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(headerAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      })
    ]).start()

    // Staggered calendar item animations
    const itemAnimations = calendarItems.map((_, index) => 
      Animated.timing(itemAnims[index], {
        toValue: 1,
        duration: 400,
        delay: index * 100,
        useNativeDriver: true,
      })
    )

    Animated.sequence([
      Animated.delay(200),
      Animated.parallel(itemAnimations)
    ]).start()
  }, [fadeAnim, headerAnim, calendarItems, itemAnims])

  return (
    <ScrollView style={styles.container}>
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: headerAnim }]
        }}
      >
        <Text style={styles.title}>Kalender</Text>
      </Animated.View>

      <View style={styles.calendarContainer}>
        {calendarItems.map((item, index) => (
          <Animated.View
            key={item.id}
            style={{
              opacity: itemAnims[index],
              transform: [
                {
                  translateY: itemAnims[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: [30, 0],
                  }),
                },
                {
                  scale: itemAnims[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.95, 1],
                  }),
                },
              ],
            }}
          >
            <View style={styles.calendarItem}>
            <View style={styles.calendarContent}>
              <View style={styles.dateContainer}>
                <Text style={styles.date}>{item.date}</Text>
                <Text style={styles.time}>
                  {item.time.split(" - ")[0]}
                </Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.eventDetails}>
                <Text style={styles.eventTitle}>{item.title}</Text>
                <Text style={styles.eventTime}>{item.time}</Text>
              </View>
            </View>
            <View style={styles.status}>
              <Text style={styles.statusText}>Gepland</Text>
            </View>
            </View>
          </Animated.View>
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '300',
    color: '#ffffff',
    marginBottom: 32,
  },
  calendarContainer: {
    gap: 24,
  },
  calendarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1f2937',
  },
  calendarContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 24,
  },
  dateContainer: {
    alignItems: 'flex-end',
    minWidth: 80,
  },
  date: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '300',
  },
  time: {
    color: '#6b7280',
    fontSize: 14,
  },
  divider: {
    width: 1,
    height: 48,
    backgroundColor: '#374151',
  },
  eventDetails: {
    flex: 1,
    gap: 4,
  },
  eventTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '300',
  },
  eventTime: {
    color: '#9ca3af',
    fontSize: 14,
  },
  status: {
    alignItems: 'flex-end',
  },
  statusText: {
    color: '#3b82f6',
    fontSize: 14,
    fontWeight: '300',
  },
})
