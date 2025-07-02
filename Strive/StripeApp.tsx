import React, { useState, useEffect } from 'react'
import { WelcomeScreen } from './components/screens/WelcomeScreen'
import { LoginScreen } from './components/screens/LoginScreen'
import { SignupScreen } from './components/screens/SignupScreen'
import { ProfilesScreen } from './components/screens/ProfilesScreen'
import { CreateProfileScreen } from './components/screens/CreateProfileScreen'
import { CreateLessonScreen } from './components/screens/CreateLessonScreen'
import { MainAppScreen } from './components/screens/MainAppScreen'
import { 
  AppState, 
  AppTab, 
  User, 
  Profile, 
  Lesson 
} from './types/index'
import { 
  validateEmail, 
  saveUsersToStorage, 
  loadUsersFromStorage 
} from './utils/auth'
import { 
  defaultLessons, 
  staffSchedule, 
  calendarItems 
} from './data/mockData'

export default function StripeApp() {
  // State management
  const [currentState, setCurrentState] = useState<AppState>("welcome")
  const [activeTab, setActiveTab] = useState<AppTab>("schedule")
  const [currentDate] = useState("woensdag 9 maart")
  const [users, setUsers] = useState<User[]>([])
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [currentProfile, setCurrentProfile] = useState<Profile | null>(null)
  const [lessons, setLessons] = useState<Lesson[]>(defaultLessons)

  // Load users from storage on mount
  useEffect(() => {
    const savedUsers = loadUsersFromStorage()
    setUsers(savedUsers)
  }, [])

  // Save users to storage whenever users change
  useEffect(() => {
    saveUsersToStorage(users)
  }, [users])

  // Authentication handlers
  const handleLogin = (email: string, password: string) => {
    if (!validateEmail(email)) {
      // In a real app, you'd show this error in the UI
      return false
    }

    const user = users.find((u) => u.email === email && u.password === password)
    if (user) {
      setCurrentUser(user)
      if (user.profiles.length > 0) {
        setCurrentState("profiles")
      } else {
        setCurrentState("create-profile")
      }
      return true
    } else {
      // In a real app, you'd show this error in the UI
      return false
    }
  }

  const handleSignup = (email: string, password: string, name: string) => {
    if (!validateEmail(email)) {
      return false
    }

    if (password.length < 6) {
      return false
    }

    // Check if email already exists
    const existingUser = users.find((u) => u.email === email)
    if (existingUser) {
      return false
    }

    const newUser: User = {
      id: Date.now().toString(),
      email,
      password,
      name,
      profiles: [],
    }

    setUsers([...users, newUser])
    setCurrentUser(newUser)
    setCurrentState("create-profile")
    return true
  }

  // Profile handlers
  const handleProfileSelect = (profile: Profile) => {
    setCurrentProfile(profile)
    setCurrentState("app")
  }

  const handleCreateProfile = (profileName: string, photo?: string) => {
    if (!currentUser || !profileName) {
      return false
    }

    const newProfile: Profile = {
      id: Date.now().toString(),
      name: profileName,
      avatar: profileName.charAt(0).toUpperCase(),
      userId: currentUser.id,
      photo: photo || undefined,
    }

    const updatedUser = {
      ...currentUser,
      profiles: [...currentUser.profiles, newProfile],
    }

    setUsers(users.map((u) => (u.id === currentUser.id ? updatedUser : u)))
    setCurrentUser(updatedUser)
    setCurrentState("profiles")
    return true
  }

  // Profile management handlers
  const handleDeleteProfile = (name: string) => {
    if (!currentUser) return

    // Update users array to remove the profile
    setUsers(users.map(user => {
      if (user.id === currentUser.id) {
        return {
          ...user,
          profiles: (user.profiles || []).filter(profile => profile.name !== name)
        }
      }
      return user
    }))

    // If the deleted profile was the current profile, reset it
    if (currentProfile?.name === name) {
      setCurrentProfile(null)
      setCurrentState("create-profile") // Go back to profile selection
    }
  }

  // Lesson handlers
  const handleCreateLesson = (title: string, description: string, thumbnail?: string) => {
    if (!title || !description) {
      return false
    }

    const newLesson: Lesson = {
      id: Date.now().toString(),
      name: title,
      time: description,
      lokaal: "TBD",
      date: "Nieuw",
      thumbnail: thumbnail
    }

    setLessons([...lessons, newLesson])
    setCurrentState("app")
    return true
  }

  const handleDeleteLesson = (lessonId: string) => {
    setLessons(lessons.filter((lesson) => lesson.id !== lessonId))
  }

  // Navigation helpers
  const navigateToCreateLesson = () => {
    setCurrentState("create-lesson")
  }

  const navigateToProfiles = () => {
    setCurrentState("profiles")
  }

  // Render current screen
  const renderCurrentScreen = () => {
    switch (currentState) {
      case "welcome":
        return <WelcomeScreen onNavigate={setCurrentState} />
      
      case "login":
        return (
          <LoginScreen
            onNavigate={setCurrentState}
            onLogin={handleLogin}
            users={users}
          />
        )
      
      case "signup":
        return (
          <SignupScreen
            onNavigate={setCurrentState}
            onSignup={handleSignup}
          />
        )
      
      case "profiles":
        return (
          <ProfilesScreen
            profiles={currentUser?.profiles || []}
            onProfileSelect={handleProfileSelect}
            onNavigate={setCurrentState}
          />
        )
      
      case "app":
        return (
          <MainAppScreen
            currentProfile={currentProfile}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onProfilesNavigation={navigateToProfiles}
            onCreateLesson={navigateToCreateLesson}
            lessons={lessons}
            onDeleteLesson={handleDeleteLesson}
            staff={staffSchedule}
            calendarItems={calendarItems}
            currentDate={currentDate}
          />
        )
      
      case "create-profile":
        return (
          <CreateProfileScreen
            onNavigate={setCurrentState}
            onCreateProfile={handleCreateProfile}
            onDeleteProfile={handleDeleteProfile}
            existingProfiles={currentUser?.profiles || []}
          />
        )
      
      case "create-lesson":
        return (
          <CreateLessonScreen
            onNavigate={setCurrentState}
            onCreateLesson={handleCreateLesson}
          />
        )
      
      // TODO: Implement manage-profiles screen
      case "manage-profiles":
        return <WelcomeScreen onNavigate={setCurrentState} /> // Placeholder
      
      default:
        return <WelcomeScreen onNavigate={setCurrentState} />
    }
  }

  return renderCurrentScreen()
}
