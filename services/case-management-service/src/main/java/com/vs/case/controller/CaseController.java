package com.vs.case.controller;

import com.vs.case.model.CaseRecord;
import com.vs.case.repo.CaseRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cases")
public class CaseController {
  private final CaseRepository repo;
  public CaseController(CaseRepository repo){this.repo=repo;}

  @GetMapping
  public List<CaseRecord> list(){return repo.findAll();}

  @PostMapping
  public CaseRecord create(@RequestBody CaseRecord c){return repo.save(c);}
}
