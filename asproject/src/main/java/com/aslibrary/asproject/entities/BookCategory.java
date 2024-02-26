package com.aslibrary.asproject.entities;

import jakarta.persistence.*;

@Entity
public class BookCategory {
    @EmbeddedId
    private BookCategoryId id;

    @MapsId("id_Book")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_book", nullable = false)
    private Book idBook;

    @MapsId("idCategory")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "Id_Category", nullable = false)
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