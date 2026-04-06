package com.example.notesapp.data

import androidx.room.Dao
import androidx.room.Delete
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query
import androidx.room.Update
import kotlinx.coroutines.flow.Flow

@Dao
interface NoteDao {
    @Query("SELECT * FROM notes ORDER BY timestamp DESC")
    fun getAllNotes(): Flow<List<Note>>

    @Query("SELECT * FROM notes WHERE id = :id")
    suspend fun getNoteById(id: Int): Note?

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertNote(note: Note): Long

    @Delete
    suspend fun deleteNote(note: Note)

    @Query("SELECT * FROM checklist_items WHERE noteId = :noteId")
    fun getChecklistItems(noteId: Int): Flow<List<ChecklistItem>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertChecklistItem(item: ChecklistItem)

    @Update
    suspend fun updateChecklistItem(item: ChecklistItem)

    @Delete
    suspend fun deleteChecklistItem(item: ChecklistItem)
    
    @Query("DELETE FROM checklist_items WHERE noteId = :noteId")
    suspend fun deleteChecklistForNote(noteId: Int)
}
