package com.aslibrary.asproject.controller;

import com.aslibrary.asproject.services.MemberCardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class MemberCardController {

    @Autowired
    private MemberCardService memberCardService;

    @PutMapping("/recharge/{idMemberCard}")
    public ResponseEntity<String> rechargeBalance(@PathVariable Integer idMemberCard,
                                                  @RequestParam Double rechargeValue,
                                                  @RequestParam Integer idCustomer) {
        try {
            memberCardService.rechargeBalance(rechargeValue, idMemberCard, idCustomer);
            return ResponseEntity.ok("Balance recharged successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Unsuccessful recharge" + e.getMessage());
        }
    }
}
