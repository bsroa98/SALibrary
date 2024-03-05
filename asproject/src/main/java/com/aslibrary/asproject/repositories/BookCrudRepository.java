package com.aslibrary.asproject.repositories;

import com.aslibrary.asproject.entities.Book;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookCrudRepository extends CrudRepository <Book,Integer> {



}
