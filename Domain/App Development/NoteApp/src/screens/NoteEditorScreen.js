import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, StyleSheet, ScrollView,
  TouchableOpacity, KeyboardAvoidingView, Platform,
  Alert, Image
} from 'react-native';
import { Audio } from 'expo-av';
import * as ImagePicker from 'expo-image-picker';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { getNotes, saveNotes } from '../storage/noteStorage';
import { lightColors, darkColors } from '../theme/colors';

const uuidv4 = () => Math.random().toString(36).substring(2) + Date.now().toString(36);

const NOTE_COLORS = [
  '#FFF9C4', '#F8BBD0', '#C8E6C9',
  '#BBDEFB', '#E1BEE7', '#FFE0B2',
  '#B2EBF2', '#F0F4C3', '#FFE0E0',
  null
];

export default function NoteEditorScreen({ route, navigation }) {
  const existing = route.params?.note;
  const isDark = route.params?.isDark || false;
  const colors = isDark ? darkColors : lightColors;

  const [title, setTitle] = useState(existing?.title || '');
  const [content, setContent] = useState(existing?.content || '');
  const [checklist, setChecklist] = useState(existing?.checklist || []);
  const [newTask, setNewTask] = useState('');
  const [recording, setRecording] = useState(null);
  const [recordings, setRecordings] = useState(existing?.recordings || []);
  const [isRecording, setIsRecording] = useState(false);
  const [playingId, setPlayingId] = useState(null);
  const [sound, setSound] = useState(null);
  const [images, setImages] = useState(existing?.images || []);
  const [noteColor, setNoteColor] = useState(existing?.noteColor || null);

  useEffect(() => {
    navigation.setOptions({
      headerStyle: { backgroundColor: colors.background, elevation: 0, shadowOpacity: 0 },
      headerTintColor: colors.text,
      headerTitle: () => (
        <Text style={{ color: colors.text, fontWeight: '700', fontSize: 17 }}>
          {existing ? 'Edit Note' : 'New Note'}
        </Text>
      ),
      headerRight: () => (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 12, gap: 16 }}>
          <TouchableOpacity
            onPress={exportAsPDF}
            style={{
              backgroundColor: '#1A1A1A',
              borderRadius: 8, paddingHorizontal: 10,
              paddingVertical: 6, flexDirection: 'row',
              alignItems: 'center', gap: 4,
            }}
          >
            <Text style={{ fontSize: 14 }}>📄</Text>
            <Text style={{ color: '#F5C518', fontWeight: '700', fontSize: 12 }}>PDF</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={saveNote}>
            <Text style={{ color: colors.primary, fontWeight: '700', fontSize: 16 }}>Save</Text>
          </TouchableOpacity>
        </View>
      ),
    });
  }, [title, content, checklist, recordings, images, noteColor]);

  useEffect(() => {
    return sound ? () => { sound.unloadAsync(); } : undefined;
  }, [sound]);

  const startRecording = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Please allow microphone access!');
        return;
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      setIsRecording(true);
    } catch (err) {
      Alert.alert('Error', 'Could not start recording!');
    }
  };

  const stopRecording = async () => {
    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      const newRecording = {
        id: uuidv4(),
        uri,
        name: `Recording ${recordings.length + 1}`,
        createdAt: Date.now(),
      };
      setRecordings([...recordings, newRecording]);
      setRecording(null);
      setIsRecording(false);
    } catch (err) {
      Alert.alert('Error', 'Could not stop recording!');
    }
  };

  const playRecording = async (rec) => {
    try {
      if (playingId === rec.id) {
        await sound.stopAsync();
        setPlayingId(null);
        return;
      }
      if (sound) await sound.unloadAsync();
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: rec.uri },
        { shouldPlay: true }
      );
      setSound(newSound);
      setPlayingId(rec.id);
      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) setPlayingId(null);
      });
    } catch (err) {
      Alert.alert('Error', 'Could not play recording!');
    }
  };

  const deleteRecording = (id) => {
    Alert.alert('Delete Recording', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete', style: 'destructive',
        onPress: () => setRecordings(recordings.filter(r => r.id !== id))
      }
    ]);
  };

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Please allow gallery access!');
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.7,
      });
      if (!result.canceled) {
        setImages([...images, { id: uuidv4(), uri: result.assets[0].uri }]);
      }
    } catch (err) {
      Alert.alert('Error', 'Could not pick image!');
    }
  };

  const deleteImage = (id) => {
    Alert.alert('Delete Image', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete', style: 'destructive',
        onPress: () => setImages(images.filter(img => img.id !== id))
      }
    ]);
  };

  const exportAsPDF = async () => {
    try {
      const checklistHTML = checklist.length > 0
        ? `<h3>Checklist</h3><ul>
            ${checklist.map(item =>
              `<li style="text-decoration: ${item.checked ? 'line-through' : 'none'}; color: ${item.checked ? '#888' : '#000'}">
                ${item.checked ? '☑' : '☐'} ${item.text}
              </li>`
            ).join('')}
           </ul>`
        : '';

      const voiceHTML = recordings.length > 0
        ? `<p>🎤 <em>${recordings.length} voice recording(s) attached</em></p>`
        : '';

      const html = `
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; padding: 32px; color: #1A1A1A; }
              h1 { color: #1A1A1A; border-bottom: 2px solid #F5C518; padding-bottom: 8px; }
              h3 { color: #555; }
              p { font-size: 15px; line-height: 1.6; }
              ul { list-style: none; padding: 0; }
              li { padding: 6px 0; font-size: 14px; }
              .date { color: #888; font-size: 12px; margin-bottom: 16px; }
              .footer { margin-top: 40px; color: #aaa; font-size: 11px; border-top: 1px solid #eee; padding-top: 8px; }
            </style>
          </head>
          <body>
            <h1>${title || 'Untitled Note'}</h1>
            <p class="date">📅 ${new Date().toLocaleDateString()}</p>
            ${content ? `<p>${content}</p>` : ''}
            ${checklistHTML}
            ${voiceHTML}
            <div class="footer">Exported from NoteApp by devsarthak07</div>
          </body>
        </html>
      `;

      const { uri } = await Print.printToFileAsync({ html });
      await Sharing.shareAsync(uri, {
        UTI: '.pdf',
        mimeType: 'application/pdf',
      });
    } catch (err) {
      Alert.alert('Error', 'Could not export PDF!');
    }
  };

  const saveNote = async () => {
    if (!title.trim() && !content.trim() && checklist.length === 0) {
      Alert.alert('Empty Note', 'Please add some content before saving.');
      return;
    }
    const notes = await getNotes();
    const now = Date.now();
    if (existing) {
      const updated = notes.map(n =>
        n.id === existing.id
          ? { ...n, title, content, checklist, recordings, images, noteColor, updatedAt: now }
          : n
      );
      await saveNotes(updated);
    } else {
      const newNote = {
        id: uuidv4(), title, content, checklist,
        recordings, images, noteColor,
        createdAt: now, updatedAt: now,
      };
      await saveNotes([newNote, ...notes]);
    }
    navigation.goBack();
  };

  const addTask = () => {
    if (!newTask.trim()) return;
    setChecklist([...checklist, { id: uuidv4(), text: newTask, checked: false }]);
    setNewTask('');
  };

  const toggleTask = (id) => {
    setChecklist(checklist.map(t => t.id === id ? { ...t, checked: !t.checked } : t));
  };

  const deleteTask = (id) => {
    setChecklist(checklist.filter(t => t.id !== id));
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: noteColor || colors.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        style={{ flex: 1, padding: 16 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Title */}
        <TextInput
          style={{
            fontSize: 22, fontWeight: '700', color: colors.text,
            borderBottomWidth: 1, borderColor: colors.border,
            paddingBottom: 8, marginBottom: 12,
          }}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
          placeholderTextColor={colors.subtext}
        />

        {/* Content */}
        <TextInput
          style={{
            fontSize: 15, color: colors.text, minHeight: 120,
            marginBottom: 20, lineHeight: 22,
          }}
          placeholder="Write your note here..."
          value={content}
          onChangeText={setContent}
          multiline
          placeholderTextColor={colors.subtext}
          textAlignVertical="top"
        />

        {/* Checklist Section */}
        <Text style={{ fontSize: 14, fontWeight: '700', color: colors.subtext, marginBottom: 8, marginTop: 8 }}>
          ✅ Checklist
        </Text>
        {checklist.map(item => (
          <View key={item.id} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 8 }}>
            <TouchableOpacity onPress={() => toggleTask(item.id)}>
              <Text style={{ fontSize: 20 }}>{item.checked ? '☑️' : '⬜'}</Text>
            </TouchableOpacity>
            <Text style={{
              flex: 1, fontSize: 14, color: colors.text,
              textDecorationLine: item.checked ? 'line-through' : 'none',
            }}>
              {item.text}
            </Text>
            <TouchableOpacity onPress={() => deleteTask(item.id)}>
              <Text style={{ color: colors.danger, fontSize: 16, paddingHorizontal: 4 }}>✕</Text>
            </TouchableOpacity>
          </View>
        ))}
        <View style={{ flexDirection: 'row', gap: 8, marginTop: 8, marginBottom: 20 }}>
          <TextInput
            style={{
              flex: 1, borderWidth: 1, borderColor: colors.border,
              borderRadius: 10, paddingHorizontal: 12, paddingVertical: 8,
              fontSize: 14, color: colors.text, backgroundColor: colors.surface,
            }}
            placeholder="Add a task..."
            value={newTask}
            onChangeText={setNewTask}
            onSubmitEditing={addTask}
            placeholderTextColor={colors.subtext}
          />
          <TouchableOpacity
            style={{
              backgroundColor: colors.primary, borderRadius: 10,
              paddingHorizontal: 16, justifyContent: 'center',
            }}
            onPress={addTask}
          >
            <Text style={{ fontWeight: '700', color: '#1A1A1A' }}>Add</Text>
          </TouchableOpacity>
        </View>

        {/* Toolbar */}
        <View style={{
          flexDirection: 'row', gap: 10, marginBottom: 16,
          paddingVertical: 12, paddingHorizontal: 8,
          backgroundColor: colors.surface, borderRadius: 14,
          borderWidth: 1, borderColor: colors.border,
        }}>
          <TouchableOpacity
            style={{
              flex: 1, flexDirection: 'row', alignItems: 'center',
              justifyContent: 'center', gap: 6,
              backgroundColor: isRecording ? colors.danger : colors.primary,
              borderRadius: 10, paddingVertical: 10,
            }}
            onPress={isRecording ? stopRecording : startRecording}
          >
            <Text style={{ fontSize: 16 }}>{isRecording ? '⏹️' : '🎤'}</Text>
            <Text style={{ fontWeight: '700', color: '#1A1A1A', fontSize: 13 }}>
              {isRecording ? 'Stop' : 'Record'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flex: 1, flexDirection: 'row', alignItems: 'center',
              justifyContent: 'center', gap: 6,
              backgroundColor: colors.background, borderRadius: 10,
              paddingVertical: 10, borderWidth: 1, borderColor: colors.border,
            }}
            onPress={pickImage}
          >
            <Text style={{ fontSize: 16 }}>🖼️</Text>
            <Text style={{ fontWeight: '700', color: colors.text, fontSize: 13 }}>Image</Text>
          </TouchableOpacity>
        </View>

        {/* Recordings List */}
        {recordings.length > 0 && (
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 14, fontWeight: '700', color: colors.subtext, marginBottom: 8 }}>
              🎤 Voice Notes ({recordings.length})
            </Text>
            {recordings.map((rec, index) => (
              <View key={rec.id} style={{
                flexDirection: 'row', alignItems: 'center',
                backgroundColor: colors.surface, borderRadius: 12,
                padding: 12, marginBottom: 8, gap: 10,
                borderWidth: 1, borderColor: colors.border,
              }}>
                <Text style={{ fontSize: 16 }}>🎤</Text>
                <Text style={{ flex: 1, color: colors.text, fontSize: 13, fontWeight: '600' }}>
                  Recording {index + 1}
                </Text>
                <TouchableOpacity
                  style={{
                    backgroundColor: playingId === rec.id ? colors.danger : '#C8E6C9',
                    borderRadius: 8, paddingHorizontal: 12, paddingVertical: 6,
                  }}
                  onPress={() => playRecording(rec)}
                >
                  <Text style={{ fontSize: 13, fontWeight: '700', color: '#1A1A1A' }}>
                    {playingId === rec.id ? '⏹️' : '▶️'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#FFCDD2', borderRadius: 8,
                    paddingHorizontal: 12, paddingVertical: 6,
                  }}
                  onPress={() => deleteRecording(rec.id)}
                >
                  <Text style={{ fontSize: 13, fontWeight: '700', color: '#1A1A1A' }}>🗑️</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* Images List */}
        {images.length > 0 && (
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 14, fontWeight: '700', color: colors.subtext, marginBottom: 8 }}>
              🖼️ Images ({images.length})
            </Text>
            {images.map((img) => (
              <View key={img.id} style={{ marginBottom: 12, position: 'relative' }}>
                <Image
                  source={{ uri: img.uri }}
                  style={{ width: '100%', height: 200, borderRadius: 12 }}
                />
                <TouchableOpacity
                  style={{
                    position: 'absolute', top: 8, right: 8,
                    backgroundColor: 'rgba(0,0,0,0.6)', borderRadius: 20,
                    width: 28, height: 28, justifyContent: 'center', alignItems: 'center',
                  }}
                  onPress={() => deleteImage(img.id)}
                >
                  <Text style={{ color: '#fff', fontSize: 12, fontWeight: '700' }}>✕</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* Color Palette */}
        <Text style={{ fontSize: 14, fontWeight: '700', color: colors.subtext, marginBottom: 8, marginTop: 8 }}>
          🎨 Note Color
        </Text>
        <View style={{ flexDirection: 'row', gap: 10, marginBottom: 24, flexWrap: 'wrap' }}>
          {NOTE_COLORS.map((color, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setNoteColor(color)}
              style={{
                width: 36, height: 36,
                borderRadius: 18,
                backgroundColor: color || colors.surface,
                borderWidth: noteColor === color ? 3 : 1.5,
                borderColor: noteColor === color ? colors.text : colors.border,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {color === null && (
                <Text style={{ fontSize: 16 }}>🚫</Text>
              )}
              {noteColor === color && color !== null && (
                <Text style={{ fontSize: 14 }}>✓</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}
