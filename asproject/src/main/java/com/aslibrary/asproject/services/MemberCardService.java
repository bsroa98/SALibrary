package com.aslibrary.asproject.services;

import com.aslibrary.asproject.entities.Book;
import com.aslibrary.asproject.entities.Customer;
import com.aslibrary.asproject.entities.MemberCard;
import com.aslibrary.asproject.repositories.MemberCardRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MemberCardService {
    @Autowired
    private MemberCardRepository memberCardRepository;

    @Autowired
    private CustomerService customerService;

    @Transactional
    public void rechargeBalance(Double rechargeValue, Integer idMemberCard, Integer idCustomer) {
        Optional<Customer> optionalCustomer = customerService.findById(idCustomer);
        Optional<MemberCard> optionalMemberCard = memberCardRepository.findById(idMemberCard);
        if (optionalCustomer.isPresent() && optionalMemberCard.isPresent()) {
            Customer customer = optionalCustomer.get();
            System.out.println(customer);
            MemberCard memberCard = optionalMemberCard.get();
            System.out.println(memberCard);
            if (rechargeValue >= 50000 && rechargeValue <= 200000) {
                Double currentBalance = memberCard.getBalance();
                Double newBalance = currentBalance + rechargeValue;
                memberCard.setBalance(newBalance);
                saveBalance(memberCard, newBalance);
            } else {
                throw new RuntimeException("The value of recharge is not allowed. Only between 50.000 and 200.000");
            }
        } else {
            throw new RuntimeException("Data not found");
        }
    }

    public Optional<MemberCard> findByIdMemberCard(Integer idMemberCard) {
        return memberCardRepository.findById(idMemberCard);
    }

    public ResponseEntity<MemberCard> saveCard(MemberCard memberCard) {
        MemberCard savedCard = memberCardRepository.save(memberCard);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedCard);
    }

    public ResponseEntity<MemberCard> saveBalance(MemberCard memberCard, Double newBalance) {
        memberCard.setBalance(newBalance);
        MemberCard savedBalance = memberCardRepository.save(memberCard);
        return ResponseEntity.status(HttpStatus.OK).body(savedBalance);
    }
}
