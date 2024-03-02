package ru.kata.spring.boot_security.demo.model;

import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;
import javax.validation.constraints.Pattern;

@Entity
@Table(name = "roles")
public class Role implements GrantedAuthority, Comparable<Role> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "role_id")
    private Long id;

    @Pattern(regexp = "^ROLE_[A-Z]+$", message = "Incorrect role")
    @Column(name = "name", nullable = false, unique = true)
    private String name;

    public Role() {
    }

    public Role(String name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    @Override
    public String getAuthority() {
        return name;
    }

    @Override
    public String toString() {
        return name.replaceFirst("^ROLE_", "");
    }

    @Override
    public int compareTo(Role role) {
        return name.compareTo(role.name);
    }
}
