package com.vs.crm.repo;

import com.vs.crm.model.Document;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DocumentRepository extends JpaRepository<Document, Long> {
    List<Document> findByOwnerUserId(Long userId);
}
