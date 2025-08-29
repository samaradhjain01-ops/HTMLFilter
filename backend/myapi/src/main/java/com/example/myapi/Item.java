package com.example.myapi;

public class Item {

    private String name;
    private String department;
    private int age;
    private String email;
    private String city;

    // Default constructor
    public Item() {
    }

    // Constructor with parameters
    public Item(String name, String department, int age, String email, String city) {
        this.name = name;
        this.department = department;
        this.age = age;
        this.email = email;
        this.city = city;
    }

    // Getters and Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }
}
