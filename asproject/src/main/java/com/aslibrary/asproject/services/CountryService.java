package com.aslibrary.asproject.services;

import com.aslibrary.asproject.entities.Country;
import com.aslibrary.asproject.repositories.CountryCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CountryService {

    @Autowired
    CountryCrudRepository countryCrudRepository;

    public Optional<Country> getCountryById(Integer id){return countryCrudRepository.findById(id);}
}
