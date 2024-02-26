package com.aslibrary.asproject.repositories;

import com.aslibrary.asproject.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category,Long> {
}
