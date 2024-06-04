package com.aslibrary.asproject.controller;

import com.aslibrary.asproject.dto.Cart;
import com.aslibrary.asproject.dto.PurchaseDTO;
import com.aslibrary.asproject.services.BookPurchaseService;
import com.aslibrary.asproject.services.CosmosDbService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/buy")
public class BookPurchaseController {
    @Autowired
    private BookPurchaseService bookPurchaseService;

    @Autowired
    private CosmosDbService cosmosDbService;



    @PostMapping("/book/")
    public ResponseEntity<String>  carPayment(@RequestBody List<Cart> cart){
        for(Cart item:cart){
            try {
                bookPurchaseService.buyBook(item.getQuantity(), item.getBookId(), item.getCustomerId());
                PurchaseDTO purchaseDTO = new PurchaseDTO(item.getCustomerId(),70000* item.getBookId());
                cosmosDbService.savePurchase(purchaseDTO);
            }catch (Exception e){
             return ResponseEntity.badRequest().body("Error");
            }
        }
        return ResponseEntity.ok("Success Buy");
    }
}
