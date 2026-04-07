package com.example.notesapp.ui.adapter

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.example.notesapp.data.model.Note
import com.example.notesapp.databinding.ItemNoteBinding

class NotesAdapter(private val onNoteClick: (Note) -> Unit) :
    ListAdapter<Note, NotesAdapter.NoteViewHolder>(NoteDiffCallback()) {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): NoteViewHolder {
        val binding = ItemNoteBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return NoteViewHolder(binding)
    }

    override fun onBindViewHolder(holder: NoteViewHolder, position: Int) {
        val note = getItem(position)
        holder.bind(note)
    }

    inner class NoteViewHolder(private val binding: ItemNoteBinding) :
        RecyclerView.ViewHolder(binding.root) {

        fun bind(note: Note) {
            binding.apply {
                tvNoteTitle.text = note.title
                tvNoteDescription.text = note.description
                tvNoteDate.text = note.date

                if (note.imagePath != null) {
                    ivNoteImage.visibility = View.VISIBLE
                    Glide.with(itemView.context).load(note.imagePath).into(ivNoteImage)
                } else {
                    ivNoteImage.visibility = View.GONE
                }

                if (note.audioPath != null) {
                    ivAudioIcon.visibility = View.VISIBLE
                } else {
                    ivAudioIcon.visibility = View.GONE
                }

                root.setOnClickListener {
                    onNoteClick(note)
                }
            }
        }
    }

    class NoteDiffCallback : DiffUtil.ItemCallback<Note>() {
        override fun areItemsTheSame(oldItem: Note, newItem: Note): Boolean {
            return oldItem.id == newItem.id
        }

        override fun areContentsTheSame(oldItem: Note, newItem: Note): Boolean {
            return oldItem == newItem
        }
    }
}
