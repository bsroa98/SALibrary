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
import java.util.Optional;

@RestController
@RequestMapping("/api/buy")
@CrossOrigin(origins = "http://localhost:3000")
public class BookPurchaseController {
    @Autowired
    private BookPurchaseService bookPurchaseService;

    @Autowired
    private MemberCardService memberCardService;

    @PostMapping("/payment")
    public ResponseEntity<String> processPayment(@RequestBody Cart paymentData) {
        Integer customerId = paymentData.getCustomerId();
        Integer membershipId = paymentData.getMembershipId();
        Double totalAmount = paymentData.getTotalAmount();
        List<Cart.Item> items = paymentData.getItems();

        Optional<MemberCard> memberCardOpt = memberCardService.findByCustomerAndMembershipId(customerId, membershipId);

        if (memberCardOpt.isPresent()) {
            MemberCard memberCard = memberCardOpt.get();
            Double currentBalance = memberCard.getBalance();
            if (currentBalance >= totalAmount) {
                for (Cart.Item item : items) {
                    Integer bookId = item.getBookId();
                    Integer quantity = item.getQuantity();
                    try {
                        bookPurchaseService.buyBook(quantity, bookId, customerId);
                    } catch (Exception e) {
                        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error purchasing book with ID: " + bookId);
                    }
                }
                memberCard.setBalance(currentBalance - totalAmount);
                memberCardService.saveCard(memberCard);
                return ResponseEntity.ok("Payment successful");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Insufficient balance");
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Member card not found");
        }
    }
}

