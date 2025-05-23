package com.karimbensaid.enchere.enchereApplication.configuration;

import com.cloudinary.Cloudinary;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class CloudinaryConfiguration {
    @Bean
    public Cloudinary cloudinary() {
        Map<String, String> config = new HashMap<>();
        config.put("cloud_name", "dzrdmikt2");
        config.put("api_key", "953739888878958");
        config.put("api_secret", "refstoFhz-JXf1Y9-5-EAoLuv9w");

        String cloudinaryUrl = "cloudinary://953739888878958:refstoFhz-JXf1Y9-5-EAoLuv9w@dzrdmikt2";
        return new Cloudinary(cloudinaryUrl);
    }
}
