package com.aslibrary.asproject;

import jakarta.persistence.*;

@Entity
public class BookCategory {
    @EmbeddedId
    private BookCategoryId id;

    @MapsId("idBook")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "IdBook", nullable = false)
    private Book idBook;

    @MapsId("idCategory")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "IdCategory", nullable = false)
    private Category idCategory;


    public Book getIdBook() {
        return idBook;
    }

    public void setIdBook(Book idBook) {
        this.idBook = idBook;
    }

    public Category getIdCategory() {
        return idCategory;
    }

    public void setIdCategory(Category idCategory) {
        this.idCategory = idCategory;
    }

}