package by.dz.fruits_in_choco.fruits_in_choco.service;

import by.dz.fruits_in_choco.fruits_in_choco.entity.User;

import java.util.List;

public interface UserService {
    List<User> getUsers(int page, int size, String direction, String sortBy);
    User getUserById(Long id);
    User getUserByEmail(String email);
    User updateProfile(User newProfile);
}
