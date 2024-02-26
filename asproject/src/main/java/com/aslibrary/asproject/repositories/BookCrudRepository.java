package com.aslibrary.asproject.repositories;

import com.aslibrary.asproject.entities.Book;
import org.springframework.data.repository.CrudRepository;

public interface BookCrudRepository extends CrudRepository <Book,Integer> {



}
