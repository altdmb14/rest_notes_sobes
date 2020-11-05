package ru.exampletest.rest_notes.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.exampletest.rest_notes.model.Note;

public interface NoteRepo extends JpaRepository<Note, Long> {
}
