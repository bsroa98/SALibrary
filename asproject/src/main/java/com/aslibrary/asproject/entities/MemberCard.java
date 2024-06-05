package com.aslibrary.asproject.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
public class MemberCard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id_Member_Card", nullable = false)
    private Integer idMemberCard;

    @NotNull
    @Column(name = "Card_Number", nullable = false)
    private Integer cardNumber;

    @NotNull
    @Column(name = "balance", nullable = false)
    public Double balance;

    @OneToOne
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "Id_Customer", nullable = false)
    @JsonBackReference
    private Customer customer;

    public Integer getId() {
        return idMemberCard;
    }

    public void setId(Integer id) {
        this.idMemberCard = id;
    }

    public Integer getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(Integer cardNumber) {
        this.cardNumber = cardNumber;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Double getBalance() {
        return balance;
    }

    public Double setBalance(Double balance) {
        this.balance = balance;
        return balance;
    }
}
