package com.aslibrary.asproject.controller;

import com.aslibrary.asproject.dto.Cart;
import com.aslibrary.asproject.dto.PurchaseDTO;
import com.aslibrary.asproject.dto.CustomerDTO;
import com.aslibrary.asproject.entities.BookPurchase;
import com.aslibrary.asproject.services.*;
import com.aslibrary.asproject.entities.MemberCard;
import com.aslibrary.asproject.entities.Customer;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import jakarta.servlet.http.HttpServletRequest;
import java.util.*;

@RestController
@RequestMapping("/api/buy")
@CrossOrigin(origins = "http://localhost:3000")
public class BookPurchaseController {
    @Autowired
    private BookPurchaseService bookPurchaseService;

    @Autowired
    private MemberCardService memberCardService;

    @Autowired
    private CosmosDbService cosmosDbService;

    @Autowired
    private CustomerService customerService;

    @Autowired
    private CustomerMapperService customerMapperService;

    @Autowired
    private IpAddressService ipAddressService;

    @Autowired
    private BookService bookService;

    @PostMapping("/payment")
    public ResponseEntity<String> processPayment(@RequestBody Cart paymentData, HttpServletRequest request) {
        Integer customerId = paymentData.getCustomerId();
        Integer membershipId = paymentData.getMembershipId();
        Double totalAmount = paymentData.getTotalAmount();
        List<Cart.Item> items = paymentData.getItems();
        List<String> bookIds = new ArrayList<>();

        Set<String> uniqueCustomerIds = new HashSet<>();
        String clientIp = ipAddressService.getClientIp(request);

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
                        bookIds.add(String.valueOf(bookId));
                    } catch (Exception e) {
                        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error purchasing book with ID: " + bookId);
                    }
                }
                memberCard.setBalance(currentBalance - totalAmount);
                memberCardService.saveCard(memberCard);
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Insufficient balance");
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Member card not found");
        }

        try {
            Optional<Customer> optionalCustomer = customerService.findById(customerId);
            if (optionalCustomer.isPresent()) {
                Customer customer = optionalCustomer.get();
                CustomerDTO customerDTO = customerMapperService.toCustomerDTO(customer);
                PurchaseDTO purchaseDTO = new PurchaseDTO(customerDTO, totalAmount, bookIds, clientIp);
                cosmosDbService.savePurchase(purchaseDTO);
            } else {
                return ResponseEntity.badRequest().body("Customer not found");
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error " + e.getMessage());
        }

        return ResponseEntity.ok("Success Buy");
    }

}

