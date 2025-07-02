import React, { useEffect, useRef } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native'
import { Button } from '../ui/Button'
import { Lesson } from '../../types/index'

interface ScheduleTabProps {
  lessons: Lesson[]
  onCreateLesson: () => void
  onDeleteLesson: (lessonId: string) => void
}

export const ScheduleTab: React.FC<ScheduleTabProps> = ({
  lessons,
  onCreateLesson,
  onDeleteLesson
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current
  const headerAnim = useRef(new Animated.Value(-20)).current

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
  }, [fadeAnim, headerAnim])

  return (
    <ScrollView style={styles.container}>
      <Animated.View 
        style={[
          styles.header,
          {
            opacity: fadeAnim,
            transform: [{ translateY: headerAnim }]
          }
        ]}
      >
        <Text style={styles.title}>Mijn Rooster</Text>
        <Button
          onPress={onCreateLesson}
          style={styles.createButton}
        >
          <Text style={styles.createButtonText}>+ Nieuwe Les</Text>
        </Button>
      </Animated.View>

      <View style={styles.lessonsContainer}>
        {lessons.map((lesson, index) => (
          <Animated.View
            key={lesson.id}
            style={[
              styles.lessonItem,
              {
                opacity: fadeAnim,
                transform: [
                  {
                    translateY: fadeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [20, 0],
                    }),
                  },
                ],
              }
            ]}
          >
            <View style={styles.lessonContent}>
              <View style={styles.timeContainer}>
                <Text style={styles.startTime}>
                  {lesson.time.split(" - ")[0]}
                </Text>
                <Text style={styles.endTime}>
                  {lesson.time.split(" - ")[1]}
                </Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.lessonDetails}>
                <Text style={styles.lessonName}>{lesson.name}</Text>
                <View style={styles.detailsRow}>
                  <Text style={styles.detailText}>{lesson.lokaal}</Text>
                  {lesson.teacher && (
                    <Text style={styles.detailText}>• {lesson.teacher}</Text>
                  )}
                  {lesson.subject && (
                    <Text style={styles.detailText}>• {lesson.subject}</Text>
                  )}
                </View>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => onDeleteLesson(lesson.id)}
              style={styles.deleteButton}
              activeOpacity={0.7}
            >
              <Text style={styles.deleteText}>×</Text>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>

      {lessons.length === 0 && (
        <Animated.View 
          style={[
            styles.emptyState,
            { opacity: fadeAnim }
          ]}
        >
          <Text style={styles.emptyText}>Geen lessen gevonden</Text>
          <Button
            onPress={onCreateLesson}
            style={styles.emptyButton}
          >
            <Text style={styles.emptyButtonText}>Voeg je eerste les toe</Text>
          </Button>
        </Animated.View>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: '300',
    color: '#ffffff',
  },
  createButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 8,
    paddingHorizontal: 24,
  },
  createButtonText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '300',
  },
  lessonsContainer: {
    gap: 24,
  },
  lessonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1f2937',
  },
  lessonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 24,
  },
  timeContainer: {
    alignItems: 'flex-end',
    minWidth: 80,
  },
  startTime: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '300',
  },
  endTime: {
    color: '#6b7280',
    fontSize: 14,
  },
  divider: {
    width: 1,
    height: 48,
    backgroundColor: '#374151',
  },
  lessonDetails: {
    flex: 1,
    gap: 4,
  },
  lessonName: {
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
  deleteButton: {
    padding: 8,
  },
  deleteText: {
    color: '#6b7280',
    fontSize: 16,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 80,
    gap: 24,
  },
  emptyText: {
    color: '#9ca3af',
    fontSize: 18,
  },
  emptyButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
  emptyButtonText: {
    color: '#000000',
    fontWeight: '300',
  },
})
