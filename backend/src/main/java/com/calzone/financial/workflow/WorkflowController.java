package com.calzone.financial.workflow;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/workflow")
@CrossOrigin(origins = "*")
public class WorkflowController {
    private final WorkflowService workflowService;

    public WorkflowController(WorkflowService workflowService) {
        this.workflowService = workflowService;
    }

    @GetMapping("/orders/{orderId}/timeline")
    public ResponseEntity<List<WorkflowEvent>> getTimeline(@PathVariable Long orderId) {
        List<WorkflowEvent> timeline = workflowService.getOrderTimeline(orderId);
        return ResponseEntity.ok(timeline);
    }

    @GetMapping("/orders/{orderId}/progress")
    public ResponseEntity<WorkflowService.WorkflowProgressDTO> getProgress(@PathVariable Long orderId) {
        WorkflowService.WorkflowProgressDTO progress = workflowService.getWorkflowProgress(orderId);
        return ResponseEntity.ok(progress);
    }

    @GetMapping("/orders/{orderId}/current-stage")
    public ResponseEntity<String> getCurrentStage(@PathVariable Long orderId) {
        WorkflowStage stage = workflowService.getCurrentStage(orderId);
        return ResponseEntity.ok(stage.name());
    }

    @PostMapping("/orders/{orderId}/event")
    public ResponseEntity<WorkflowEvent> createEvent(
            @PathVariable Long orderId,
            @RequestBody WorkflowEventRequest request
    ) {
        WorkflowEvent event = workflowService.createEvent(
                orderId,
                WorkflowStage.valueOf(request.getStage()),
                WorkflowStatus.valueOf(request.getStatus()),
                request.getDescription(),
                request.getDetails()
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(event);
    }

    @PostMapping("/orders/{orderId}/advance")
    public ResponseEntity<WorkflowEvent> advanceStage(
            @PathVariable Long orderId,
            @RequestBody AdvanceStageRequest request
    ) {
        workflowService.advanceStage(orderId, WorkflowStage.valueOf(request.getNextStage()), request.getDescription());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/orders/{orderId}/complete")
    public ResponseEntity<WorkflowEvent> completeStage(
            @PathVariable Long orderId,
            @RequestBody CompleteStageRequest request
    ) {
        workflowService.completeStage(orderId, WorkflowStage.valueOf(request.getStage()), request.getDescription());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/orders/{orderId}/fail")
    public ResponseEntity<Void> failStage(
            @PathVariable Long orderId,
            @RequestBody FailStageRequest request
    ) {
        workflowService.failStage(orderId, WorkflowStage.valueOf(request.getStage()), request.getDescription());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/orders/{orderId}/exception")
    public ResponseEntity<WorkflowEvent> addException(
            @PathVariable Long orderId,
            @RequestBody ExceptionRequest request
    ) {
        WorkflowEvent event = workflowService.createEvent(
                orderId,
                WorkflowStage.valueOf(request.getExceptionType()),
                WorkflowStatus.BLOCKED,
                request.getDescription(),
                request.getDetails()
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(event);
    }

    @GetMapping("/orders/{orderId}/exceptions")
    public ResponseEntity<List<WorkflowEvent>> getActiveExceptions(@PathVariable Long orderId) {
        List<WorkflowEvent> exceptions = workflowService.getActiveExceptions(orderId);
        return ResponseEntity.ok(exceptions);
    }

    @GetMapping("/stages")
    public ResponseEntity<List<String>> getAvailableStages() {
        List<String> stages = List.of(
                "WEB", "CRM", "SALES", "ONBD", "CASE", "EXEC", "GOVT", "QA", "DEL",
                "PF", "MD", "GO", "SLAB", "CR"
        );
        return ResponseEntity.ok(stages);
    }

    public static class WorkflowEventRequest {
        private String stage;
        private String status;
        private String description;
        private String details;

        public String getStage() { return stage; }
        public void setStage(String stage) { this.stage = stage; }

        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }

        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }

        public String getDetails() { return details; }
        public void setDetails(String details) { this.details = details; }
    }

    public static class AdvanceStageRequest {
        private String nextStage;
        private String description;

        public String getNextStage() { return nextStage; }
        public void setNextStage(String nextStage) { this.nextStage = nextStage; }

        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
    }

    public static class CompleteStageRequest {
        private String stage;
        private String description;

        public String getStage() { return stage; }
        public void setStage(String stage) { this.stage = stage; }

        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
    }

    public static class FailStageRequest {
        private String stage;
        private String description;

        public String getStage() { return stage; }
        public void setStage(String stage) { this.stage = stage; }

        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
    }

    public static class ExceptionRequest {
        private String exceptionType;
        private String description;
        private String details;

        public String getExceptionType() { return exceptionType; }
        public void setExceptionType(String exceptionType) { this.exceptionType = exceptionType; }

        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }

        public String getDetails() { return details; }
        public void setDetails(String details) { this.details = details; }
    }
}
