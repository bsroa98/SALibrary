package com.aslibrary.asproject.controller;

import com.aslibrary.asproject.services.CustomerMapperService;
import com.aslibrary.asproject.dto.Cart;
import com.aslibrary.asproject.dto.CustomerDTO;
import com.aslibrary.asproject.dto.PurchaseDTO;
import com.aslibrary.asproject.entities.Customer;
import com.aslibrary.asproject.services.BookPurchaseService;
import com.aslibrary.asproject.services.CosmosDbService;
import com.aslibrary.asproject.services.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/buy")
public class BookPurchaseController {
    @Autowired
    private BookPurchaseService bookPurchaseService;

    @Autowired
    private CosmosDbService cosmosDbService;

    @Autowired
    private CustomerService customerService;

    @Autowired
    private CustomerMapperService customerMapperService;


    @PostMapping("/book/")
    public ResponseEntity<String>  carPayment(@RequestBody List<Cart> cart){
        for(Cart item:cart){
            try {
                bookPurchaseService.buyBook(item.getQuantity(), item.getBookId(), item.getCustomerId());
                Optional<Customer> optionalCustomer = customerService.findById(item.getCustomerId());
                if (optionalCustomer.isPresent()){
                    Customer customer = optionalCustomer.get();
                    CustomerDTO customerDTO = customerMapperService.toCustomerDTO(customer);
                    PurchaseDTO purchaseDTO = new PurchaseDTO(customerDTO,70000* item.getBookId());
                    cosmosDbService.savePurchase(purchaseDTO);
                }
                else{
                    return ResponseEntity.badRequest().body("Customer not found");
                }


            }catch (Exception e){
             return ResponseEntity.badRequest().body("Error "+e.getMessage());
            }
        }
        return ResponseEntity.ok("Success Buy");
    }
}
