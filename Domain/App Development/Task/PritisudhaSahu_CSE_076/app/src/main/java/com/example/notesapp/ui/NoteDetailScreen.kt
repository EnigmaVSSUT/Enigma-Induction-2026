package com.example.notesapp.ui

import android.Manifest
import android.content.Context
import android.media.MediaPlayer
import android.net.Uri
import android.widget.Toast
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.toArgb
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp
import androidx.core.content.FileProvider
import coil.compose.AsyncImage
import com.example.notesapp.data.ChecklistItem
import com.example.notesapp.data.Note
import com.example.notesapp.util.AudioRecorder
import com.example.notesapp.util.PdfExporter
import com.example.notesapp.viewmodel.NoteViewModel
import java.io.File

val noteColors = listOf(
    Color(0xFFFFFFFF), // White
    Color(0xFFF28B82), // Red
    Color(0xFFFBBC04), // Orange
    Color(0xFFFFF475), // Yellow
    Color(0xFFCCFF90), // Green
    Color(0xFFA7FFEB), // Teal
    Color(0xFFCBF0F8), // Light Blue
    Color(0xFFAECBFA), // Dark Blue
    Color(0xFFD7AEFB), // Purple
    Color(0xFFFDCFE8), // Pink
    Color(0xFFE6C9A8), // Brown
    Color(0xFFE8EAED)  // Gray
)

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun NoteDetailScreen(
    viewModel: NoteViewModel,
    noteId: Int?,
    onBack: () -> Unit
) {
    val context = LocalContext.current
    var title by remember { mutableStateOf("") }
    var content by remember { mutableStateOf("") }
    var imageUri by remember { mutableStateOf<String?>(null) }
    var audioPath by remember { mutableStateOf<String?>(null) }
    var isChecklist by remember { mutableStateOf(false) }
    var noteColor by remember { mutableStateOf(noteColors[0]) }
    var existingNote by remember { mutableStateOf<Note?>(null) }

    var isRecording by remember { mutableStateOf(false) }
    val audioRecorder = remember { AudioRecorder(context) }
    var recordingFile by remember { mutableStateOf<File?>(null) }

    var localChecklistItems by remember { mutableStateOf(emptyList<ChecklistItem>()) }
    
    val dbChecklistItemsState: State<List<ChecklistItem>>? = if (noteId != null && noteId != -1) {
        viewModel.getChecklistItems(noteId).collectAsState(initial = emptyList())
    } else {
        null
    }

    val checklistItems = dbChecklistItemsState?.value ?: localChecklistItems

    val imagePickerLauncher = rememberLauncherForActivityResult(
        contract = ActivityResultContracts.GetContent()
    ) { uri: Uri? ->
        imageUri = uri?.toString()
    }

    var tempImageUri by remember { mutableStateOf<Uri?>(null) }
    val cameraLauncher = rememberLauncherForActivityResult(
        contract = ActivityResultContracts.TakePicture()
    ) { success: Boolean ->
        if (success) {
            imageUri = tempImageUri?.toString()
        }
    }

    val cameraPermissionLauncher = rememberLauncherForActivityResult(
        contract = ActivityResultContracts.RequestPermission()
    ) { isGranted: Boolean ->
        if (isGranted) {
            val file = File(context.cacheDir, "camera_${System.currentTimeMillis()}.jpg")
            val uri = FileProvider.getUriForFile(context, "com.example.notesapp.provider", file)
            tempImageUri = uri
            cameraLauncher.launch(uri)
        } else {
            Toast.makeText(context, "Camera permission denied", Toast.LENGTH_SHORT).show()
        }
    }

    val audioPermissionLauncher = rememberLauncherForActivityResult(
        contract = ActivityResultContracts.RequestPermission()
    ) { isGranted: Boolean ->
        if (isGranted) {
            val file = File(context.cacheDir, "audio_${System.currentTimeMillis()}.mp3")
            recordingFile = file
            audioRecorder.start(file)
            isRecording = true
        } else {
            Toast.makeText(context, "Audio permission denied", Toast.LENGTH_SHORT).show()
        }
    }

    LaunchedEffect(noteId) {
        if (noteId != null && noteId != -1) {
            val note = viewModel.getNoteById(noteId)
            if (note != null) {
                existingNote = note
                title = note.title
                content = note.content
                imageUri = note.imageUri
                audioPath = note.audioPath
                isChecklist = note.isChecklist
                noteColor = Color(note.color)
            }
        }
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text(text = if (noteId == null || noteId == -1) "New Note" else "Edit Note") },
                navigationIcon = {
                    IconButton(onClick = onBack) {
                        Icon(imageVector = Icons.Default.ArrowBack, contentDescription = "Back")
                    }
                },
                actions = {
                    IconButton(onClick = { isChecklist = !isChecklist }) {
                        Icon(
                            imageVector = if (isChecklist) Icons.Default.Notes else Icons.Default.CheckBox,
                            contentDescription = "Toggle Checklist"
                        )
                    }
                    IconButton(onClick = { imagePickerLauncher.launch("image/*") }) {
                        Icon(imageVector = Icons.Default.Image, contentDescription = "Add Image")
                    }
                    IconButton(onClick = {
                        cameraPermissionLauncher.launch(Manifest.permission.CAMERA)
                    }) {
                        Icon(imageVector = Icons.Default.PhotoCamera, contentDescription = "Take Photo")
                    }
                    if (existingNote != null) {
                        IconButton(onClick = {
                            PdfExporter.exportNoteToPdf(context, existingNote!!)
                        }) {
                            Icon(imageVector = Icons.Default.PictureAsPdf, contentDescription = "Export PDF")
                        }
                        IconButton(onClick = {
                            viewModel.deleteNote(existingNote!!)
                            onBack()
                        }) {
                            Icon(imageVector = Icons.Default.Delete, contentDescription = "Delete Note")
                        }
                    }
                    IconButton(onClick = {
                        val note = Note(
                            id = if (noteId == null || noteId == -1) 0 else noteId,
                            title = title,
                            content = content,
                            imageUri = imageUri,
                            audioPath = audioPath,
                            isChecklist = isChecklist,
                            color = noteColor.toArgb()
                        )
                        viewModel.insertNote(note)
                        onBack()
                    }) {
                        Icon(imageVector = Icons.Default.Save, contentDescription = "Save Note")
                    }
                }
            )
        },
        containerColor = noteColor
    ) { paddingValues ->
        Column(
            modifier = Modifier
                .padding(paddingValues)
                .fillMaxSize()
                .padding(16.dp)
        ) {
            OutlinedTextField(
                value = title,
                onValueChange = { title = it },
                label = { Text("Title") },
                modifier = Modifier.fillMaxWidth(),
                colors = OutlinedTextFieldDefaults.colors(
                    focusedBorderColor = Color.Black,
                    unfocusedBorderColor = Color.Gray
                )
            )
            Spacer(modifier = Modifier.height(8.dp))
            
            LazyRow(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                items(noteColors) { color ->
                    Box(
                        modifier = Modifier
                            .size(40.dp)
                            .clip(CircleShape)
                            .background(color)
                            .clickable { noteColor = color }
                            .then(
                                if (noteColor == color) {
                                    Modifier.background(Color.Black.copy(alpha = 0.2f))
                                } else {
                                    Modifier
                                }
                            )
                    )
                }
            }
            
            Spacer(modifier = Modifier.height(8.dp))

            if (isChecklist) {
                LazyColumn(modifier = Modifier.weight(1f)) {
                    items(checklistItems) { item ->
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Checkbox(
                                checked = item.isChecked,
                                onCheckedChange = { isChecked ->
                                    val updatedItems = checklistItems.map {
                                        if (it == item) it.copy(isChecked = isChecked) else it
                                    }
                                    if (dbChecklistItemsState != null) {
                                        viewModel.updateChecklistItem(item.copy(isChecked = isChecked))
                                    } else {
                                        localChecklistItems = updatedItems
                                    }
                                }
                            )
                            TextField(
                                value = item.text,
                                onValueChange = { newText ->
                                    val updatedItems = checklistItems.map {
                                        if (it == item) it.copy(text = newText) else it
                                    }
                                    if (dbChecklistItemsState != null) {
                                        viewModel.updateChecklistItem(item.copy(text = newText))
                                    } else {
                                        localChecklistItems = updatedItems
                                    }
                                },
                                modifier = Modifier.weight(1f)
                            )
                            IconButton(onClick = {
                                if (dbChecklistItemsState != null) {
                                    viewModel.deleteChecklistItem(item)
                                } else {
                                    localChecklistItems = checklistItems.filter { it != item }
                                }
                            }) {
                                Icon(Icons.Default.Delete, contentDescription = "Delete Item")
                            }
                        }
                    }
                    item {
                        Button(onClick = {
                            val newItem = ChecklistItem(noteId = noteId ?: 0, text = "")
                            if (dbChecklistItemsState != null) {
                                viewModel.insertChecklistItem(newItem)
                            } else {
                                localChecklistItems = localChecklistItems + newItem
                            }
                        }) {
                            Text("Add Item")
                        }
                    }
                }
            } else {
                OutlinedTextField(
                    value = content,
                    onValueChange = { content = it },
                    label = { Text("Content") },
                    modifier = Modifier
                        .fillMaxWidth()
                        .weight(1f),
                    colors = OutlinedTextFieldDefaults.colors(
                        focusedBorderColor = Color.Black,
                        unfocusedBorderColor = Color.Gray
                    )
                )
            }

            if (imageUri != null) {
                Box(modifier = Modifier.height(200.dp).fillMaxWidth()) {
                    AsyncImage(
                        model = imageUri,
                        contentDescription = "Note image",
                        modifier = Modifier.fillMaxSize().clip(RoundedCornerShape(8.dp)),
                        contentScale = ContentScale.Crop
                    )
                    IconButton(
                        onClick = { imageUri = null },
                        modifier = Modifier.align(Alignment.TopEnd)
                    ) {
                        Icon(Icons.Default.Close, contentDescription = "Remove Image", tint = Color.Red)
                    }
                }
            }

            if (audioPath != null) {
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    modifier = Modifier.padding(vertical = 8.dp)
                ) {
                    Icon(Icons.Default.Mic, contentDescription = "Audio note")
                    Text("Audio recording attached", modifier = Modifier.padding(start = 8.dp))
                    IconButton(onClick = {
                        val mediaPlayer = MediaPlayer().apply {
                            setDataSource(audioPath)
                            prepare()
                            start()
                        }
                    }) {
                        Icon(Icons.Default.PlayArrow, contentDescription = "Play Recording")
                    }
                    IconButton(onClick = { audioPath = null }) {
                        Icon(Icons.Default.Delete, contentDescription = "Delete Recording")
                    }
                }
            }

            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceEvenly
            ) {
                Button(
                    onClick = {
                        if (isRecording) {
                            audioRecorder.stop()
                            audioPath = recordingFile?.absolutePath
                            isRecording = false
                        } else {
                            audioPermissionLauncher.launch(Manifest.permission.RECORD_AUDIO)
                        }
                    },
                    colors = ButtonDefaults.buttonColors(
                        containerColor = if (isRecording) Color.Red else MaterialTheme.colorScheme.primary
                    )
                ) {
                    Icon(
                        imageVector = if (isRecording) Icons.Default.Stop else Icons.Default.Mic,
                        contentDescription = if (isRecording) "Stop Recording" else "Record Audio"
                    )
                    Text(if (isRecording) " Stop" else " Record")
                }
            }
        }
    }
}
