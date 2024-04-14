package com.aslibrary.asproject.controller;

import com.aslibrary.asproject.entities.Customer;
import org.springframework.web.bind.annotation.RequestBody;
import com.aslibrary.asproject.services.MemberCardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/recharge")
public class MemberCardController {

    @Autowired
    private MemberCardService memberCardService;

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
}
