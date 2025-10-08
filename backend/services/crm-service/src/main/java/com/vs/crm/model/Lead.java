package com.vs.crm.model;

import jakarta.persistence.*;

@Entity
@Table(name="leads")
public class Lead {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
    private String status;

    public Lead(){}
    public Lead(String name,String email){this.name=name;this.email=email;this.status="new";}
    public Long getId(){return id;}
    public String getName(){return name;}
    public void setName(String name){this.name=name;}
    public String getEmail(){return email;}
    public void setEmail(String email){this.email=email;}
    public String getStatus(){return status;}
    public void setStatus(String status){this.status=status;}
}
