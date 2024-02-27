package com.aslibrary.asproject.repositories;

import com.aslibrary.asproject.entities.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer,Integer> {
}
