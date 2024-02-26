package com.aslibrary.asproject;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

@Entity
public class BookPurchase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdPurchase", nullable = false)
    private Integer idPurchase;
    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "IdCustomer", nullable = false)
    private Customer idCustomer;

    @NotNull
    @Column(name = "IdMemberCard", nullable = false)
    private Integer idMemberCard;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "IdBook", nullable = false)
    private Book idBook;


    public Integer getIdPurchase() {
        return idPurchase;
    }

    public void setIdPurchase(Integer idPurchase) {
        this.idPurchase = idPurchase;
    }

    public Customer getIdCustomer() {
        return idCustomer;
    }

    public void setIdCustomer(Customer idCustomer) {
        this.idCustomer = idCustomer;
    }

    public Integer getIdMemberCard() {
        return idMemberCard;
    }

    public void setIdMemberCard(Integer idMemberCard) {
        this.idMemberCard = idMemberCard;
    }

    public Book getIdBook() {
        return idBook;
    }

    public void setIdBook(Book idBook) {
        this.idBook = idBook;
    }

}