package by.dz.fruits_in_choco.fruits_in_choco.controller;

import by.dz.fruits_in_choco.fruits_in_choco.dto.RegistrationRequest;
import by.dz.fruits_in_choco.fruits_in_choco.mapper.UserMapper;
import by.dz.fruits_in_choco.fruits_in_choco.exception.JwtAuthenticationException;
import by.dz.fruits_in_choco.fruits_in_choco.security.JwtTokenProvider;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@Controller
@RequestMapping(path = "/api/v1/registration")
public class RegistrationController {
    private final UserMapper userMapper;
    private final JwtTokenProvider jwtTokenProvider;


    public RegistrationController(UserMapper userMapper, JwtTokenProvider jwtTokenProvider) {
        this.userMapper = userMapper;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @PostMapping
    @ResponseBody
    public ResponseEntity<?> register(@RequestBody RegistrationRequest request, HttpServletRequest httpRequest) {
        try {
            return ResponseEntity.ok(userMapper.register(request, httpRequest));
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/confirm")
    public String confirmRegistration(@RequestParam("token") String token, Model model) {
        try {
            jwtTokenProvider.validateToken(token);
        } catch (JwtAuthenticationException e) {
            model.addAttribute("errorMessage", e.getMessage());
            return "registrationFailed";
        }
        userMapper.confirmRegistration(token);
        return "registrationComplete";
    }
}
