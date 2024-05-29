package com.aslibrary.asproject.repositories;

import com.aslibrary.asproject.entities.Occupation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OccupationRepository extends JpaRepository<Occupation, Integer> {
}
