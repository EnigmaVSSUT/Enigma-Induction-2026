package com.example.notesapp.data

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "notes")
data class Note(
    @PrimaryKey(autoGenerate = true) val id: Int = 0,
    val title: String = "",
    val content: String = "",
    val isChecklist: Boolean = false,
    val imageUri: String? = null,
    val audioPath: String? = null,
    val color: Int = 0xFFFFFFFF.toInt(), // Default white
    val timestamp: Long = System.currentTimeMillis()
)

@Entity(tableName = "checklist_items")
data class ChecklistItem(
    @PrimaryKey(autoGenerate = true) val id: Int = 0,
    val noteId: Int,
    val text: String,
    val isChecked: Boolean = false
)
