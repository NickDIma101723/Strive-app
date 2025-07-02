export type AppState =
  | "welcome"
  | "login"
  | "signup"
  | "profiles"
  | "app"
  | "manage-profiles"
  | "create-profile"
  | "create-lesson"

export type AppTab = "schedule" | "staff" | "calendar"

export interface User {
  id: string
  email: string
  password: string
  name: string
  profiles: Profile[]
}

export interface Profile {
  id: string
  name: string
  avatar: string
  userId: string
  photo?: string
}

export interface Lesson {
  id: string
  name: string
  time: string
  lokaal: string
  date: string
  teacher?: string
  subject?: string
  thumbnail?: string
}

export interface StaffMember {
  id: string
  name: string
  subject: string
  lokaal: string
  time: string
  avatar: string
}

export interface CalendarItem {
  id: string
  date: string
  time: string
  title: string
  status: 'scheduled'
}
