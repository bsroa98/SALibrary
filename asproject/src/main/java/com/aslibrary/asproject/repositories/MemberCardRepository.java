package com.aslibrary.asproject.repositories;

import com.aslibrary.asproject.entities.MemberCard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberCardRepository extends JpaRepository<MemberCard,Integer> {
}
