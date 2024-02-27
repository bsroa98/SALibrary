package com.aslibrary.asproject.services;

import com.aslibrary.asproject.entities.MemberCard;
import com.aslibrary.asproject.repositories.MemberCardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class MemberCardService {
    @Autowired
    private MemberCardRepository memberCardRepository;

    public ResponseEntity<MemberCard> saveCard(MemberCard memberCard) {
        MemberCard savedCard = memberCardRepository.save(memberCard);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedCard);
    }
}
