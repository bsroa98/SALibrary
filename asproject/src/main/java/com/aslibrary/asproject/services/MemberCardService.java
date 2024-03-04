package com.aslibrary.asproject.services;

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
    public void rechargeBalance(Double rechargeValue,Integer idMemberCard, Integer idCustomer) {
        Optional<Customer> optionalCustomer = customerService.findById(idCustomer);
        if (optionalCustomer.isPresent()){
            Customer customer = optionalCustomer.get();
            MemberCard customerCard = customer.getIdMemberCard();
            if (rechargeValue >= 50000 && rechargeValue <=200000) {
                Double currentBalance = customerCard.getBalance();
                Double newBalance = currentBalance + rechargeValue;
                customerCard.setBalance(newBalance);
                this.saveBalance(customerCard, newBalance);
            }
            else{
                throw new RuntimeException("The value of recharge is not allowed. Only between 50.000 and 200.000");
            }
        }
        else {
            throw new RuntimeException("DataNotFound");
        }

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
