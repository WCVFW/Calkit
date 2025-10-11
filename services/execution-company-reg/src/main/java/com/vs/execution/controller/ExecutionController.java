package com.vs.execution.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/execute/company-reg")
public class ExecutionController {
  @PostMapping
  public String execute(@RequestBody String payload){
    // placeholder for company registration orchestration
    return "scheduled";
  }
}
