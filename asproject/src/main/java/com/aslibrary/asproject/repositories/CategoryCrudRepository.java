package com.aslibrary.asproject.repositories;

import com.aslibrary.asproject.entities.Category;
import org.springframework.data.repository.CrudRepository;

public interface CategoryCrudRepository extends CrudRepository<Category,Integer> {
}
