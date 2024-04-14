package com.aslibrary.asproject.repositories;

import com.aslibrary.asproject.entities.Book;
import com.aslibrary.asproject.entities.Country;
import org.springframework.data.repository.CrudRepository;

public interface CountryCrudRepository extends CrudRepository<Country,Integer> {

}
