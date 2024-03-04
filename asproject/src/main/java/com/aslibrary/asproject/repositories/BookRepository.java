package com.aslibrary.asproject.repositories;

import com.aslibrary.asproject.entities.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.io.Serializable;
import java.util.Optional;


@Repository
public interface BookRepository extends JpaRepository<Book,Long> {


   Optional<Book> findByIsbn(@Param("isbn") String isbn);

   Optional<Book> findByTitle(String title);



}
