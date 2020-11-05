package ru.exampletest.rest_notes.service;

import ru.exampletest.rest_notes.model.Note;

import java.util.List;

public interface NoteService {
    /*Добавление новой заметки*/
    Note create(Note note);

    /*Получение списка заметок*/
    List<Note> readAll();

    /*Редактирование заметки*/
    Note update(Note note);

    /*Удаление заметки*/
    void delete(Note note);
}
