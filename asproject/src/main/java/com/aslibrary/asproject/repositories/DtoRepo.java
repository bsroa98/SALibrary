package com.aslibrary.asproject.repositories;

import com.aslibrary.asproject.dto.PurchaseDTO;
import com.azure.spring.data.cosmos.repository.ReactiveCosmosRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DtoRepo extends ReactiveCosmosRepository<PurchaseDTO,Integer> {
}
