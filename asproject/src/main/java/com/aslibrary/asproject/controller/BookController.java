package com.aslibrary.asproject.controller;

import com.aslibrary.asproject.entities.Book;
import com.aslibrary.asproject.entities.Country;
import com.aslibrary.asproject.repositories.BookRepository;
import com.aslibrary.asproject.services.BookService;
import com.aslibrary.asproject.services.CountryService;
import com.aslibrary.asproject.services.CustomerService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/book")
public class BookController {

    @Autowired
    private BookService bookService;

    @Autowired
    private CountryService countryService;

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

    private final BookRepository bookRepository;

    @Autowired
    public BookController(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @PostMapping("/create")
    @ResponseBody
    public ResponseEntity<String> createBook(@Valid @RequestBody Book book) {
        try {
            bookRepository.save(book);
            return new ResponseEntity<>("{\"message\": \"Libro creado exitosamente\"}", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("{\"error\": \"Error al crear el libro: " + e.getMessage() + "\"}", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
