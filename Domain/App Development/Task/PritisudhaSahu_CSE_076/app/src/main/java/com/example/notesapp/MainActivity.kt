package com.example.notesapp

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.ui.Modifier
import androidx.core.splashscreen.SplashScreen.Companion.installSplashScreen
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import androidx.navigation.navArgument
import com.example.notesapp.ui.NoteDetailScreen
import com.example.notesapp.ui.NoteListScreen
import com.example.notesapp.ui.theme.NotesAppTheme
import com.example.notesapp.viewmodel.NoteViewModel

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        installSplashScreen()
        super.onCreate(savedInstanceState)
        setContent {
            NotesAppTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    val navController = rememberNavController()
                    val viewModel: NoteViewModel = viewModel()

                    NavHost(navController = navController, startDestination = "noteList") {
                        composable("noteList") {
                            NoteListScreen(
                                viewModel = viewModel,
                                onNoteClick = { noteId ->
                                    navController.navigate("noteDetail/$noteId")
                                },
                                onAddNoteClick = {
                                    navController.navigate("noteDetail/-1")
                                }
                            )
                        }
                        composable(
                            route = "noteDetail/{noteId}",
                            arguments = listOf(navArgument("noteId") { type = NavType.IntType })
                        ) { backStackEntry ->
                            val noteId = backStackEntry.arguments?.getInt("noteId")
                            NoteDetailScreen(
                                viewModel = viewModel,
                                noteId = noteId,
                                onBack = { navController.popBackStack() }
                            )
                        }
                    }
                }
            }
        }
    }
}
