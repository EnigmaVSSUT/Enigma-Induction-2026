package com.example.notesapp.ui.fragments

import android.Manifest
import android.app.Activity
import android.content.Intent
import android.content.pm.PackageManager
import android.media.MediaPlayer
import android.media.MediaRecorder
import android.net.Uri
import android.os.Bundle
import android.provider.MediaStore
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AlertDialog
import androidx.core.content.ContextCompat
import androidx.core.content.FileProvider
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import androidx.navigation.fragment.findNavController
import androidx.navigation.fragment.navArgs
import com.bumptech.glide.Glide
import com.example.notesapp.R
import com.example.notesapp.data.model.Note
import com.example.notesapp.databinding.FragmentAddEditNoteBinding
import com.example.notesapp.ui.viewmodel.NoteViewModel
import java.io.File
import java.io.IOException
import java.text.SimpleDateFormat
import java.util.*

class AddEditNoteFragment : Fragment() {

    private var _binding: FragmentAddEditNoteBinding? = null
    private val binding get() = _binding!!

    private val viewModel: NoteViewModel by viewModels()
    private val args: AddEditNoteFragmentArgs by navArgs()

    private var selectedImageUri: Uri? = null
    private var audioPath: String? = null
    private var mediaRecorder: MediaRecorder? = null
    private var mediaPlayer: MediaPlayer? = null
    private var isRecording = false
    private var isPlaying = false

    // Image Pick Launcher
    private val pickImageLauncher = registerForActivityResult(ActivityResultContracts.StartActivityForResult()) { result ->
        if (result.resultCode == Activity.RESULT_OK) {
            selectedImageUri = result.data?.data
            showImage(selectedImageUri)
        }
    }

    // Camera Launcher
    private var cameraImageUri: Uri? = null
    private val takePhotoLauncher = registerForActivityResult(ActivityResultContracts.TakePicture()) { success ->
        if (success) {
            selectedImageUri = cameraImageUri
            showImage(selectedImageUri)
        }
    }

    // Permissions Launcher
    private val requestPermissionLauncher = registerForActivityResult(ActivityResultContracts.RequestMultiplePermissions()) { permissions ->
        val audioGranted = permissions[Manifest.permission.RECORD_AUDIO] ?: false
        
        if (audioGranted && !isRecording) {
            startRecording()
        }
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentAddEditNoteBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        val note = args.note
        if (note != null) {
            setupEditMode(note)
        }

        binding.btnSaveNote.setOnClickListener { saveNote() }
        binding.btnAddImage.setOnClickListener { pickImage() }
        binding.btnTakePhoto.setOnClickListener { takePhoto() }
        binding.btnRecordAudio.setOnClickListener { toggleRecording() }
        binding.btnPlayPauseAudio.setOnClickListener { toggleAudioPlayback() }
        binding.btnDeleteAudio.setOnClickListener { deleteAudio() }

        binding.toolbar.setNavigationOnClickListener { findNavController().navigateUp() }

        if (note != null) {
            binding.toolbar.inflateMenu(R.menu.menu_add_edit)
            binding.toolbar.setOnMenuItemClickListener {
                if (it.itemId == R.id.action_delete) {
                    showDeleteDialog(note)
                    true
                } else false
            }
        }
    }

    private fun setupEditMode(note: Note) {
        binding.etNoteTitle.setText(note.title)
        binding.etNoteDescription.setText(note.description)
        if (note.imagePath != null) {
            selectedImageUri = Uri.parse(note.imagePath)
            showImage(selectedImageUri)
        }
        if (note.audioPath != null) {
            audioPath = note.audioPath
            binding.layoutAudioPlayer.visibility = View.VISIBLE
        }
    }

    private fun showImage(uri: Uri?) {
        uri?.let {
            binding.ivNoteImage.visibility = View.VISIBLE
            Glide.with(this).load(it).into(binding.ivNoteImage)
        }
    }

    private fun pickImage() {
        val intent = Intent(Intent.ACTION_PICK, MediaStore.Images.Media.EXTERNAL_CONTENT_URI)
        pickImageLauncher.launch(intent)
    }

