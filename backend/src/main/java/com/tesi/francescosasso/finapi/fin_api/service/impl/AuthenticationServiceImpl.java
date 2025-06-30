package com.tesi.francescosasso.finapi.fin_api.service.impl;

import com.tesi.francescosasso.finapi.fin_api.domain.AuthenticationRequest;
import com.tesi.francescosasso.finapi.fin_api.domain.AuthenticationResponse;
import com.tesi.francescosasso.finapi.fin_api.domain.RegisterRequest;
import com.tesi.francescosasso.finapi.fin_api.repo.UserRepo;
import com.tesi.francescosasso.finapi.fin_api.service.AuthenticationService;
import lombok.RequiredArgsConstructor;


import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    private final UserRepo repo;
    private final PasswordEncoder passwordEncoder;

    @Override
    public AuthenticationResponse register(RegisterRequest request) {
        var user = User.UserBuilder
                .
                .build()
    }

    @Override
    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        return null;
    }
}
