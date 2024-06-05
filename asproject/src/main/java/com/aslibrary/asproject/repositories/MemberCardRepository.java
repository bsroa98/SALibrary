package com.aslibrary.asproject.repositories;

import com.aslibrary.asproject.entities.MemberCard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberCardRepository extends JpaRepository<MemberCard, Integer> {
    Optional<MemberCard> findByCustomer_Id(Integer idCustomer);

    Optional<MemberCard> findByCustomer_IdAndIdMemberCard(Integer customerId, Integer membershipId);
}
