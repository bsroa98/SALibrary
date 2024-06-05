package com.aslibrary.asproject.services;

import com.aslibrary.asproject.dto.CustomerDTO;
import com.aslibrary.asproject.entities.Customer;
import org.springframework.stereotype.Service;

@Service
public class CustomerMapperService {



    public CustomerDTO toCustomerDTO(Customer customer) {
        if (customer == null) {
            return null;
        }
        return new CustomerDTO(
                customer.getId(), customer.getName(), customer.getAge(), customer.getIdCity(), customer.getIdCountry(), customer.getIdGender(),
                customer.getIdOccupation(), customer.getIdMemberCard().getCardNumber(),customer.getEmail(), customer.getBirthdate(), customer.getPassword()
        );
    }

}
