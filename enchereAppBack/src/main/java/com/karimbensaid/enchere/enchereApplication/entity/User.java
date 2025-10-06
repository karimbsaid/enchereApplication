package com.karimbensaid.enchere.enchereApplication.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "user")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "user_name", nullable = false)
    private String userName;


    @Column(name = "email", unique = true, nullable = false)
    private String email;

    @JsonIgnore
    @Column(name = "password", nullable = false)
    private String password;

    @JsonIgnore
    private String role;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "seller")
    @JsonIgnore
    private List<Auction> auctions = new ArrayList<>();

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "bidder")
    @JsonIgnore
    private List<Bid> bids = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private List<Notification> notifications = new ArrayList<>();

    @ManyToMany
    @JoinTable(
            name = "user_favorite_auctions",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "auction_id")
    )
    private List<Auction> favoriteAuctions = new ArrayList<>();

    public User(String userName, String email, String password) {
        this.userName = userName;
        this.email = email;
        this.password = password;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + role));
    }

    @Override
    public String getUsername() {
        return email;
    }
}
