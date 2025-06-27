package com.tesi.francescosasso.finapi.fin_api.service;

import com.tesi.francescosasso.finapi.fin_api.domain.AuthenticationRequest;
import com.tesi.francescosasso.finapi.fin_api.domain.AuthenticationResponse;
import com.tesi.francescosasso.finapi.fin_api.domain.RegisterRequest;

public interface AuthenticationService {
    AuthenticationResponse register(RegisterRequest request);

    AuthenticationResponse authenticate(AuthenticationRequest request);
}
