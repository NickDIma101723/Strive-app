# Stripe App - Refactored Structure

This is the refactored version of the Stripe school scheduler app, broken down into smaller, more maintainable components.

## Project Structure

```
Strive/
├── components/
│   ├── screens/          # Main screen components
│   │   ├── WelcomeScreen.tsx
│   │   ├── LoginScreen.tsx
│   │   ├── SignupScreen.tsx
│   │   ├── ProfilesScreen.tsx
│   │   ├── CreateProfileScreen.tsx
│   │   ├── CreateLessonScreen.tsx
│   │   └── MainAppScreen.tsx
│   ├── tabs/             # Tab content components
│   │   ├── ScheduleTab.tsx
│   │   ├── StaffTab.tsx
│   │   └── CalendarTab.tsx
│   └── ui/               # Reusable UI components
│       ├── Button.tsx
│       ├── Input.tsx
│       └── Card.tsx
├── types/
│   └── index.ts          # TypeScript type definitions
├── utils/
│   └── auth.ts           # Authentication utilities
├── data/
│   └── mockData.ts       # Mock data for lessons, staff, etc.
├── styles/
│   └── globalStyles.ts   # Global CSS styles
├── StripeApp.tsx         # Main app component
└── index.ts              # Main export
```

## Key Improvements

### 1. **Separation of Concerns**
- Each screen is now its own component
- UI components are reusable across screens
- Business logic is separated from presentation

### 2. **Type Safety**
- All TypeScript interfaces are centralized in `types/index.ts`
- Better type checking and IDE support

### 3. **Maintainability**
- Smaller, focused components are easier to understand and modify
- Clear file organization makes finding code easier
- Reusable components reduce code duplication

### 4. **Scalability**
- Easy to add new screens or modify existing ones
- Component structure supports future enhancements
- Clear data flow between components

## Component Overview

### Screens
- **WelcomeScreen**: Initial landing page with login/signup options
- **LoginScreen**: User authentication
- **SignupScreen**: User registration
- **ProfilesScreen**: Profile selection interface
- **CreateProfileScreen**: Profile creation form
- **CreateLessonScreen**: Lesson creation form
- **MainAppScreen**: Main app interface with tab navigation

### Tabs
- **ScheduleTab**: Displays user's lesson schedule
- **StaffTab**: Shows staff/teacher information
- **CalendarTab**: Calendar view of events

### UI Components
- **Button**: Customizable button component
- **Input**: Styled input field
- **Card**: Card container component

## Usage

```tsx
import StripeApp from './Strive'

export default function App() {
  return <StripeApp />
}
```

## Features

- ✅ User authentication (login/signup)
- ✅ Profile management
- ✅ Lesson scheduling
- ✅ Staff directory
- ✅ Calendar view
- ✅ Responsive design
- ✅ TypeScript support
- ✅ React Native compatible

## Next Steps

To further improve the app, consider:

1. **State Management**: Implement Redux or Zustand for complex state
2. **Navigation**: Use React Navigation for better routing
3. **Testing**: Add unit tests for components
4. **API Integration**: Replace mock data with real API calls
5. **Offline Support**: Add local storage and sync capabilities
6. **Animations**: Enhance UI with smooth transitions
7. **Accessibility**: Improve screen reader support and keyboard navigation

## Development

The app is now much easier to work with:
- Each component has a single responsibility
- Changes to one screen don't affect others
- New features can be added incrementally
- Code is more testable and debuggable
