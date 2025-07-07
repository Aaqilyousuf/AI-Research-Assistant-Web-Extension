package com.research.assistant.controller;

import com.research.assistant.model.ResearchRequest;
import com.research.assistant.service.ResearchService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/research")
@CrossOrigin(origins = "*")
@AllArgsConstructor
public class ResearchController {
//    @Autowired
    private final ResearchService researchService;


    @PostMapping("/process")
    public ResponseEntity<String> processResearchData(@RequestBody ResearchRequest request) {
        // Call the service to process research data
        String result = researchService.processData(request);
        return ResponseEntity.ok(result);
    }

}
