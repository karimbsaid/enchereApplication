package com.karimbensaid.enchere.enchereApplication.repository;

import com.karimbensaid.enchere.enchereApplication.entity.Condition;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConditionRepository extends JpaRepository<Condition,Integer> {
}
