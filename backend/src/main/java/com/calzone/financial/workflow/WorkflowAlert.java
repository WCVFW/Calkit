package com.calzone.financial.workflow;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "workflow_alerts", indexes = {
        @Index(name = "idx_order_id", columnList = "orderId"),
        @Index(name = "idx_alert_type", columnList = "alertType"),
        @Index(name = "idx_resolved", columnList = "resolved")
})
public class WorkflowAlert {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long orderId;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private AlertType alertType;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String message;

    @Column
    private String actionUrl;

    @Column(nullable = false)
    private Boolean resolved = false;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column
    private LocalDateTime resolvedAt;

    @Column
    private String resolvedBy;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }

    public enum AlertType {
        EXCEPTION, FAILURE, SLA_BREACH, DOCUMENT_MISSING, PAYMENT_FAILED, INFO
    }

    public WorkflowAlert() {}

    public WorkflowAlert(Long orderId, AlertType alertType, String title, String message) {
        this.orderId = orderId;
        this.alertType = alertType;
        this.title = title;
        this.message = message;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getOrderId() { return orderId; }
    public void setOrderId(Long orderId) { this.orderId = orderId; }

    public AlertType getAlertType() { return alertType; }
    public void setAlertType(AlertType alertType) { this.alertType = alertType; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getActionUrl() { return actionUrl; }
    public void setActionUrl(String actionUrl) { this.actionUrl = actionUrl; }

    public Boolean getResolved() { return resolved; }
    public void setResolved(Boolean resolved) { this.resolved = resolved; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getResolvedAt() { return resolvedAt; }
    public void setResolvedAt(LocalDateTime resolvedAt) { this.resolvedAt = resolvedAt; }

    public String getResolvedBy() { return resolvedBy; }
    public void setResolvedBy(String resolvedBy) { this.resolvedBy = resolvedBy; }
}
