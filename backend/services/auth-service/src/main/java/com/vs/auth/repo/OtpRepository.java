package com.vs.auth.repo;

import com.vs.auth.model.OtpCode;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface OtpRepository extends JpaRepository<OtpCode, Long> {
    Optional<OtpCode> findTopByMobileAndUsedOrderByExpiresAtDesc(String mobile, boolean used);
}
