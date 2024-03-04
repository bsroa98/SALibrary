package com.aslibrary.asproject.services;

import com.aslibrary.asproject.entities.Book;
import com.aslibrary.asproject.repositories.BookCrudRepository;
import com.aslibrary.asproject.repositories.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class BookService {
    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private BookCrudRepository bookCrudRepository;


    public BookService(BookRepository bookRepository, BookCrudRepository bookCrudRepository)
    {
        this.bookRepository = bookRepository;
        this.bookCrudRepository=bookCrudRepository;
    }

    public Optional<Book> findBookById(int id){return bookCrudRepository.findById(id);}

    public Optional<Book> findBookByIsbn(String isbn){return bookRepository.findByIsbn(isbn);}

    public Optional<Book> findBookByTitle(String title){return bookRepository.findByTitle(title);}

    public void saveBook(Book book) {
        Book savedBook = bookRepository.save(book);
        ResponseEntity.status(HttpStatus.CREATED).body(savedBook);
    }

}

