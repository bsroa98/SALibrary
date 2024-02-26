package com.aslibrary.asproject.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.NotNull;
import org.hibernate.Hibernate;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class BookCategoryId implements Serializable {
    private static final long serialVersionUID = -7293666685834077958L;
    @NotNull
    @Column(name = "Id_Book", nullable = false)
    private Integer idBook;

    @NotNull
    @Column(name = "Id_Category", nullable = false)
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
        BookCategoryId entity = (BookCategoryId) o;
        return Objects.equals(this.idBook, entity.idBook) &&
                Objects.equals(this.idCategory, entity.idCategory);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idBook, idCategory);
    }

}