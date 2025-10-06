package com.karimbensaid.enchere.enchereApplication.repository;

import com.karimbensaid.enchere.enchereApplication.entity.Auction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface AuctionRepository extends JpaRepository<Auction,Integer> {

    List<Auction> getAuctionsBySellerId(int sellerId);
    List<Auction> findByCategoryId(int categoryId);
    List<Auction> findByConditionId(int conditionId);


    @Query("SELECT a FROM Auction a " +
            "WHERE (:minPrice IS NULL OR a.startPrice >= :minPrice) " +
            "AND (:maxPrice IS NULL OR a.startPrice <= :maxPrice) " +
            "AND (:category IS NULL OR a.category.name IN :category) " +
            "AND (:conditions IS NULL OR a.condition.name IN :conditions) " +
            "AND (:search IS NULL OR LOWER(a.title) LIKE LOWER(CONCAT('%', :search, '%')))")
    Page<Auction> findAuctionsWithFilters(
            @Param("minPrice") Double minPrice,
            @Param("maxPrice") Double maxPrice,
            @Param("category") List<String> category,
            @Param("conditions") List<String> conditions,
            @Param("search") String search,
            Pageable pageable
    );

}
