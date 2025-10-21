package com.calzone.financial.sms;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Optional;

public interface PhoneOtpRepository extends JpaRepository<PhoneOtp, Long> {

    @Query("select p from PhoneOtp p where p.phone = :phone and p.used = false and p.expiresAt > :now order by p.createdAt desc")
    Optional<PhoneOtp> findActiveLatest(String phone, Instant now);

    @Transactional
    @Modifying
    @Query("delete from PhoneOtp p where p.phone = :phone or p.expiresAt < :now")
    int purgeByPhoneOrExpired(String phone, Instant now);
}
