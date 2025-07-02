import React, { useEffect, useRef } from 'react'
import { View, Text, StyleSheet, ScrollView, Animated } from 'react-native'
import { StaffMember } from '../../types/index'

interface StaffTabProps {
  staff: StaffMember[]
}

export const StaffTab: React.FC<StaffTabProps> = ({ staff }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current
  const headerAnim = useRef(new Animated.Value(-20)).current
  const staffAnims = useRef(staff.map(() => new Animated.Value(0))).current

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

    // Staggered staff item animations
    const staffAnimations = staff.map((_, index) => 
      Animated.timing(staffAnims[index], {
        toValue: 1,
        duration: 400,
        delay: index * 80,
        useNativeDriver: true,
      })
    )

    Animated.sequence([
      Animated.delay(200),
      Animated.parallel(staffAnimations)
    ]).start()
  }, [fadeAnim, headerAnim, staff, staffAnims])

  return (
    <ScrollView style={styles.container}>
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: headerAnim }]
        }}
      >
        <Text style={styles.title}>Docenten</Text>
      </Animated.View>

      <View style={styles.staffContainer}>
        {staff.map((teacher, index) => (
          <Animated.View
            key={teacher.id}
            style={{
              opacity: staffAnims[index],
              transform: [
                {
                  translateX: staffAnims[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: [-50, 0],
                  }),
                },
                {
                  scale: staffAnims[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.9, 1],
                  }),
                },
              ],
            }}
          >
            <View style={styles.staffItem}>
            <View style={styles.staffContent}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{teacher.avatar}</Text>
              </View>
              <View style={styles.staffDetails}>
                <Text style={styles.teacherName}>{teacher.name}</Text>
                <View style={styles.detailsRow}>
                  <Text style={styles.detailText}>{teacher.subject}</Text>
                  <Text style={styles.detailText}>• {teacher.lokaal}</Text>
                  <Text style={styles.detailText}>• {teacher.time}</Text>
                </View>
              </View>
            </View>
            <View style={styles.status}>
              <Text style={styles.statusText}>Beschikbaar</Text>
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
  staffContainer: {
    gap: 24,
  },
  staffItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1f2937',
  },
  staffContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 24,
  },
  avatar: {
    width: 48,
    height: 48,
    backgroundColor: '#ffffff',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '300',
  },
  staffDetails: {
    flex: 1,
    gap: 4,
  },
  teacherName: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '300',
  },
  detailsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  detailText: {
    color: '#9ca3af',
    fontSize: 14,
  },
  status: {
    alignItems: 'flex-end',
  },
  statusText: {
    color: '#10b981',
    fontSize: 14,
    fontWeight: '300',
  },
})
