package com.karimbensaid.enchere.enchereApplication.rest;


import com.karimbensaid.enchere.enchereApplication.entity.Condition;
import com.karimbensaid.enchere.enchereApplication.service.ConditionService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/conditions")
@AllArgsConstructor
public class ConditionRestController {
    private final ConditionService conditionService;
    @PostMapping
    public Condition createCondition(@RequestBody Condition condition){
        return conditionService.createCondition(condition);
    }

    @GetMapping
    public List<Condition> getAllConditions(){
        return conditionService.getAllCondition();
    }
}
