import { User } from '../types/index'

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// For React Native, we'll use simple in-memory storage
// In a real app, you'd use AsyncStorage or SecureStore
let userStorage: User[] = []

export const saveUsersToStorage = (users: User[]) => {
  userStorage = users
}

export const loadUsersFromStorage = (): User[] => {
  return userStorage
}
