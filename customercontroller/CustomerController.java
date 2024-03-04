package com.aslibrary.asproject.controller;

import com.aslibrary.asproject.entities.Customer;
import com.aslibrary.asproject.services.CustomerService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/customer")
public class CustomerController {
    @Autowired
    private CustomerService customerService;

    @PutMapping("/{customerId}/update")
    public ResponseEntity<String> updateCustomerData(
            @PathVariable Integer customerId,
            @RequestBody @Valid Customer updatedCustomer) {

        if (!customerService.existsById(customerId)) {
            return ResponseEntity.badRequest().body("El cliente con ID " + customerId + " no existe.");
        }

        customerService.updateCustomerData(customerId, updatedCustomer);

        return ResponseEntity.ok("Datos del cliente actualizados con éxito.");
    }
}
