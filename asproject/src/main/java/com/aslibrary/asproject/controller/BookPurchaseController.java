package com.aslibrary.asproject.controller;

import com.aslibrary.asproject.dto.Cart;
import com.aslibrary.asproject.services.BookPurchaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/buy")
public class BookPurchaseController {
    @Autowired
    private BookPurchaseService bookPurchaseService;

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
}
