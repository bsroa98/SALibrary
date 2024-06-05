package com.aslibrary.asproject.services;

import com.aslibrary.asproject.repositories.DtoRepo;
import com.azure.cosmos.*;
import com.aslibrary.asproject.dto.PurchaseDTO;
import com.azure.cosmos.models.PartitionKey;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class CosmosDbService {

    @Autowired
    private DtoRepo dtoRepo;

    public void savePurchase(PurchaseDTO purchaseDTO) {
        dtoRepo.save(purchaseDTO)
                .subscribe(
                        savedPurchase -> {
                            // Operación después de que la compra se haya guardado correctamente
                            System.out.println("Compra guardada correctamente: " + savedPurchase);
                        },
                        error -> {
                            // Manejo de errores si la operación de guardado falla
                            System.err.println("Error al guardar la compra: " + error);
                        }
                );
    }
}
