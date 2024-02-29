package com.aslibrary.asproject.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

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
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "Id_Customer", nullable = false)
    private Customer idCustomer;

    @NotNull
    @Column(name = "balance", nullable = false)
    public Double balance;

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

    public Customer getIdCustomer() {
        return idCustomer;
    }

    public void setIdCustomer(Customer idCustomer) {
        this.idCustomer = idCustomer;
    }

    public Double getBalance() {
        return balance;
    }

    public void setBalance(Double balance) {
        this.balance = balance;
    }

}