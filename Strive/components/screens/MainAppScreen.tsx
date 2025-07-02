import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Button } from '../ui/Button'
import { ScheduleTab } from '../tabs/ScheduleTab'
import { StaffTab } from '../tabs/StaffTab'
import { CalendarTab } from '../tabs/CalendarTab'
import { AppTab, Profile, Lesson, StaffMember, CalendarItem } from '../../types/index'

interface MainAppScreenProps {
  currentProfile: Profile | null
  activeTab: AppTab
  onTabChange: (tab: AppTab) => void
  onProfilesNavigation: () => void
  onCreateLesson: () => void
  lessons: Lesson[]
  onDeleteLesson: (lessonId: string) => void
  staff: StaffMember[]
  calendarItems: CalendarItem[]
  currentDate: string
}

export const MainAppScreen: React.FC<MainAppScreenProps> = ({
  currentProfile,
  activeTab,
  onTabChange,
  onProfilesNavigation,
  onCreateLesson,
  lessons,
  onDeleteLesson,
  staff,
  calendarItems,
  currentDate
}) => {
  const renderContent = () => {
    switch (activeTab) {
      case 'schedule':
        return (
          <ScheduleTab
            lessons={lessons}
            onCreateLesson={onCreateLesson}
            onDeleteLesson={onDeleteLesson}
          />
        )
      case 'staff':
        return <StaffTab staff={staff} />
      case 'calendar':
        return <CalendarTab calendarItems={calendarItems} />
      default:
        return null
    }
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.topRow}>
          <View style={styles.titleContainer}>
            <Text style={styles.appTitle}>Stripe</Text>
            <Text style={styles.profileName}>- {currentProfile?.name}</Text>
          </View>
          <TouchableOpacity
            onPress={onProfilesNavigation}
            style={styles.profileButton}
          >
            <Text style={styles.profileButtonText}>👥</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.dateRow}>
          <Text style={styles.chevron}>‹</Text>
          <View style={styles.dateContainer}>
            <Text style={styles.currentDate}>{currentDate}</Text>
            <Text style={styles.dateRange}>7 mrt - 13 mrt</Text>
          </View>
          <Text style={styles.chevron}>›</Text>
        </View>

        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          <Button
            variant={activeTab === "schedule" ? "default" : "ghost"}
            size="sm"
            onPress={() => onTabChange("schedule")}
            style={activeTab === "schedule" ? {...styles.tab, ...styles.activeTab} : styles.tab}
          >
            <Text style={[
              styles.tabText,
              activeTab === "schedule" && styles.activeTabText
            ]}>
              Rooster
            </Text>
          </Button>
          <Button
            variant={activeTab === "staff" ? "default" : "ghost"}
            size="sm"
            onPress={() => onTabChange("staff")}
            style={activeTab === "staff" ? {...styles.tab, ...styles.activeTab} : styles.tab}
          >
            <Text style={[
              styles.tabText,
              activeTab === "staff" && styles.activeTabText
            ]}>
              Docenten
            </Text>
          </Button>
          <Button
            variant={activeTab === "calendar" ? "default" : "ghost"}
            size="sm"
            onPress={() => onTabChange("calendar")}
            style={activeTab === "calendar" ? {...styles.tab, ...styles.activeTab} : styles.tab}
          >
            <Text style={[
              styles.tabText,
              activeTab === "calendar" && styles.activeTabText
            ]}>
              Kalender
            </Text>
          </Button>
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {renderContent()}
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          onPress={() => onTabChange("schedule")}
          style={activeTab === "schedule" ? {...styles.navButton, ...styles.activeNavButton} : styles.navButton}
        >
          <Text style={activeTab === "schedule" ? {...styles.navIcon, ...styles.activeNavIcon} : styles.navIcon}>
            🏠
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onTabChange("calendar")}
          style={activeTab === "calendar" ? {...styles.navButton, ...styles.activeNavButton} : styles.navButton}
        >
          <Text style={activeTab === "calendar" ? {...styles.navIcon, ...styles.activeNavIcon} : styles.navIcon}>
            📅
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onTabChange("schedule")}
          style={activeTab === "schedule" ? {...styles.navButton, ...styles.activeNavButton} : styles.navButton}
        >
          <Text style={activeTab === "schedule" ? {...styles.navIcon, ...styles.activeNavIcon} : styles.navIcon}>
            🕐
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onTabChange("staff")}
          style={activeTab === "staff" ? {...styles.navButton, ...styles.activeNavButton} : styles.navButton}
        >
          <Text style={activeTab === "staff" ? {...styles.navIcon, ...styles.activeNavIcon} : styles.navIcon}>
            👥
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onProfilesNavigation}
          style={styles.navButton}
        >
          <Text style={styles.navIcon}>⋯</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: '#1f2937',
    padding: 16,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  appTitle: {
    fontSize: 20,
    fontWeight: '300',
    color: '#ffffff',
  },
  profileName: {
    fontSize: 14,
    color: '#9ca3af',
  },
  profileButton: {
    padding: 4,
  },
  profileButtonText: {
    fontSize: 20,
    color: '#9ca3af',
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  chevron: {
    fontSize: 20,
    color: '#9ca3af',
  },
  dateContainer: {
    alignItems: 'center',
  },
  currentDate: {
    fontSize: 14,
    color: '#d1d5db',
    fontWeight: '300',
  },
  dateRange: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '300',
  },
  tabContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  activeTab: {
    backgroundColor: '#ffffff',
  },
  tabText: {
    color: '#9ca3af',
    fontWeight: '300',
  },
  activeTabText: {
    color: '#000000',
  },
  content: {
    flex: 1,
    padding: 16,
    paddingBottom: 80,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#000000',
    borderTopWidth: 1,
    borderTopColor: '#1f2937',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
  },
  navButton: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  activeNavButton: {
    // Add active state styling if needed
  },
  navIcon: {
    fontSize: 20,
    color: '#6b7280',
  },
  activeNavIcon: {
    color: '#ffffff',
  },
})
