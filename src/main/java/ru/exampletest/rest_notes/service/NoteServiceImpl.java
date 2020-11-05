package ru.exampletest.rest_notes.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.exampletest.rest_notes.model.Note;
import ru.exampletest.rest_notes.repo.NoteRepo;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

@Service
public class NoteServiceImpl implements NoteService {
    private final NoteRepo noteRepo;
    private static final AtomicInteger NOTE_ID = new AtomicInteger();

    @Autowired
    public NoteServiceImpl(NoteRepo noteRepo) {
        this.noteRepo = noteRepo;
    }

    @Override
    public List<Note> readAll() {
        return noteRepo.findAll();
    }

    @Override
    public Note create(Note note) {
        note.setEditDate(LocalDateTime.now());
        return noteRepo.save(note);
    }
    @Override
    public Note update(Note note) {
        note.setEditDate(LocalDateTime.now());
        return noteRepo.save(note);
    }

    @Override
    public void delete(Note note) {
        noteRepo.delete(note);
    }
}
