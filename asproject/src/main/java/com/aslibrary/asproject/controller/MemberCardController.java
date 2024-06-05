package com.aslibrary.asproject.controller;

import com.aslibrary.asproject.entities.Customer;
import com.aslibrary.asproject.entities.MemberCard;
import com.aslibrary.asproject.services.CustomerService;
import com.aslibrary.asproject.services.MemberCardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/membercard")
public class MemberCardController {

    @Autowired
    private MemberCardService memberCardService;

    @Autowired
    private CustomerService customerService;

    @PutMapping("/customer/{idCustomer}/memberCar/{idMemberCard}")
    public ResponseEntity<String> rechargeBalance(@PathVariable Integer idMemberCard,
                                                  @RequestBody Map<String, Object> requestBody,
                                                  @PathVariable Integer idCustomer) {
        try {
            Double rechargeValue = ((Number) requestBody.get("rechargeValue")).doubleValue();

            memberCardService.rechargeBalance(rechargeValue, idMemberCard, idCustomer);
            return ResponseEntity.ok("Balance recharged successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Unsuccessful recharge: " + e.getMessage());
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Unsuccessful recharge: " + e.getMessage());
        }
    }

    @PostMapping("/generate/{idCustomer}")
    public ResponseEntity<MemberCard> generateMemberCard(@PathVariable Integer idCustomer) {
        try {
            Optional<Customer> customerOptional = customerService.findById(idCustomer);
            if (customerOptional.isPresent()) {
                Customer customer = customerOptional.get();
                if (customer.getMemberCard() == null) {
                    MemberCard newCard = memberCardService.generateMemberCard(customer);
                    customer.setMemberCard(newCard);
                    customerService.saveCustomer(customer);
                    return ResponseEntity.status(HttpStatus.CREATED).body(newCard);
                } else {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
                }
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/customer/{idCustomer}")
    public ResponseEntity<MemberCard> getMemberCard(@PathVariable Integer idCustomer) {
        Optional<MemberCard> memberCard = memberCardService.findByCustomerId(idCustomer);
        return memberCard.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }
}
