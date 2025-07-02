import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { ImageUploader } from '../ui/ImageUploader'
import { AppState } from '../../types/index'

interface CreateLessonScreenProps {
  onNavigate: (state: AppState) => void
  onCreateLesson: (title: string, description: string, thumbnail?: string) => void
}

export const CreateLessonScreen: React.FC<CreateLessonScreenProps> = ({
  onNavigate,
  onCreateLesson
}) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [thumbnail, setThumbnail] = useState("")
  const [error, setError] = useState("")

  const handleCreateLesson = () => {
    setError("")
    
    if (!title.trim()) {
      setError("Please enter a lesson title")
      return
    }

    if (!description.trim()) {
      setError("Please enter a lesson description")
      return
    }

    onCreateLesson(title.trim(), description.trim(), thumbnail)
    setTitle("")
    setDescription("")
    setThumbnail("")
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Create Lesson</Text>
          <Text style={styles.subtitle}>Add a new lesson</Text>
        </View>

        <View style={styles.form}>
          {error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          <View style={styles.inputContainer}>
            <ImageUploader
              onImageSelect={(uri) => setThumbnail(uri)}
              defaultImage={thumbnail}
              style={styles.thumbnailUploader}
            />
            
            <Input
              placeholder="Lesson Title"
              value={title}
              onChangeText={setTitle}
              style={styles.input}
            />

            <Input
              placeholder="Lesson Description"
              value={description}
              onChangeText={setDescription}
              style={{...styles.input, ...styles.textArea}}
              multiline
              numberOfLines={4}
            />
          </View>

          <Button
            onPress={handleCreateLesson}
            style={styles.createButton}
          >
            <Text style={styles.createButtonText}>Create Lesson</Text>
          </Button>
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
  inputContainer: {
    gap: 16,
  },
  input: {
    width: '100%',
    paddingVertical: 12,
    fontSize: 16,
    fontWeight: '300',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  thumbnailUploader: {
    alignSelf: 'center',
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