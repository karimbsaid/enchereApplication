package com.karimbensaid.enchere.enchereApplication.service;

import com.karimbensaid.enchere.enchereApplication.entity.Condition;
import com.karimbensaid.enchere.enchereApplication.repository.ConditionRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
@AllArgsConstructor
public class ConditionServiceImpl implements  ConditionService{
    private final ConditionRepository conditionRepository;
    @Override
    public List<Condition> getAllCondition() {
        return conditionRepository.findAll();
    }

    @Override
    public Optional<Condition> getConditionById(int conditionId) {
        return conditionRepository.findById(conditionId);
    }

    @Override
    public Condition createCondition(Condition condition) {
        return conditionRepository.save(condition);
    }
}
