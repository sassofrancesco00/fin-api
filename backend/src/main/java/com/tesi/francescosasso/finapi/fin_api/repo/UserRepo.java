package com.tesi.francescosasso.finapi.fin_api.repo;

import com.tesi.francescosasso.finapi.fin_api.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepo extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
