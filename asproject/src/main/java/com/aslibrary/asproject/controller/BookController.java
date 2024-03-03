package com.aslibrary.asproject.controller;

import com.aslibrary.asproject.entities.Book;
import com.aslibrary.asproject.services.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/book")
public class BookController {

    @Autowired
    private BookService bookService;

    @GetMapping("/{id}")
    public Optional<Book> getBook(@PathVariable int id){
        return bookService.findBookById(id);
    }

    @GetMapping("/isbn/{isbn}")
    public Optional<Book> getBookByIsbn(@PathVariable String isbn){
        return bookService.findBookByIsbn(isbn);
    }

    @GetMapping("/title/{title}")
    public Optional<Book> getBookByTitle(@PathVariable String title){
        return bookService.findBookByTitle(title);
    }
}
