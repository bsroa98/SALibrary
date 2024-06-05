package com.aslibrary.asproject.dto;


import com.azure.spring.data.cosmos.core.mapping.Container;
import com.azure.spring.data.cosmos.core.mapping.PartitionKey;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Id;


import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Container(containerName = "transactionLogs")
public class PurchaseDTO {
    @Id
    private String id;

    @JsonProperty("customer")
    private CustomerDTO customer;

    @PartitionKey
    @JsonProperty("purchaseValue")
    private double purchaseValue;

    @JsonProperty("bookIds")
    private List<String> bookIds;
    @JsonProperty("transactionDateTime")
    private LocalDateTime transactionDateTime;
    @JsonProperty("clientIp")
    private String clientIp;



    public PurchaseDTO(){
        this.id = UUID.randomUUID().toString();
        this.transactionDateTime = LocalDateTime.now();
    }

    public PurchaseDTO(CustomerDTO customer, double purchaseValue, List<String> bookIds, String clientIp) {
        this.id = UUID.randomUUID().toString();
        this.customer = customer;
        this.purchaseValue = purchaseValue;
        this.bookIds = bookIds;
        this.transactionDateTime = LocalDateTime.now();
        this.clientIp = clientIp;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public CustomerDTO getCustomer() {
        return customer;
    }

    public void setCustomer(CustomerDTO customer) {
        this.customer = customer;
    }

    public double getPurchaseValue() {
        return purchaseValue;
    }

    public void setPurchaseValue(double purchaseValue) {
        this.purchaseValue = purchaseValue;
    }

    public List<String> getBookIds() {
        return bookIds;
    }

    public void setBookIds(List<String> bookIds) {
        this.bookIds = bookIds;
    }

    public LocalDateTime getTransactionDateTime() {
        return transactionDateTime;
    }

    public void setTransactionDateTime(LocalDateTime transactionDateTime) {
        this.transactionDateTime = transactionDateTime;
    }

    public String getClientIp() {
        return clientIp;
    }

    public void setClientIp(String clientIp) {
        this.clientIp = clientIp;
    }
}
