import React, { useState } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AnimatedButton } from './AnimatedButton';

interface ImageUploaderProps {
  onImageSelect: (uri: string) => void;
  defaultImage?: string;
  style?: any;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageSelect,
  defaultImage,
  style
}) => {
  const [image, setImage] = useState<string | null>(defaultImage || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pickImage = async () => {
    try {
      setLoading(true);
      setError(null);

      // Request permissions
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        setError('Permissions not granted');
        alert('Sorry, we need camera roll permissions to upload images!');
        return;
      }

      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      console.log('Image picker result:', result);

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const uri = result.assets[0].uri;
        console.log('Selected image URI:', uri);
        setImage(uri);
        onImageSelect(uri);
      } else {
        console.log('Image selection canceled or no assets');
      }
    } catch (err) {
      console.error('Error picking image:', err);
      setError(err instanceof Error ? err.message : 'Failed to pick image');
      alert('Failed to pick image: ' + err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, style]}>
      <AnimatedButton 
        onPress={pickImage}
        style={{
          ...styles.uploadButton,
          ...(loading ? styles.loadingButton : {})
        }}
        variant={image ? "outline" : "default"}
        disabled={loading}
      >
        {loading ? (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>...</Text>
          </View>
        ) : image ? (
          <Image 
            source={{ uri: image }} 
            style={styles.previewImage}
            onError={(e) => {
              console.error('Image loading error:', e.nativeEvent.error);
              setError('Failed to load image');
            }}
          />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>+</Text>
            {error && <Text style={styles.errorText}>{error}</Text>}
          </View>
        )}
      </AnimatedButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  uploadButton: {
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: 'hidden',
    padding: 0,
  },
  loadingButton: {
    opacity: 0.7,
  },
  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f3f4f6',
  },
  placeholderText: {
    fontSize: 40,
    color: '#9ca3af',
  },
  errorText: {
    fontSize: 12,
    color: '#ef4444',
    marginTop: 4,
    textAlign: 'center',
  }
});
