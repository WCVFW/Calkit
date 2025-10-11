package com.vs.case.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name="cases")
public class CaseRecord {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String title;
  private String status;
  private Long customerId;
  private LocalDateTime createdAt = LocalDateTime.now();

  public CaseRecord(){}
  public CaseRecord(String title, Long customerId){this.title=title;this.customerId=customerId;this.status="open";}
  public Long getId(){return id;}
  public String getTitle(){return title;}
  public void setTitle(String title){this.title=title;}
  public String getStatus(){return status;}
  public void setStatus(String status){this.status=status;}
  public Long getCustomerId(){return customerId;}
  public void setCustomerId(Long customerId){this.customerId=customerId;}
  public LocalDateTime getCreatedAt(){return createdAt;}
}
