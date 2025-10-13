package com.vs.case.repo;

import com.vs.case.model.CaseRecord;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CaseRepository extends JpaRepository<CaseRecord, Long> {}
