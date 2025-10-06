package com.karimbensaid.enchere.enchereApplication.rest;


import com.karimbensaid.enchere.enchereApplication.dto.AuctionResponseDto;
import com.karimbensaid.enchere.enchereApplication.dto.BidDto;
import com.karimbensaid.enchere.enchereApplication.dto.UserDto;
import com.karimbensaid.enchere.enchereApplication.entity.Auction;
import com.karimbensaid.enchere.enchereApplication.entity.Bid;
import com.karimbensaid.enchere.enchereApplication.entity.Notification;
import com.karimbensaid.enchere.enchereApplication.entity.User;
import com.karimbensaid.enchere.enchereApplication.mapper.AuctionMapper;
import com.karimbensaid.enchere.enchereApplication.service.AuctionService;
import com.karimbensaid.enchere.enchereApplication.service.BidService;
import com.karimbensaid.enchere.enchereApplication.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/mybids")
@AllArgsConstructor
public class BidRestController {
    private final AuctionMapper auctionMapper;
    private final BidService bidService;
    private final UserService userService;
    private final AuctionService auctionService;
    private final SimpMessagingTemplate messagingTemplate;


    @GetMapping("")
    List<AuctionResponseDto> getMyBidsAuctions(){
        List<Auction> myauctionBid = bidService.getMyBiddedAuctions(userService.getCurrentUser().getId());
        return myauctionBid.stream()
                .map(auctionMapper::convertToAuctionResponseDto)
                .collect(Collectors.toList());
    }

    @PostMapping("/{auctionId}")
    public void placeBid(@PathVariable("auctionId") int auctionId ,@RequestParam("amount") double amount
    ){
        Bid bid = bidService.placeBid(auctionId, userService.getCurrentUser().getId(), amount);

        BidDto bidDto = new BidDto(
                bid.getId(),
                bid.getAmount(),
                new UserDto(
                        bid.getBidder().getId(),
                        bid.getBidder().getUsername(),
                        bid.getBidder().getEmail()
                ),
                bid.getCreatedAt()
        );
        Auction auction = auctionService.getAuctionById(auctionId);

        List<User> interestedUsers = auction.getFavoritedByUsers();

        for (User user : interestedUsers) {
            Notification notification = new Notification();
            notification.setAuctionId(auction.getId());
            notification.setAuctionTitle(auction.getTitle());
            notification.setMessage("New bid placed on auction: " + auction.getTitle());
            notification.setViewed(false);
            notification.setTimestamp(LocalDateTime.now());

            user.getNotifications().add(notification);

            userService.save(user);
            messagingTemplate.convertAndSend("/topic/notifications/"+user.getEmail(), notification);
        }
        messagingTemplate.convertAndSend("/topic/auctions/" + auctionId + "/bids", bidDto);

    }
}
