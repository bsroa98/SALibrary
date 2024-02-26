package com.aslibrary.asproject;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;

@Entity
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_book", nullable = false)
    private Integer idBook;

    @Size(max = 100)
    @NotNull
    @Column(name = "Title", nullable = false, length = 100)
    private String title;

    @Size(max = 100)
    @NotNull
    @Column(name = "ISBN", nullable = false, length = 100)
    private String isbn;

    @NotNull
    @Column(name = "Price", nullable = false)
    private BigDecimal price;

    @Size(max = 100)
    @Column(name = "URLimage", length = 100)
    private String URLimage;

    public Integer getId() {
        return idBook;
    }

    public void setId(Integer id) {
        this.idBook = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getURLimage() {
        return URLimage;
    }

    public void setURLimage(String uRLimage) {
        this.URLimage = uRLimage;
    }

}