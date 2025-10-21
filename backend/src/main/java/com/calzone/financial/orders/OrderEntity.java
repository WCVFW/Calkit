package com.calzone.financial.orders;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "orders")
public class OrderEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column
  private Long leadId;

  @Column(nullable = false)
  private String serviceType;

  @Column(nullable = false)
  private String status = "created";

  @Column(nullable = false, updatable = false)
  private LocalDateTime createdAt = LocalDateTime.now();

  public OrderEntity(){}
  public OrderEntity(Long leadId,String serviceType){this.leadId=leadId;this.serviceType=serviceType;}
  public Long getId(){return id;}
  public Long getLeadId(){return leadId;}
  public void setLeadId(Long leadId){this.leadId=leadId;}
  public String getServiceType(){return serviceType;}
  public void setServiceType(String s){this.serviceType=s;}
  public String getStatus(){return status;}
  public void setStatus(String s){this.status=s;}
  public LocalDateTime getCreatedAt(){return createdAt;}
}
