package com.vs.sales.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name="orders")
public class OrderEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private Long leadId;
  private String serviceType;
  private String status;
  private LocalDateTime createdAt = LocalDateTime.now();

  public OrderEntity(){}
  public OrderEntity(Long leadId,String serviceType){this.leadId=leadId;this.serviceType=serviceType;this.status="created";}
  public Long getId(){return id;}
  public Long getLeadId(){return leadId;}
  public void setLeadId(Long leadId){this.leadId=leadId;}
  public String getServiceType(){return serviceType;}
  public void setServiceType(String s){this.serviceType=s;}
  public String getStatus(){return status;}
  public void setStatus(String s){this.status=s;}
  public LocalDateTime getCreatedAt(){return createdAt;}
}
