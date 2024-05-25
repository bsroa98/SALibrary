package com.aslibrary.asproject.services;

import com.aslibrary.asproject.entities.Customer;
import com.aslibrary.asproject.repositories.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    public boolean existsById(Integer customerId) {
        return customerRepository.existsById(customerId);
    }

    @Transactional
    public ResponseEntity<String> updateCustomerData(Integer customerId, Customer updatedCustomer) {
        Optional<Customer> existingCustomerOpt = customerRepository.findById(customerId);

        if (!existingCustomerOpt.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("El cliente con ID " + customerId + " no existe.");
        }

        Customer existingCustomer = existingCustomerOpt.get();
        existingCustomer.setName(updatedCustomer.getName());
        existingCustomer.setIdOccupation(updatedCustomer.getIdOccupation());
        existingCustomer.setIdCity(updatedCustomer.getIdCity());
        existingCustomer.setIdCountry(updatedCustomer.getIdCountry());
        existingCustomer.setAge(updatedCustomer.getAge());
        existingCustomer.setIdGender(updatedCustomer.getIdGender());
        existingCustomer.setIdMemberCard(updatedCustomer.getIdMemberCard());

        customerRepository.save(existingCustomer);

        return ResponseEntity.ok("Datos del cliente actualizados con éxito.");
    }

    public ResponseEntity<Customer> createCustomer(Customer customer) {
        Customer customerSaved = customerRepository.save(customer);
        return ResponseEntity.status(HttpStatus.CREATED).body(customerSaved);
    }
}