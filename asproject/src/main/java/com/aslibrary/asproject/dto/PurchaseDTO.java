package com.aslibrary.asproject.dto;

import com.aslibrary.asproject.entities.Customer;
import com.azure.spring.data.cosmos.core.mapping.Container;
import com.azure.spring.data.cosmos.core.mapping.PartitionKey;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Id;

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

    public PurchaseDTO() {
        // Genera un UUID aleatorio y lo convierte a una cadena
        this.id = UUID.randomUUID().toString();
    }

    public PurchaseDTO(CustomerDTO customer, double purchaseValue) {
        this.id = UUID.randomUUID().toString();
        this.customer = customer;
        this.purchaseValue = purchaseValue;
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
}
