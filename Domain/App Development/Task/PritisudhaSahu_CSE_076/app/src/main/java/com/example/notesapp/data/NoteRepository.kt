package com.example.notesapp.data

import kotlinx.coroutines.flow.Flow

class NoteRepository(private val noteDao: NoteDao) {
    val allNotes: Flow<List<Note>> = noteDao.getAllNotes()

    suspend fun getNoteById(id: Int): Note? {
        return noteDao.getNoteById(id)
    }

    suspend fun insertNote(note: Note): Long {
        return noteDao.insertNote(note)
    }

    suspend fun deleteNote(note: Note) {
        noteDao.deleteNote(note)
        noteDao.deleteChecklistForNote(note.id)
    }

    fun getChecklistItems(noteId: Int): Flow<List<ChecklistItem>> {
        return noteDao.getChecklistItems(noteId)
    }

    suspend fun insertChecklistItem(item: ChecklistItem) {
        noteDao.insertChecklistItem(item)
    }

    suspend fun updateChecklistItem(item: ChecklistItem) {
        noteDao.updateChecklistItem(item)
    }

    suspend fun deleteChecklistItem(item: ChecklistItem) {
        noteDao.deleteChecklistItem(item)
    }
}
