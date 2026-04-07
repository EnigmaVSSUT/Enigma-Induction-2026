package com.example.notesapp.data.database

import androidx.lifecycle.LiveData
import androidx.room.*
import com.example.notesapp.data.model.Note

@Dao
interface NoteDao {

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insert(note: Note)

    @Update
    suspend fun update(note: Note)

    @Delete
    suspend fun delete(note: Note)

    @Query("SELECT * FROM notes_table ORDER BY id DESC")
    fun getAllNotes(): LiveData<List<Note>>

    @Query("SELECT * FROM notes_table WHERE title LIKE :searchQuery OR description LIKE :searchQuery")
    fun searchNotes(searchQuery: String): LiveData<List<Note>>
}
