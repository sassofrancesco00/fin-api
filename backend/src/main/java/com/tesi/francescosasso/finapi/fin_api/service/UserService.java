package com.tesi.francescosasso.finapi.fin_api.service;

import com.tesi.francescosasso.finapi.fin_api.domain.dto.UserDTO;

import java.util.List;
import java.util.Optional;

/**
 * @author Francesco Sasso
 * @version 1.0
 * @since 2025
 */
public interface UserService {
    List<UserDTO> findAll();

    Optional<UserDTO> findById(Integer id);
}
