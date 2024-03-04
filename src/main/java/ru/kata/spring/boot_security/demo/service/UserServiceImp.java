package ru.kata.spring.boot_security.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.repository.UserRepository;
import ru.kata.spring.boot_security.demo.util.UserNotFoundException;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserServiceImp implements UserService {
   private final UserRepository userRepository;
   private final PasswordEncoder passwordEncoder;
   private final RoleService roleService;

   @Autowired
   public UserServiceImp(UserRepository userDao,
                         @Lazy PasswordEncoder passwordEncoder,
                         RoleService roleService) {
      this.userRepository = userDao;
      this.passwordEncoder = passwordEncoder;
      this.roleService = roleService;
   }

   @Transactional
   @Override
   public void add(User user) {
      if (userRepository.findUserByEmail(user.getEmail()).isEmpty()) {
         user.setPassword(passwordEncoder.encode(user.getPassword()));

         Set<Role> roles = user.getRoles().stream().map(Role::getName).map(roleService::getByName).collect(Collectors.toSet());
         user.setRoles(roles);

         userRepository.save(user);
      }
   }

   @Transactional(readOnly = true)
   @Override
   public List<User> listUsers() {
      return userRepository.findAll();
   }

   @Transactional(readOnly = true)
   @Override
   public User getUser(long id) {
      Optional<User> foundUser = userRepository.findById(id);
      return foundUser.orElseThrow(UserNotFoundException::new);
   }

   @Override
   public User findUserByEmail(String email) {
      Optional<User> foundUser = userRepository.findUserByEmail(email);
      return foundUser.orElseThrow(UserNotFoundException::new);
   }

   @Transactional
   @Override
   public void updateUser(User user) {
      User existingUser = getUser(user.getId());

      existingUser.setFirstName(user.getFirstName());
      existingUser.setLastName(user.getLastName());
      existingUser.setEmail(user.getEmail());
      existingUser.setAge(user.getAge());

      //не кодировать повторно пароль если он не был изменен
      if(!user.getPassword().equals(existingUser.getPassword())) {
         existingUser.setPassword(passwordEncoder.encode(user.getPassword()));
      }

      Set<Role> roles = user.getRoles().stream().map(Role::getName).map(roleService::getByName).collect(Collectors.toSet());
      existingUser.setRoles(roles);

      userRepository.save(existingUser);
   }

   @Transactional
   @Override
   public void remove(long id) {
      userRepository.deleteById(id);
   }

   @Transactional(readOnly = true)
   @Override
   public User loadUserByUsername(String username) throws UsernameNotFoundException {
      Optional<User> foundUser = userRepository.findUserByEmail(username);
      return foundUser.orElseThrow(() -> new UsernameNotFoundException("User " + username + " not found"));
   }
}
