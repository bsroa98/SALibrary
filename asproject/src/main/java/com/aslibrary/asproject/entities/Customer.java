package com.aslibrary.asproject.entities;
import com.aslibrary.asproject.entities.Customer;
import com.aslibrary.asproject.services.CustomerService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.aslibrary.asproject.entities.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "Customer")
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_customer", nullable = false)
    private Integer id;

    @Size(max = 100)
    @NotNull
    @Column(name = "Name", nullable = false, length = 100)
    private String name;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "Id_Occupation", nullable = false)
    private Occupation idOccupation;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "Id_City", nullable = false)
    private City idCity;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "Id_Country", nullable = false)
    private Country idCountry;

    @NotNull
    @Column(name = "Age", nullable = false)
    private Integer age;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "Id_Gender", nullable = false)
    private Gender idGender;

    @NotNull
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "Id_Member_Card", nullable = false)
    private MemberCard idMemberCard;



    @RestController
    @RequestMapping("/api/customers")
    public class CustomerController {

        @Autowired
        private CustomerService customerService;

        @PostMapping("/{customerId}/update")
        public ResponseEntity<String> updateCustomerData(
                @PathVariable Integer customerId,
                @RequestBody @Valid Customer updatedCustomer) {

            if (!customerService.existsById(customerId)) {
                return ResponseEntity.badRequest().body("El cliente con ID " + customerId + " no existe.");
            }

            customerService.updateCustomerData(customerId, updatedCustomer);

            return ResponseEntity.ok("Datos del cliente actualizados con éxito.");
        }
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Occupation getIdOccupation() {
        return idOccupation;
    }

    public void setIdOccupation(Occupation idOccupation) {
        this.idOccupation = idOccupation;
    }

    public City getIdCity() {
        return idCity;
    }

    public void setIdCity(City idCity) {
        this.idCity = idCity;
    }

    public Country getIdCountry() {
        return idCountry;
    }

    public void setIdCountry(Country idCountry) {
        this.idCountry = idCountry;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public Gender getIdGender() {
        return idGender;
    }

    public void setIdGender(Gender idGender) {
        this.idGender = idGender;
    }

    public MemberCard getIdMemberCard() {
        return idMemberCard;
    }

    public void setIdMemberCard(MemberCard idMemberCard) {
        this.idMemberCard = idMemberCard;
    }

}

