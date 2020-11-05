package ru.exampletest.rest_notes.controller;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.exampletest.rest_notes.model.Note;
import ru.exampletest.rest_notes.service.NoteService;

import java.util.List;

@RestController
@RequestMapping("notes")
public class NotesController {
    private final NoteService noteService;

    @Autowired
    public NotesController(NoteService noteService) {
        this.noteService = noteService;
    }

    @GetMapping
    public List<Note> read() {
        return noteService.readAll();
    }

    @PostMapping
    public Note create(@RequestBody Note note) {
        return noteService.create(note);
    }

    @PutMapping("{id}")
    public Note update(@PathVariable("id") Note noteFromDb,
                       @RequestBody Note note) {
        BeanUtils.copyProperties(note, noteFromDb, "id");
        return noteService.update(noteFromDb);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable("id") Note note) {
        noteService.delete(note);
    }
}
