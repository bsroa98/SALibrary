package com.aslibrary.asproject.entities;

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
    private Double price;

    @Size(max = 100)
    @Column(name = "URLimage", length = 100)
    private String URLimage;

    @Column(name = "stock")
    private Integer stock;


    @Size(max = 100)
    @Column(name = "Author", length = 100)
    private String Author;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "id_country", nullable = false)
    private Country idCountry;

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

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getURLimage() {
        return URLimage;
    }

    public void setURLimage(String uRLimage) {
        this.URLimage = uRLimage;
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }

    public String getAuthor() {
        return Author;
    }

    public void setAuthor(String author) {
        Author = author;
    }

    public Country getIdCountry() {
        return idCountry;
    }

    public void setIdCountry(Country idCountry) {
        this.idCountry = idCountry;
    }
}