package com.example.notesapp.data.model

import androidx.room.Entity
import androidx.room.PrimaryKey
import java.io.Serializable

@Entity(tableName = "notes_table")
data class Note(
    @PrimaryKey(autoGenerate = true)
    val id: Int = 0,
    val title: String,
    val description: String,
    val date: String,
    val imagePath: String? = null,
    val audioPath: String? = null,
    val color: Int = -1,
    val isChecklist: Boolean = false,
    val checklistData: String? = null // Can store JSON or formatted string
) : Serializable
