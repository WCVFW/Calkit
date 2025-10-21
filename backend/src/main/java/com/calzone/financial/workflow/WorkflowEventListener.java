package com.calzone.financial.workflow;

import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component
public class WorkflowEventListener {
    private static final Logger logger = LoggerFactory.getLogger(WorkflowEventListener.class);

    @EventListener
    public void onWorkflowEventCreated(WorkflowEvent event) {
        logger.info("Workflow Event Created: Order {} - Stage {} - Status {}",
                event.getOrderId(), event.getStage(), event.getStatus());

        if (event.getStatus() == WorkflowStatus.FAILED) {
            logger.warn("Stage Failed: Order {} - Stage {} - Description: {}",
                    event.getOrderId(), event.getStage(), event.getDescription());
            // TODO: Send alert email/notification
        }

        if (event.getStage().isException()) {
            logger.warn("Exception Detected: Order {} - Exception {} - Description: {}",
                    event.getOrderId(), event.getStage(), event.getDescription());
            // TODO: Create incident ticket
        }

        if (event.getStatus() == WorkflowStatus.COMPLETED && event.getStage() == WorkflowStage.DEL) {
            logger.info("Order Completed: Order {} - Delivery Complete", event.getOrderId());
            // TODO: Send completion email to customer
        }
    }
}
