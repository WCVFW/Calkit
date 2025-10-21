package com.calzone.financial.workflow;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface WorkflowEventRepository extends JpaRepository<WorkflowEvent, Long> {
    List<WorkflowEvent> findByOrderIdOrderByCreatedAtDesc(Long orderId);

    List<WorkflowEvent> findByOrderIdAndStageOrderByCreatedAtDesc(Long orderId, WorkflowStage stage);

    @Query("SELECT w FROM WorkflowEvent w WHERE w.orderId = :orderId AND w.stage IN :stages ORDER BY w.createdAt DESC")
    List<WorkflowEvent> findByOrderIdAndStagesOrderByCreatedAt(
            @Param("orderId") Long orderId,
            @Param("stages") List<WorkflowStage> stages
    );

    @Query("SELECT w FROM WorkflowEvent w WHERE w.orderId = :orderId AND w.status = :status ORDER BY w.createdAt DESC")
    List<WorkflowEvent> findByOrderIdAndStatus(
            @Param("orderId") Long orderId,
            @Param("status") WorkflowStatus status
    );

    @Query("SELECT w FROM WorkflowEvent w WHERE w.createdAt BETWEEN :startDate AND :endDate ORDER BY w.createdAt DESC")
    List<WorkflowEvent> findByDateRange(
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate
    );

    long countByOrderIdAndStatus(Long orderId, WorkflowStatus status);

    List<WorkflowEvent> findByStageAndStatusOrderByCreatedAtDesc(WorkflowStage stage, WorkflowStatus status);
}
