package com.aslibrary.asproject.repositories;

import com.aslibrary.asproject.entities.Gender;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GenderRepository extends JpaRepository<Gender, Integer>{
}
