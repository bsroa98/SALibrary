package com.aslibrary.asproject;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "Customer")
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdCustomer", nullable = false)
    private Integer id;

    @Size(max = 100)
    @NotNull
    @Column(name = "Name", nullable = false, length = 100)
    private String name;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "IdOccupation", nullable = false)
    private Occupation idOccupation;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "IdCity", nullable = false)
    private City idCity;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "IdCountry", nullable = false)
    private Country idCountry;

    @NotNull
    @Column(name = "Age", nullable = false)
    private Integer age;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "IdGender", nullable = false)
    private Gender idGender;

    @NotNull
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "IdMemberCard", nullable = false)
    private MemberCard idMemberCard;

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