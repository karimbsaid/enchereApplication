package com.karimbensaid.enchere.enchereApplication.service;

import com.karimbensaid.enchere.enchereApplication.entity.Condition;

import java.util.List;
import java.util.Optional;

public interface ConditionService {

    List<Condition> getAllCondition();
    Optional<Condition> getConditionById(int conditionId);
    Condition createCondition(Condition condition);
}
