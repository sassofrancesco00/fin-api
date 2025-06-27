package com.tesi.francescosasso.finapi.fin_api.config;

import com.tesi.francescosasso.finapi.fin_api.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

/**
 * @author Francesco Sasso
 * @version 1.0
 * @since 2025
 */

@Configuration
@RequiredArgsConstructor
public class ApllicationConfig {

    private final UserRepo userRepo;

    @Bean
    public UserDetailsService userDetailsService() {
        return username -> userRepo.findByEmail(username).
                orElseThrow(() -> new UsernameNotFoundException("User " + username + " not found"));
    }
}
