package com.aslibrary.asproject.controller;

import com.aslibrary.asproject.dto.CustomerDTO;
import com.aslibrary.asproject.entities.Customer;
import com.aslibrary.asproject.services.CustomerService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@RequestMapping("/api/customers")
@CrossOrigin(origins = "http://localhost:3000")
public class CreateCustomer {

    @Autowired
    private CustomerService customerService;

    @PostMapping("/create")
    public ResponseEntity<Customer> createCustomer(@RequestBody CustomerDTO customerDTO) {
        Customer createdCustomer = customerService.createCustomer(customerDTO);
        return ResponseEntity.ok(createdCustomer);
    }

    @PostMapping("/{customerId}/update")
    public ResponseEntity<String> updateCustomerData(
            @PathVariable Integer customerId,
            @RequestBody @Valid Customer updatedCustomer) {

        return customerService.updateCustomerData(customerId, updatedCustomer);
    }
}
