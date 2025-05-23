package com.karimbensaid.enchere.enchereApplication.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.karimbensaid.enchere.enchereApplication.dto.*;
import com.karimbensaid.enchere.enchereApplication.entity.*;
import com.karimbensaid.enchere.enchereApplication.mapper.AuctionMapper;
import com.karimbensaid.enchere.enchereApplication.service.*;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@CrossOrigin(origins = "https://enchereapplication-hbf7y4gz6-karimbensaid606-gmailcoms-projects.vercel.app")

@RestController
@RequestMapping("/api/auctions")
@AllArgsConstructor
public class AuctionRestController {

    private final AuctionService auctionService;
    private final UserService userService ;
    private final BidService bidService;
    private final  CategoryService categoryService;
    private final  ConditionService conditionService;
    private final ImageUploadService imageUploadService;
    private final SimpMessagingTemplate messagingTemplate;
    private final AuctionMapper auctionMapper;
    private ObjectMapper objectMapper;




    @GetMapping("")
    public Page<AuctionResponseDto> getAllAuction(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String condition) {

        Pageable pageable = PageRequest.of(page, size);
        Page<Auction> auctionPage = auctionService.getAuctionsWithFilters(
                minPrice, maxPrice, category, condition, search, pageable
        );

        return auctionPage.map(auctionMapper::convertToAuctionResponseDto);
    }


    @GetMapping("/{id}")
    public ResponseEntity<AuctionResponseDto> getAuctionById(@PathVariable int id) {
        Auction auction = auctionService.getAuctionById(id);


        AuctionResponseDto dto = auctionMapper.convertToAuctionResponseDto(auction);
        return ResponseEntity.ok(dto);
    }




    @GetMapping("/auctions/category/{categoryId}")
    public ResponseEntity<List<Auction>> getAuctionsByCategory(@PathVariable int categoryId) {
        List<Auction> auctions = auctionService.getAuctionsByCategory(categoryId);
        return ResponseEntity.ok(auctions);
    }

    @GetMapping("/auctions/condition/{conditionId}")
    public ResponseEntity<List<Auction>> getAuctionsByCondition(@PathVariable int conditionId) {
        List<Auction> auctions = auctionService.getAuctionsByCondition(conditionId);
        return ResponseEntity.ok(auctions);
    }



    @PostMapping(value = "", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public void createAuction(
            @RequestPart("auctions") String auctionJson,
            @RequestPart("fileImages") List<MultipartFile> images
    ) throws IOException {
        AuctionRequestDto auctionDTO = objectMapper.readValue(auctionJson, AuctionRequestDto.class);

        Auction auction = new Auction();
        auction.setTitle(auctionDTO.getTitle());
        auction.setStartPrice(auctionDTO.getStartPrice());
        auction.setDescription(auctionDTO.getDescription());
        auction.setEndTime(auctionDTO.getEndTime());
        auction.setSeller(userService.getCurrentUser());
        Category category = categoryService.getCategoryById(auctionDTO.getCategory())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        Condition condition = conditionService.getConditionById(auctionDTO.getCondition())
                .orElseThrow(() -> new RuntimeException("Condition not found"));
        auction.setCategory(category);
        auction.setCondition(condition);

        List<AuctionImage> auctionImages = new ArrayList<>();
        for (MultipartFile image : images) {

            if (!image.isEmpty()) {
                String url = imageUploadService.uploadImage(image);
                AuctionImage auctionImage = new AuctionImage();
                auctionImage.setImageUrl(url);
                auctionImages.add(auctionImage);
            }
        }
        auction.setImages(auctionImages);
        auctionService.createAuction(auction);
    }


    @PatchMapping(value = "/{id}", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<AuctionResponseDto> updateAuction(
            @PathVariable int id,
            @RequestPart(value = "auctions", required = false) AuctionRequestDto auctionDTO,
            @RequestPart(value = "fileImages", required = false ) List<MultipartFile> fileImages,
            @RequestPart(value = "deleteImages", required = false) List<String> deleteImages
    ) throws IOException {

        Auction existingAuction = auctionService.getAuctionById(id);
        User currentUser = userService.getCurrentUser();

        if (!Integer.valueOf(existingAuction.getSeller().getId()).equals(currentUser.getId())) {
            return ResponseEntity.status(403).body(null);
        }

        if (auctionDTO != null) {
            if (auctionDTO.getTitle() != null) {
                existingAuction.setTitle(auctionDTO.getTitle());
            }
            if (auctionDTO.getDescription() != null) {
                existingAuction.setDescription(auctionDTO.getDescription());
            }
            if (auctionDTO.getStartPrice() != null) {
                existingAuction.setStartPrice(auctionDTO.getStartPrice());
            }
            if (auctionDTO.getEndTime() != null) {
                existingAuction.setEndTime(auctionDTO.getEndTime());
            }
            if (auctionDTO.getCategory() != null) {
                Category category = categoryService.getCategoryById(auctionDTO.getCategory())
                        .orElseThrow(() -> new RuntimeException("Category not found"));
                existingAuction.setCategory(category);
            }
            if (auctionDTO.getCondition() != null) {
                Condition condition = conditionService.getConditionById(auctionDTO.getCondition())
                        .orElseThrow(() -> new RuntimeException("Condition not found"));
                existingAuction.setCondition(condition);
            }
        }

        if (deleteImages != null && !deleteImages.isEmpty()) {
            List<AuctionImage> imagesToRemove = new ArrayList<>();
            for (String imageUrl : deleteImages) {
                imageUploadService.deleteImage(imageUrl);

                for (AuctionImage img : existingAuction.getImages()) {
                    if (img.getImageUrl().equals(imageUrl)) {
                        imagesToRemove.add(img);
                    }
                }
            }
            existingAuction.getImages().removeAll(imagesToRemove);
        }

        if (fileImages != null && !fileImages.isEmpty()) {
            for (MultipartFile image : fileImages) {
                if (!image.isEmpty()) {
                    String url = imageUploadService.uploadImage(image);
                    AuctionImage auctionImage = new AuctionImage();
                    auctionImage.setImageUrl(url);
                    existingAuction.getImages().add(auctionImage);
                }
            }
        }

        Auction updatedAuction = auctionService.updateAuction(existingAuction);
        AuctionResponseDto responseDto = auctionMapper.convertToAuctionResponseDto(updatedAuction);
        return ResponseEntity.ok(responseDto);
    }



    @GetMapping("/myauctions")
    List<AuctionResponseDto> getMyAuctions (){
        List<Auction> myAuctions = auctionService.getAuctionBySellerId(userService.getCurrentUser().getId());
        return myAuctions.stream().map(auctionMapper::convertToAuctionResponseDto).collect(Collectors.toList());
    }
    @DeleteMapping("/{id}")
    public void deleteAuction(@PathVariable int id) throws IOException {


        auctionService.deleteAuction(id);
   }




}