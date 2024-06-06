package com.aslibrary.asproject.services;

import com.aslibrary.asproject.dto.CustomerDTO;
import com.aslibrary.asproject.entities.*;
import com.aslibrary.asproject.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.util.Optional;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private CityRepository cityRepository;

    @Autowired
    private CountryRepository countryRepository;

    @Autowired
    private GenderRepository genderRepository;

    @Autowired
    private OccupationRepository occupationRepository;

    @Autowired
    private MemberCardRepository memberCardRepository;

    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    public Optional<Customer> findById(Integer idCustomer) {
        return customerRepository.findById(idCustomer);
    }

    public boolean existsById(Integer customerId) {
        return customerRepository.existsById(customerId);
    }

    public void saveCustomer(Customer customer) { customerRepository.save(customer); }

    public Customer validateCustomer(String email, String password) {
        Customer customer = customerRepository.findByEmail(email);
        if (customer != null && customer.getPassword().equals(password)) {
            return customer;
        }
        return null;
    }
    @Transactional
    public ResponseEntity<String> updateCustomerData(Integer customerId, Customer updatedCustomer) {
        if (!customerRepository.existsById(customerId)) {
            return ResponseEntity.badRequest().body("El cliente con ID " + customerId + " no existe.");
        }

        Customer existingCustomer = customerRepository.findById(customerId).orElseThrow(() -> new RuntimeException("Customer not found"));

        existingCustomer.setName(updatedCustomer.getName());
        existingCustomer.setAge(updatedCustomer.getAge());
        existingCustomer.setIdCity(updatedCustomer.getIdCity());
        existingCustomer.setIdCountry(updatedCustomer.getIdCountry());
        existingCustomer.setIdGender(updatedCustomer.getIdGender());
        existingCustomer.setIdOccupation(updatedCustomer.getIdOccupation());

        customerRepository.save(existingCustomer);

        return ResponseEntity.ok("Datos del cliente actualizados con éxito.");
    }

    @Transactional
    public ResponseEntity<String> updateMemberCard(Integer customerId, Integer memberCardId) {
        if (!customerRepository.existsById(customerId)) {
            return ResponseEntity.badRequest().body("El cliente con ID " + customerId + " no existe.");
        }

        Customer existingCustomer = customerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        MemberCard memberCard = memberCardRepository.findById(memberCardId)
                .orElseThrow(() -> new RuntimeException("Member card not found"));

        existingCustomer.setIdMemberCard(memberCard);
        customerRepository.save(existingCustomer);

        return ResponseEntity.ok("Tarjeta de membresía actualizada con éxito.");
    }

    @Transactional
    public Customer createCustomer(CustomerDTO customerDTO) {
        Customer customer = new Customer();
        customer.setName(customerDTO.getName());
        customer.setAge(customerDTO.getAge());

        // Cargar y asociar City
        City city = cityRepository.findById(customerDTO.getIdCity())
                .orElseThrow(() -> new RuntimeException("City not found"));
        customer.setIdCity(city.getId());

        // Cargar y asociar Country
        Country country = countryRepository.findById(customerDTO.getIdCountry())
                .orElseThrow(() -> new RuntimeException("Country not found"));
        customer.setIdCountry(country.getId());

        // Cargar y asociar Gender
        Gender gender = genderRepository.findById(customerDTO.getIdGender())
                .orElseThrow(() -> new RuntimeException("Gender not found"));
        customer.setIdGender(gender.getId());

        // Cargar y asociar Occupation
        Occupation occupation = occupationRepository.findById(customerDTO.getIdOccupation())
                .orElseThrow(() -> new RuntimeException("Occupation not found"));
        customer.setIdOccupation(occupation.getId());

        customer.setEmail(customerDTO.getEmail());
        customer.setBirthdate(customerDTO.getBirthdate());
        customer.setPassword(customerDTO.getPassword());

        customer.setIdMemberCard(null);

        return customerRepository.save(customer);
    }

    public Customer findByEmail(String email) {
        return customerRepository.findByEmail(email);
    }

    public void updateCustomerPassword(Customer customer) {
        customerRepository.save(customer);
    }
}