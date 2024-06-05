package com.aslibrary.asproject.controller;

import com.aslibrary.asproject.dto.Cart;
import com.aslibrary.asproject.entities.MemberCard;
import com.aslibrary.asproject.services.BookPurchaseService;
import com.aslibrary.asproject.services.MemberCardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/buy")
@CrossOrigin(origins = "http://localhost:3000")
public class BookPurchaseController {
    @Autowired
    private BookPurchaseService bookPurchaseService;

    @Autowired
    private MemberCardService memberCardService;

    @PostMapping("/book/")
    public ResponseEntity<String>  carPayment(@RequestBody List<Cart> cart){
        for(Cart item:cart){
            try {
                bookPurchaseService.buyBook(item.getQuantity(), item.getBookId(), item.getCustomerId());
            }catch (Exception e){
             return ResponseEntity.badRequest().body("Error");
            }
        }
        return ResponseEntity.ok("Success Buy");
    }

    @PostMapping("/payment")
    public ResponseEntity<String> processPayment(@RequestBody Map<String, Object> paymentData) {
        Integer customerId = (Integer) paymentData.get("customerId");
        Integer membershipId = (Integer) paymentData.get("membershipId");
        Double totalAmount = ((Number) paymentData.get("totalAmount")).doubleValue();

        Optional<MemberCard> memberCardOpt = memberCardService.findByCustomerAndMembershipId(customerId, membershipId);

        if (memberCardOpt.isPresent()) {
            MemberCard memberCard = memberCardOpt.get();
            Double currentBalance = memberCard.getBalance();
            if (currentBalance >= totalAmount) {
                Double newBalance = memberCard.setBalance(currentBalance - totalAmount);
                memberCardService.saveBalance(memberCard, newBalance);
                return ResponseEntity.ok("Payment successful");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Insufficient balance");
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Member card not found");
        }
    }
}
