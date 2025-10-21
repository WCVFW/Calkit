package com.calzone.financial.cases;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cases")
public class CaseController {
  private final CaseRepository repo;
  public CaseController(CaseRepository repo){this.repo=repo;}

  @GetMapping
  public ResponseEntity<List<CaseRecord>> list(@AuthenticationPrincipal Object user){
    return ResponseEntity.ok(repo.findAll());
  }

  @PostMapping
  public ResponseEntity<CaseRecord> create(@RequestBody CaseRecord c){
    return ResponseEntity.ok(repo.save(c));
  }
}
