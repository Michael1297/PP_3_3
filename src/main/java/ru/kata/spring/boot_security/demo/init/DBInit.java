package ru.kata.spring.boot_security.demo.init;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

import javax.annotation.PostConstruct;
import java.util.Set;
import java.util.TreeSet;

@Component
public class DBInit {
    private final RoleService roleService;
    private final UserService userService;

    @Autowired
    public DBInit(RoleService roleService, UserService userService) {
        this.roleService = roleService;
        this.userService = userService;
    }

    @PostConstruct
    public void init() {
        Role adminRole = new Role("ROLE_ADMIN");
        Role userRole = new Role("ROLE_USER");

        roleService.addRole(adminRole);
        roleService.addRole(userRole);

        Set<Role> adminRoles = new TreeSet<>();
        adminRoles.add(roleService.getByName(adminRole.getName()));
        adminRoles.add(roleService.getByName(userRole.getName()));

        Set<Role> userRoles = new TreeSet<>();
        userRoles.add(roleService.getByName(userRole.getName()));

        User admin = new User("admin", "admin", 25, "admin@admin.com", "admin", adminRoles);
        User user = new User("user", "user", 19, "user@user.com", "user", userRoles);

        userService.add(admin);
        userService.add(user);
    }
}
