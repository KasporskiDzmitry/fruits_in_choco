package by.dz.fruits_in_choco.fruits_in_choco.service;


import by.dz.fruits_in_choco.fruits_in_choco.entity.User;

import javax.servlet.http.HttpServletRequest;

public interface RegistrationService {
    String register(User user, HttpServletRequest request);
    String confirmRegistration(String token);
}
