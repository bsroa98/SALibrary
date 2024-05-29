package com.aslibrary.asproject.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.Date;

@Entity
@Table(name = "Customer")
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_customer", nullable = false)
    private Integer id;

    @Size(max = 100)
    @NotNull
    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @NotNull
    @Column(name = "id_occupation", nullable = false)
    private Integer idOccupation;

    @NotNull
    @Column(name = "id_city", nullable = false)
    private Integer idCity;

    @NotNull
    @Column(name = "id_country", nullable = false)
    private Integer idCountry;

    @NotNull
    @Column(name = "age", nullable = false)
    private Integer age;

    @NotNull
    @Column(name = "id_gender", nullable = false)
    private Integer idGender;

    @OneToOne(fetch = FetchType.LAZY, optional = true)
    @JoinColumn(name = "id_member_card", nullable = true)
    private MemberCard idMemberCard;

    @Column(name = "email", nullable = true, unique = true)
    private String email;

    @Column(name = "birthdate", nullable = true)
    @Temporal(TemporalType.DATE)
    private Date birthdate;

    @Column(name = "password", nullable = true)
    private String password;

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

    public Integer getIdOccupation() {
        return idOccupation;
    }

    public void setIdOccupation(Integer idOccupation) {
        this.idOccupation = idOccupation;
    }

    public Integer getIdCity() {
        return idCity;
    }

    public void setIdCity(Integer idCity) {
        this.idCity = idCity;
    }

    public Integer getIdCountry() {
        return idCountry;
    }

    public void setIdCountry(Integer idCountry) {
        this.idCountry = idCountry;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public Integer getIdGender() {
        return idGender;
    }

    public void setIdGender(Integer idGender) {
        this.idGender = idGender;
    }

    public MemberCard getIdMemberCard() {
        return idMemberCard;
    }

    public void setIdMemberCard(MemberCard idMemberCard) {
        this.idMemberCard = idMemberCard;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Date getBirthdate() {
        return birthdate;
    }

    public void setBirthdate(Date birthdate) {
        this.birthdate = birthdate;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}

