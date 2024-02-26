package com.aslibrary.asproject;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

@Entity
public class MemberCard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdMemberCard", nullable = false)
    private Integer id;

    @NotNull
    @Column(name = "CardNumber", nullable = false)
    private Integer cardNumber;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "IdCustomer", nullable = false)
    private Customer idCustomer;

    @NotNull
    @Column(name = "Balance", nullable = false)
    private Integer balance;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(Integer cardNumber) {
        this.cardNumber = cardNumber;
    }

    public Customer getIdCustomer() {
        return idCustomer;
    }

    public void setIdCustomer(Customer idCustomer) {
        this.idCustomer = idCustomer;
    }

    public Integer getBalance() {
        return balance;
    }

    public void setBalance(Integer balance) {
        this.balance = balance;
    }

}