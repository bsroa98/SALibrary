package com.aslibrary.asproject.controller;

import com.aslibrary.asproject.dto.PurchaseDTO;
import com.aslibrary.asproject.dto.CustomerDTO;
import com.aslibrary.asproject.entities.Book;
import com.aslibrary.asproject.services.*;
import com.aslibrary.asproject.dto.Cart;
import com.aslibrary.asproject.entities.Customer;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import java.util.*;

@RestController
@RequestMapping("/api/buy")
@CrossOrigin(origins = "http://localhost:3000")
public class BookPurchaseController {
    @Autowired
    private BookPurchaseService bookPurchaseService;

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

    @PostMapping("/book/")
    public ResponseEntity<String> carPayment(@RequestBody List<Cart> cart, HttpServletRequest request) {
        double totalPrice = 0;
        List<String> bookIds = new ArrayList<>();
        Set<String> uniqueCustomerIds = new HashSet<>();

        String clientIp = ipAddressService.getClientIp(request);

        for (Cart item : cart) {
            try {
                bookPurchaseService.buyBook(item.getQuantity(), item.getBookId(), item.getCustomerId());
                Optional<Book> optionalBook=bookService.findBookById(item.getBookId());
                if (optionalBook.isPresent()){
                    Book book = optionalBook.get();
                    totalPrice += book.getPrice() * item.getQuantity();
                }
                else{
                    return ResponseEntity.badRequest().body("Error Libro no encontrado");
                }
                bookIds.add(String.valueOf(item.getBookId()));
                uniqueCustomerIds.add(String.valueOf(item.getCustomerId()));
            } catch (Exception e) {
                return ResponseEntity.badRequest().body("Error " + e.getMessage());
            }
        }

        for (String customerId : uniqueCustomerIds) {
            try {
                Integer customerIdInt = Integer.parseInt(customerId);
                Optional<Customer> optionalCustomer = customerService.findById(customerIdInt);
                if (optionalCustomer.isPresent()) {
                    Customer customer = optionalCustomer.get();
                    CustomerDTO customerDTO = customerMapperService.toCustomerDTO(customer);
                    PurchaseDTO purchaseDTO = new PurchaseDTO(customerDTO, totalPrice, bookIds, clientIp);
                    cosmosDbService.savePurchase(purchaseDTO);
                } else {
                    return ResponseEntity.badRequest().body("Customer not found");
                }
            } catch (Exception e) {
                return ResponseEntity.badRequest().body("Error " + e.getMessage());
            }
        }

        return ResponseEntity.ok("Success Buy");
    }
}
