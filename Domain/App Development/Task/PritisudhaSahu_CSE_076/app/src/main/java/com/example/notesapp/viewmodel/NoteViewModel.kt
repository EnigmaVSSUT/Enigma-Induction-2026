package com.example.notesapp.viewmodel

import android.app.Application
import androidx.lifecycle.*
import com.example.notesapp.data.ChecklistItem
import com.example.notesapp.data.Note
import com.example.notesapp.data.NoteDatabase
import com.example.notesapp.data.NoteRepository
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.launch

class NoteViewModel(application: Application) : AndroidViewModel(application) {
    private val repository: NoteRepository
    val allNotes: Flow<List<Note>>

    init {
        val noteDao = NoteDatabase.getDatabase(application).noteDao()
        repository = NoteRepository(noteDao)
        allNotes = repository.allNotes
    }

    suspend fun getNoteById(id: Int): Note? {
        return repository.getNoteById(id)
    }

    fun insertNote(note: Note, onResult: (Long) -> Unit = {}) = viewModelScope.launch(Dispatchers.IO) {
        val id = repository.insertNote(note)
        onResult(id)
    }

    fun deleteNote(note: Note) = viewModelScope.launch(Dispatchers.IO) {
        repository.deleteNote(note)
    }

    fun getChecklistItems(noteId: Int): Flow<List<ChecklistItem>> {
        return repository.getChecklistItems(noteId)
    }

    fun insertChecklistItem(item: ChecklistItem) = viewModelScope.launch(Dispatchers.IO) {
        repository.insertChecklistItem(item)
    }

    fun updateChecklistItem(item: ChecklistItem) = viewModelScope.launch(Dispatchers.IO) {
        repository.updateChecklistItem(item)
    }

    fun deleteChecklistItem(item: ChecklistItem) = viewModelScope.launch(Dispatchers.IO) {
        repository.deleteChecklistItem(item)
    }
}
