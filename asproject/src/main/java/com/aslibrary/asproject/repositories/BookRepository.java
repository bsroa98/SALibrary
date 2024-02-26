package com.aslibrary.asproject.repositories;

import com.aslibrary.asproject.entities.Book;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BookRepository extends JpaRepository<Book, Long> {

    Optional<Book> findBookByIdBook(int idbook);

}