    private fun takePhoto() {
        if (ContextCompat.checkSelfPermission(requireContext(), Manifest.permission.CAMERA) != PackageManager.PERMISSION_GRANTED) {
            requestPermissionLauncher.launch(arrayOf(Manifest.permission.CAMERA))
            return
        }
        val photoFile = File(requireContext().externalCacheDir, "photo_${System.currentTimeMillis()}.jpg")
        cameraImageUri = FileProvider.getUriForFile(requireContext(), "${requireContext().packageName}.provider", photoFile)
        takePhotoLauncher.launch(cameraImageUri)
    }

    private fun toggleRecording() {
        if (isRecording) {
            stopRecording()
        } else {
            if (ContextCompat.checkSelfPermission(requireContext(), Manifest.permission.RECORD_AUDIO) != PackageManager.PERMISSION_GRANTED) {
                requestPermissionLauncher.launch(arrayOf(Manifest.permission.RECORD_AUDIO))
            } else {
                startRecording()
            }
        }
    }

    private fun startRecording() {
        val file = File(requireContext().externalCacheDir, "recording_${System.currentTimeMillis()}.3gp")
        audioPath = file.absolutePath
        mediaRecorder = MediaRecorder().apply {
            setAudioSource(MediaRecorder.AudioSource.MIC)
            setOutputFormat(MediaRecorder.OutputFormat.THREE_GPP)
            setAudioEncoder(MediaRecorder.AudioEncoder.AMR_NB)
            setOutputFile(audioPath)
            try {
                prepare()
                start()
                this@AddEditNoteFragment.isRecording = true
                binding.btnRecordAudio.setImageResource(android.R.drawable.ic_media_pause)
                Toast.makeText(requireContext(), "Recording started...", Toast.LENGTH_SHORT).show()
            } catch (e: IOException) {
                e.printStackTrace()
            }
        }
    }

    private fun stopRecording() {
        mediaRecorder?.apply {
            stop()
            release()
        }
        mediaRecorder = null
        isRecording = false
        binding.btnRecordAudio.setImageResource(android.R.drawable.ic_btn_speak_now)
        binding.layoutAudioPlayer.visibility = View.VISIBLE
        Toast.makeText(requireContext(), "Recording saved", Toast.LENGTH_SHORT).show()
    }

    private fun toggleAudioPlayback() {
        if (isPlaying) pauseAudio() else playAudio()
    }

    private fun playAudio() {
        mediaPlayer = MediaPlayer().apply {
            try {
                setDataSource(audioPath)
                prepare()
                start()
                this@AddEditNoteFragment.isPlaying = true
                binding.btnPlayPauseAudio.setImageResource(android.R.drawable.ic_media_pause)
                setOnCompletionListener { pauseAudio() }
            } catch (e: IOException) {
                e.printStackTrace()
            }
        }
    }

    private fun pauseAudio() {
        mediaPlayer?.release()
        mediaPlayer = null
        isPlaying = false
        binding.btnPlayPauseAudio.setImageResource(android.R.drawable.ic_media_play)
    }

    private fun deleteAudio() {
        audioPath = null
        binding.layoutAudioPlayer.visibility = View.GONE
    }

    private fun saveNote() {
        val title = binding.etNoteTitle.text.toString()
        val description = binding.etNoteDescription.text.toString()

        if (title.isBlank() && description.isBlank()) {
            Toast.makeText(requireContext(), "Note cannot be empty", Toast.LENGTH_SHORT).show()
            return
        }

        val date = SimpleDateFormat("MMM dd, yyyy HH:mm", Locale.getDefault()).format(Date())
        val note = Note(
            id = args.note?.id ?: 0,
            title = title,
            description = description,
            date = date,
            imagePath = selectedImageUri?.toString(),
            audioPath = audioPath
        )

        if (args.note == null) viewModel.insert(note) else viewModel.update(note)
        findNavController().navigateUp()
    }

    private fun showDeleteDialog(note: Note) {
        AlertDialog.Builder(requireContext())
            .setTitle("Delete Note")
            .setMessage("Are you sure you want to delete this note?")
            .setPositiveButton("Delete") { _, _ ->
                viewModel.delete(note)
                findNavController().navigateUp()
            }
            .setNegativeButton("Cancel", null)
            .show()
    }

    override fun onDestroyView() {
        super.onDestroyView()
        mediaRecorder?.release()
        mediaPlayer?.release()
        _binding = null
    }
}
