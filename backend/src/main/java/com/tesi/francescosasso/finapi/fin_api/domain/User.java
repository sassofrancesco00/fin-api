package com.tesi.francescosasso.finapi.fin_api.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    @Column(nullable = false, unique = true)
    private String email;

    @ManyToOne
    @JoinColumn(name = "ruolo_id", nullable = false)
    private Ruolo ruolo;

    @Column(name = "password_hash", nullable = false)
    private String passwordHash;

    // Getters & Setters
}

