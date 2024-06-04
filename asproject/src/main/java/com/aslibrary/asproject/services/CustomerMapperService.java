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
                customer.getName(), customer.getAge(), customer.getIdCity(), customer.getIdCountry(), customer.getIdGender()
        );
    }

}
