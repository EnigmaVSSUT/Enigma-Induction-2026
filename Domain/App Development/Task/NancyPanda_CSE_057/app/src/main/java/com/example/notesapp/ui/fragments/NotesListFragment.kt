package com.example.notesapp.ui.fragments

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.appcompat.app.AppCompatDelegate
import androidx.appcompat.widget.SearchView
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import androidx.navigation.fragment.findNavController
import androidx.recyclerview.widget.StaggeredGridLayoutManager
import com.example.notesapp.R
import com.example.notesapp.databinding.FragmentNotesListBinding
import com.example.notesapp.ui.adapter.NotesAdapter
import com.example.notesapp.ui.viewmodel.NoteViewModel

class NotesListFragment : Fragment() {

    private var _binding: FragmentNotesListBinding? = null
    private val binding get() = _binding!!

    private val viewModel: NoteViewModel by viewModels()
    private lateinit var notesAdapter: NotesAdapter

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentNotesListBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        setupRecyclerView()
        observeNotes()

        binding.fabAddNote.setOnClickListener {
            findNavController().navigate(R.id.action_notesListFragment_to_addEditNoteFragment)
        }

        setupSearchAndTheme()
    }

    private fun setupRecyclerView() {
        notesAdapter = NotesAdapter { note ->
            val action = NotesListFragmentDirections.actionNotesListFragmentToAddEditNoteFragment(note)
            findNavController().navigate(action)
        }
        binding.rvNotes.apply {
            layoutManager = StaggeredGridLayoutManager(2, StaggeredGridLayoutManager.VERTICAL)
            adapter = notesAdapter
        }
    }

    private fun observeNotes() {
        viewModel.allNotes.observe(viewLifecycleOwner) { notes ->
            notesAdapter.submitList(notes)
            binding.tvNoNotes.visibility = if (notes.isEmpty()) View.VISIBLE else View.GONE
        }
    }

    private fun setupSearchAndTheme() {
        binding.toolbar.inflateMenu(R.menu.menu_search)
        
        val searchItem = binding.toolbar.menu.findItem(R.id.action_search)
        val searchView = searchItem.actionView as? SearchView
        searchView?.queryHint = getString(R.string.search_notes)

        searchView?.setOnQueryTextListener(object : SearchView.OnQueryTextListener {
            override fun onQueryTextSubmit(query: String?): Boolean = false
            override fun onQueryTextChange(newText: String?): Boolean {
                if (newText != null) searchNotes(newText)
                return true
            }
        })

        binding.toolbar.setOnMenuItemClickListener {
            when (it.itemId) {
                R.id.action_theme -> {
                    toggleTheme()
                    true
                }
                else -> false
            }
        }
    }

    private fun toggleTheme() {
        val currentMode = AppCompatDelegate.getDefaultNightMode()
        if (currentMode == AppCompatDelegate.MODE_NIGHT_YES) {
            AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_NO)
        } else {
            AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_YES)
        }
    }

    private fun searchNotes(query: String) {
        val searchQuery = "%$query%"
        viewModel.searchNotes(searchQuery).observe(viewLifecycleOwner) { list ->
            notesAdapter.submitList(list)
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}
