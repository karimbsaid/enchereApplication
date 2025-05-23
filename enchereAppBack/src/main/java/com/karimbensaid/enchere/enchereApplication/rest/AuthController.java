package com.karimbensaid.enchere.enchereApplication.rest;

import com.karimbensaid.enchere.enchereApplication.dto.JwtResponseDTO;
import com.karimbensaid.enchere.enchereApplication.dto.LoginDTO;
import com.karimbensaid.enchere.enchereApplication.dto.SignupDTO;
import com.karimbensaid.enchere.enchereApplication.entity.User;
import com.karimbensaid.enchere.enchereApplication.exception.EmailAlreadyExistsException;
import com.karimbensaid.enchere.enchereApplication.repository.UserRepository;
import com.karimbensaid.enchere.enchereApplication.security.JwtService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
public class AuthController {

    private AuthenticationManager authenticationManager;
    private JwtService jwtService;
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;



    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getEmail(),
                            loginRequest.getPassword()));

            SecurityContextHolder.getContext().setAuthentication(authentication);

            String jwt = jwtService.generateToken((UserDetails) authentication.getPrincipal());

            return ResponseEntity.ok(new JwtResponseDTO(jwt));
        } catch (BadCredentialsException e) {
            throw new RuntimeException("Invalid email or password");
        }
    }


    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupDTO signupRequest) {
        System.out.println(signupRequest.getUsername());
        System.out.println(signupRequest.getEmail());
       System.out.println(signupRequest.getPassword());
        if (userRepository.findByEmail(signupRequest.getEmail()).isPresent()) {
            throw new EmailAlreadyExistsException("Email is already in use!");
        }




        User user = new User();
        user.setUserName(signupRequest.getUsername());
        user.setEmail(signupRequest.getEmail());
        user.setPassword(passwordEncoder.encode(signupRequest.getPassword()));
        user.setRole("USER");

        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully!");
    }


}
