package com.aslibrary.asproject.dto;

import com.azure.spring.data.cosmos.core.mapping.Container;
import com.azure.spring.data.cosmos.core.mapping.PartitionKey;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Id;

import java.util.UUID;

@Container(containerName = "transactionLogs")
public class PurchaseDTO {
    @Id
    private String id;

    @JsonProperty("userId")
    private Integer userId;

    @PartitionKey
    @JsonProperty("purchaseValue")
    private double purchaseValue;

    public PurchaseDTO() {
        // Genera un UUID aleatorio y lo convierte a una cadena
        this.id = UUID.randomUUID().toString();
    }

    public PurchaseDTO(Integer userId, double purchaseValue) {
        this.id = UUID.randomUUID().toString();
        this.userId = userId;
        this.purchaseValue = purchaseValue;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public double getPurchaseValue() {
        return purchaseValue;
    }

    public void setPurchaseValue(double purchaseValue) {
        this.purchaseValue = purchaseValue;
    }
}
