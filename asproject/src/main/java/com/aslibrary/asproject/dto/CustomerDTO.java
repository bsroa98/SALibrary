package com.aslibrary.asproject.dto;

import java.util.Date;

public class CustomerDTO {
    private int id;
    private String name;
    private int age;
    private int idCity;
    private int idCountry;
    private int idGender;
    private int idOccupation;
    private Integer idMemberCard;
    private String email;
    private Date birthdate;
    private String password;

    public CustomerDTO(int id, String name, int age, int idCity, int idCountry, int idGender, int idOccupation, Integer idMemberCard, String email, Date birthdate, String password) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.idCity = idCity;
        this.idCountry = idCountry;
        this.idGender = idGender;
        this.idOccupation = idOccupation;
        this.idMemberCard = idMemberCard;
        this.email = email;
        this.birthdate = birthdate;
        this.password = password;
    }

    public int getId() {return id;}

    public void setId(int id) {this.id = id;}

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public int getIdCity() {
        return idCity;
    }

    public void setIdCity(int idCity) {
        this.idCity = idCity;
    }

    public int getIdCountry() {
        return idCountry;
    }

    public void setIdCountry(int idCountry) {
        this.idCountry = idCountry;
    }

    public int getIdGender() {
        return idGender;
    }

    public void setIdGender(int idGender) {
        this.idGender = idGender;
    }

    public int getIdOccupation() {
        return idOccupation;
    }

    public void setIdOccupation(int idOccupation) {
        this.idOccupation = idOccupation;
    }

    public Integer getIdMemberCard() {
        return idMemberCard;
    }

    public void setIdMemberCard(Integer idMemberCard) {
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

    public void setId(Integer id) {
    }
}
