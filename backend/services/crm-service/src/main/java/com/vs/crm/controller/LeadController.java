package com.vs.crm.controller;

import com.vs.crm.model.Lead;
import com.vs.crm.repo.LeadRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leads")
public class LeadController {
    private final LeadRepository repo;
    public LeadController(LeadRepository repo){this.repo=repo;}

    @GetMapping
    public List<Lead> list(){return repo.findAll();}

    @PostMapping
    public Lead create(@RequestBody Lead lead){return repo.save(lead);}
}
