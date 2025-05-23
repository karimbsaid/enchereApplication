package com.karimbensaid.enchere.enchereApplication.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "auction")
public class Auction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String title;

    private String description;

    @Column(name = "start_price")
    private double startPrice;

    @Column(name = "end_time")
    private LocalDateTime endTime;

    @ManyToOne(fetch = FetchType.EAGER, cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    @JoinColumn(name = "seller_id")
    private User seller;

    @ManyToOne(fetch =FetchType.EAGER)
    @JoinColumn(name = "category_id")

    private Category category;

    @ManyToOne(fetch =FetchType.EAGER)
    @JoinColumn( name = "condition_id")

    private Condition condition;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "auction_id")
    private List<AuctionImage> images = new ArrayList<>();

    @OneToMany(mappedBy = "auction", fetch = FetchType.EAGER)
    @OrderBy("amount DESC")
    private List<Bid> bids = new ArrayList<>();

    @ManyToMany(mappedBy = "favoriteAuctions")
    private List<User> favoritedByUsers = new ArrayList<>();



    @Override
    public String toString() {
        return "Auction{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", startPrice=" + startPrice +
                ", endTime=" + endTime +
                ", seller=" + (seller != null ? seller.getEmail() : "null") +
                ", category=" + (category != null ? category.getName() : "null") +
                ", condition=" + (condition != null ? condition.getName() : "null") +
                ", images=" + (images != null ? images.size() + " images" : "null") +
                ", bids=" + (bids != null ? bids.size() + " bids" : "null") +
                '}';
    }
}
