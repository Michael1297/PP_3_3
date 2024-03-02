package ru.kata.spring.boot_security.demo.service;

import ru.kata.spring.boot_security.demo.model.Role;

import java.util.List;

public interface RoleService {
    List<Role> getAllRoles();
    List<String> rolesList();
    Role getByName(String roleName);
    void addRole(Role role);
}
