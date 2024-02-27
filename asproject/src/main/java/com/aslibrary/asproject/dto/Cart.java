package com.aslibrary.asproject.dto;

public class Cart {
    private Integer bookId;
    private Integer quantity;
    private Integer customerId;

    public Cart() {
    }

    public Cart(Integer bookId, Integer quantity, Integer customerId) {
        this.bookId = bookId;
        this.quantity = quantity;
        this.customerId = customerId;
    }

    public Integer getBookId() {
        return bookId;
    }

    public void setBookId(Integer bookId) {
        this.bookId = bookId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Integer getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Integer customerId) {
        this.customerId = customerId;
    }
}
