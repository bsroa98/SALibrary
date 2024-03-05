package com.aslibrary.asproject.repositories;

import com.aslibrary.asproject.entities.BookPurchase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookPurchaseRepository extends JpaRepository<BookPurchase, Long> {

}
