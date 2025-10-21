package com.calzone.financial.process;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "process_stages", indexes = {
        @Index(name = "idx_process_order", columnList = "orderId"),
        @Index(name = "idx_process_created", columnList = "createdAt")
})
public class ProcessStage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long orderId;

    @Column(nullable = false)
    private String stage; // WEB, CRM, SALES, ONBD, CASE, EXEC, GOVT, QA, DEL, PF, MD, GO, SLAB, CR

    @Column(nullable = false)
    private String status = "completed"; // completed, pending, failed, info

    @Column
    private String notes;

    @Column(nullable = false, updatable = false)
    private Instant createdAt;

    @PrePersist
    public void prePersist() {
        if (createdAt == null) createdAt = Instant.now();
        if (status == null || status.isBlank()) status = "completed";
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getOrderId() { return orderId; }
    public void setOrderId(Long orderId) { this.orderId = orderId; }

    public String getStage() { return stage; }
    public void setStage(String stage) { this.stage = stage; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
