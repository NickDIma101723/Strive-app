import { StyleSheet } from 'react-native';

// Sign up styles - organized like CSS
export const signStyles = StyleSheet.create({
  // Container styles
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },

  // Header styles
  header: {
    paddingTop: 80,
    paddingBottom: 40,
    alignItems: 'center',
  },
  
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },

  // Form styles
  form: {
    flex: 1,
  },
  
  inputGroup: {
    marginBottom: 20,
  },
  
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },

  // Button styles
  signUpButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  
  signUpButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },

  // Login section styles
  loginSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40,
  },
  
  loginText: {
    fontSize: 16,
    color: '#666',
  },
  
  loginLink: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
});
