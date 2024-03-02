package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

@Controller
@RequestMapping("/admin")
public class AdminController {
    private final UserService userService;
    private final RoleService roleService;

    @Autowired
    public AdminController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping("/")
    public String adminForm(Model model) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        User admin = userService.findUserByEmail(userDetails.getUsername());

        model.addAttribute("user", admin);
        model.addAttribute("usersList", userService.listUsers());
        model.addAttribute("roles", roleService.getAllRoles());
        return "users";
    }

    @PostMapping("/create/")
    public String createUser(@ModelAttribute("user") User user) {
        userService.add(user);
        return "redirect:../";
    }

    @GetMapping("/remove/{id}")
    public String deleteUser(@PathVariable long id) {
        userService.remove(id);
        return "redirect:../";
    }

    @PostMapping("/edit/{id}")
    public String editUser(@PathVariable long id,
                           @ModelAttribute("user") User user) {
        userService.updateUser(id, user);
        return "redirect:../";
    }
}
