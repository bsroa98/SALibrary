package com.aslibrary.asproject.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.NotNull;
import org.hibernate.Hibernate;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class BookcategoryId implements Serializable {
    private static final long serialVersionUID = -5698890975268721177L;
    @NotNull
    @Column(name = "id_book", nullable = false)
    private Integer idBook;

    @NotNull
    @Column(name = "id_category", nullable = false)
    private Integer idCategory;

    public Integer getIdBook() {
        return idBook;
    }

    public void setIdBook(Integer idBook) {
        this.idBook = idBook;
    }

    public Integer getIdCategory() {
        return idCategory;
    }

    public void setIdCategory(Integer idCategory) {
        this.idCategory = idCategory;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        BookcategoryId entity = (BookcategoryId) o;
        return Objects.equals(this.idBook, entity.idBook) &&
                Objects.equals(this.idCategory, entity.idCategory);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idBook, idCategory);
    }

}