package com.aslibrary.asproject.dto;

public class CustomerDTO {
    private String name;
    private int age;
    private int idCity;
    private int idCountry;
    private int idGender;
    private int idOccupation;
    private Integer idMemberCard;
    private String email;
    private String birthdate;
    private String password;

    public CustomerDTO(String name, int age, int idCity, int idCountry, int idGender, int idOccupation, Integer idMemberCard, String email) {
        this.name = name;
        this.age = age;
        this.idCity = idCity;
        this.idCountry = idCountry;
        this.idGender = idGender;
        this.idOccupation = idOccupation;
        this.idMemberCard = idMemberCard;
        this.email = email;

    }

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

    public String getBirthdate() {
        return birthdate;
    }

    public void setBirthdate(String birthdate) {
        this.birthdate = birthdate;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
