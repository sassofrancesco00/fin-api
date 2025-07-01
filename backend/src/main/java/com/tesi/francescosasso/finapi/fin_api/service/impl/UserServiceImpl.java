package com.tesi.francescosasso.finapi.fin_api.service.impl;

import com.tesi.francescosasso.finapi.fin_api.domain.User;
import com.tesi.francescosasso.finapi.fin_api.domain.dto.UserDTO;
import com.tesi.francescosasso.finapi.fin_api.repo.UserRepo;
import com.tesi.francescosasso.finapi.fin_api.service.UserService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * @author Francesco Sasso
 * @version 1.0
 * @since 2025
 */

@Service
public class UserServiceImpl implements UserService {

    private UserRepo userRepository;

    @Override
    public List<UserDTO> findAll() {
        return userRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Override
    public Optional<UserDTO> findById(Integer id) {
        return userRepository.findById(id).map(this::toDTO);
    }

    private UserDTO toDTO(User user) {
        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setFirstname(user.getFirstname());
        dto.setLastname(user.getLastname());
        dto.setEmail(user.getEmail());
        dto.setRuolo(user.getRuolo().getCodice());
        return dto;
    }
}
