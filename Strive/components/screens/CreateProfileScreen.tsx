import React, { useState } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { ImageUploader } from '../ui/ImageUploader'
import { AppState } from '../../types/index'

interface CreateProfileScreenProps {
  onNavigate: (state: AppState) => void
  onCreateProfile: (name: string, photo?: string) => void
  onDeleteProfile?: (name: string) => void
  existingProfiles?: Array<{ name: string, photo?: string }>
}

export const CreateProfileScreen: React.FC<CreateProfileScreenProps> = ({
  onNavigate,
  onCreateProfile,
  onDeleteProfile,
  existingProfiles = []
}) => {
  const [profileName, setProfileName] = useState("")
  const [profilePhoto, setProfilePhoto] = useState("")
  const [error, setError] = useState("")

  const handleCreateProfile = () => {
    setError("")
    
    if (!profileName.trim()) {
      setError("Please enter a profile name")
      return
    }

    if (existingProfiles.some(p => p.name === profileName.trim())) {
      setError("A profile with this name already exists")
      return
    }

    onCreateProfile(profileName.trim(), profilePhoto)
    setProfileName("")
    setProfilePhoto("")
  }

  const handleDeleteProfile = (name: string) => {
    if (onDeleteProfile) {
      onDeleteProfile(name)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Manage Profiles</Text>
          <Text style={styles.subtitle}>Create or manage your profiles</Text>
        </View>

        <View style={styles.form}>
          {error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          {/* Existing Profiles */}
          {existingProfiles.length > 0 && (
            <View style={styles.profilesList}>
              <Text style={styles.sectionTitle}>Your Profiles</Text>
              {existingProfiles.map((profile) => (
                <View key={profile.name} style={styles.profileItem}>
                  {profile.photo ? (
                    <Image source={{ uri: profile.photo }} style={styles.profilePhoto} />
                  ) : (
                    <View style={styles.profilePhotoPlaceholder} />
                  )}
                  <Text style={styles.profileName}>{profile.name}</Text>
                  <Button
                    onPress={() => handleDeleteProfile(profile.name)}
                    style={styles.deleteButton}
                  >
                    <Text style={styles.deleteButtonText}>Delete</Text>
                  </Button>
                </View>
              ))}
            </View>
          )}

          {/* Create New Profile Form */}
          <View style={styles.createProfileSection}>
            <Text style={styles.sectionTitle}>Create New Profile</Text>
            <View style={styles.inputContainer}>
              <ImageUploader
                onImageSelect={(uri) => setProfilePhoto(uri)}
                defaultImage={profilePhoto}
                style={styles.photoUploader}
              />
              
              <Input
                placeholder="Profile Name"
                value={profileName}
                onChangeText={setProfileName}
                style={styles.input}
              />
            </View>

            <Button
              onPress={handleCreateProfile}
              style={styles.createButton}
            >
              <Text style={styles.createButtonText}>Create Profile</Text>
            </Button>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  content: {
    width: '100%',
    maxWidth: 384,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: '300',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '300',
    color: '#9ca3af',
  },
  form: {
    gap: 24,
  },
  errorContainer: {
    backgroundColor: 'rgba(153, 27, 27, 0.2)',
    borderWidth: 1,
    borderColor: '#ef4444',
    padding: 16,
    borderRadius: 4,
  },
  errorText: {
    color: '#fca5a5',
    fontSize: 14,
  },
  profilesList: {
    gap: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '300',
    color: '#ffffff',
    marginBottom: 16,
  },
  profileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: 12,
    gap: 12,
  },
  profilePhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  profilePhotoPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4b5563',
  },
  profileName: {
    flex: 1,
    fontSize: 16,
    color: '#ffffff',
  },
  deleteButton: {
    backgroundColor: '#dc2626',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  deleteButtonText: {
    color: '#ffffff',
    fontSize: 14,
  },
  createProfileSection: {
    gap: 16,
  },
  inputContainer: {
    gap: 16,
    alignItems: 'center',
  },
  input: {
    width: '100%',
    paddingVertical: 12,
    fontSize: 16,
    fontWeight: '300',
  },
  photoUploader: {
    marginBottom: 16,
  },
  createButton: {
    width: '100%',
    backgroundColor: '#ffffff',
    paddingVertical: 12,
  },
  createButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '400',
  }
})
