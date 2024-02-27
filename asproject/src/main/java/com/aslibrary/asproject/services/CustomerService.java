package com.aslibrary.asproject.services;

import com.aslibrary.asproject.entities.Customer;
import com.aslibrary.asproject.repositories.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    public Optional<Customer> findById(Integer idCustomer) {
        return customerRepository.findById(idCustomer);
    }
}
