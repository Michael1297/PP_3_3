package ru.kata.spring.boot_security.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.repository.UserRepository;

import java.util.List;

@Service
public class UserServiceImp implements UserService {
   private final UserRepository userRepository;
   private final PasswordEncoder passwordEncoder;

   @Autowired
   public UserServiceImp(UserRepository userDao, @Lazy PasswordEncoder passwordEncoder) {
      this.userRepository = userDao;
      this.passwordEncoder = passwordEncoder;
   }

   @Transactional
   @Override
   public void add(User user) {
      if (findUserByEmail(user.getEmail()) == null) {
         user.setPassword(passwordEncoder.encode(user.getPassword()));
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
      return userRepository.findById(id).orElse(null);
   }

   @Override
   public User findUserByEmail(String email) {
      return userRepository.findUserByEmail(email);
   }

   @Transactional
   @Override
   public void updateUser(long userId, User user) {
      User existingUser = getUser(userId);

      existingUser.setFirstName(user.getFirstName());
      existingUser.setLastName(user.getLastName());
      existingUser.setEmail(user.getEmail());
      existingUser.setAge(user.getAge());
      existingUser.setRoles(user.getRoles());

      //не кодировать повторно пароль если он не был изменен
      if(!user.getPassword().equals(existingUser.getPassword())) {
         existingUser.setPassword(passwordEncoder.encode(user.getPassword()));
      }

      userRepository.save(existingUser);
   }

   @Transactional
   @Override
   public void remove(long id) {
      userRepository.deleteById(id);
   }

   @Transactional(readOnly = true)
   @Override
   public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
      User user = findUserByEmail(username);

      if (user == null) {
         throw new UsernameNotFoundException("User " + username + " not found");
      }

      return user;
   }
}
