import React, { useEffect, useRef } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated } from 'react-native'
import { Profile, AppState } from '../../types/index'

interface ProfilesScreenProps {
  profiles: Profile[]
  onProfileSelect: (profile: Profile) => void
  onNavigate: (state: AppState) => void
}

export const ProfilesScreen: React.FC<ProfilesScreenProps> = ({
  profiles,
  onProfileSelect,
  onNavigate
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(30)).current
  const profileAnims = useRef(profiles.map(() => new Animated.Value(0))).current

  useEffect(() => {
    // Main screen fade in
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start()

    // Title slide up
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 800,
      useNativeDriver: true,
    }).start()

    // Staggered profile animations
    const profileAnimations = profiles.map((_, index) => 
      Animated.timing(profileAnims[index], {
        toValue: 1,
        duration: 500,
        delay: index * 100,
        useNativeDriver: true,
      })
    )

    Animated.sequence([
      Animated.delay(300),
      Animated.parallel(profileAnimations)
    ]).start()
  }, [fadeAnim, slideAnim, profiles, profileAnims])

  const handleProfilePress = (profile: Profile) => {
    // Scale animation on press
    Animated.sequence([
      Animated.timing(profileAnims[profiles.indexOf(profile)], {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(profileAnims[profiles.indexOf(profile)], {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      })
    ]).start(() => {
      onProfileSelect(profile)
    })
  }
  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.content}>
        <Animated.View style={[styles.header, { transform: [{ translateY: slideAnim }] }]}>
          <Text style={styles.title}>Who's using Stripe?</Text>
          <Text style={styles.subtitle}>Select your profile</Text>
        </Animated.View>

        <View style={styles.profilesGrid}>
          {profiles.map((profile, index) => (
            <Animated.View
              key={profile.id}
              style={{
                opacity: profileAnims[index],
                transform: [
                  {
                    scale: profileAnims[index].interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.8, 1],
                    }),
                  },
                  {
                    translateY: profileAnims[index].interpolate({
                      inputRange: [0, 1],
                      outputRange: [20, 0],
                    }),
                  },
                ],
              }}
            >
              <TouchableOpacity
                style={styles.profileCard}
                onPress={() => handleProfilePress(profile)}
                activeOpacity={0.8}
              >
                <View style={styles.profileAvatar}>
                  {profile.photo ? (
                    <Image
                      source={{ uri: profile.photo }}
                      style={styles.profileImage}
                    />
                  ) : (
                    <Text style={styles.profileAvatarText}>{profile.avatar}</Text>
                  )}
                </View>
                <Text style={styles.profileName}>{profile.name}</Text>
              </TouchableOpacity>
            </Animated.View>
          ))}

          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [
                {
                  scale: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.8, 1],
                  }),
                },
              ],
            }}
          >
            <TouchableOpacity
              style={styles.newProfileCard}
              onPress={() => onNavigate("create-profile")}
              activeOpacity={0.8}
            >
              <View style={styles.newProfileAvatar}>
                <Text style={styles.newProfileIcon}>+</Text>
              </View>
              <Text style={styles.newProfileText}>New Profile</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>

        <Animated.View style={[styles.footer, { opacity: fadeAnim }]}>
          <TouchableOpacity 
            onPress={() => onNavigate("manage-profiles")}
            activeOpacity={0.7}
          >
            <Text style={styles.manageText}>Manage Profiles</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Animated.View>
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
    maxWidth: 768,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    fontSize: 40,
    fontWeight: '300',
    color: '#ffffff',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '300',
    color: '#9ca3af',
  },
  profilesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 32,
    marginBottom: 48,
  },
  profileCard: {
    alignItems: 'center',
    gap: 16,
    width: 128,
  },
  profileAvatar: {
    width: 128,
    height: 128,
    backgroundColor: '#1f2937',
    borderWidth: 2,
    borderColor: '#6b7280',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 2,
  },
  profileAvatarText: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: '300',
  },
  profileName: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '300',
    textAlign: 'center',
  },
  newProfileCard: {
    alignItems: 'center',
    gap: 16,
    width: 128,
  },
  newProfileAvatar: {
    width: 128,
    height: 128,
    backgroundColor: '#111827',
    borderWidth: 2,
    borderColor: '#6b7280',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  newProfileIcon: {
    color: '#9ca3af',
    fontSize: 48,
    fontWeight: '300',
  },
  newProfileText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '300',
    textAlign: 'center',
  },
  footer: {
    alignItems: 'center',
  },
  manageText: {
    color: '#9ca3af',
    fontSize: 16,
    fontWeight: '300',
  },
})
