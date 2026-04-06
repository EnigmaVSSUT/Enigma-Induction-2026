package com.example.notesapp.util

import android.content.Context
import android.graphics.Canvas
import android.graphics.Paint
import android.graphics.pdf.PdfDocument
import android.os.Environment
import android.widget.Toast
import com.example.notesapp.data.Note
import java.io.File
import java.io.FileOutputStream

object PdfExporter {
    fun exportNoteToPdf(context: Context, note: Note) {
        val pdfDocument = PdfDocument()
        val pageInfo = PdfDocument.PageInfo.Builder(595, 842, 1).create() // A4 size
        val page = pdfDocument.startPage(pageInfo)
        val canvas: Canvas = page.canvas
        val paint = Paint()

        var y = 50f
        paint.textSize = 24f
        paint.isFakeBoldText = true
        canvas.drawText(note.title.ifEmpty { "Untitled" }, 50f, y, paint)

        y += 40f
        paint.textSize = 16f
        paint.isFakeBoldText = false
        
        val lines = note.content.split("\n")
        for (line in lines) {
            if (y > 800) break // Simple pagination avoid for now
            canvas.drawText(line, 50f, y, paint)
            y += 20f
        }

        pdfDocument.finishPage(page)

        val fileName = "Note_${System.currentTimeMillis()}.pdf"
        val file = File(context.getExternalFilesDir(Environment.DIRECTORY_DOCUMENTS), fileName)

        try {
            pdfDocument.writeTo(FileOutputStream(file))
            Toast.makeText(context, "Exported to ${file.absolutePath}", Toast.LENGTH_LONG).show()
        } catch (e: Exception) {
            e.printStackTrace()
            Toast.makeText(context, "Failed to export PDF", Toast.LENGTH_SHORT).show()
        } finally {
            pdfDocument.close()
        }
    }
}
