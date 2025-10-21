package com.calzone.financial.cases;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "cases")
public class CaseRecord {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private String title;

  @Column(nullable = false)
  private String status = "open";

  @Column
  private Long customerId;

  @Column(nullable = false, updatable = false)
  private LocalDateTime createdAt = LocalDateTime.now();

  public CaseRecord() {}
  public CaseRecord(String title, Long customerId){this.title=title;this.customerId=customerId;}

  public Long getId(){return id;}
  public String getTitle(){return title;}
  public void setTitle(String title){this.title=title;}
  public String getStatus(){return status;}
  public void setStatus(String status){this.status=status;}
  public Long getCustomerId(){return customerId;}
  public void setCustomerId(Long customerId){this.customerId=customerId;}
  public LocalDateTime getCreatedAt(){return createdAt;}
}
