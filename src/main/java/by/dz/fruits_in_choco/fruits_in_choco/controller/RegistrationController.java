package by.dz.fruits_in_choco.fruits_in_choco.controller;

import by.dz.fruits_in_choco.fruits_in_choco.dto.RegistrationRequest;
import by.dz.fruits_in_choco.fruits_in_choco.exception.UserNotConfirmedException;
import by.dz.fruits_in_choco.fruits_in_choco.mapper.UserMapper;
import by.dz.fruits_in_choco.fruits_in_choco.security.JwtAuthenticationException;
import by.dz.fruits_in_choco.fruits_in_choco.security.JwtTokenProvider;
import by.dz.fruits_in_choco.fruits_in_choco.service.impl.RegistrationServiceImpl;
import io.jsonwebtoken.JwtException;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.ws.Response;
import java.io.IOException;
import java.util.Locale;

@Controller
@RequestMapping(path = "/registration")
public class RegistrationController {
    private final RegistrationServiceImpl registrationService;
    private final UserMapper userMapper;
    private final JwtTokenProvider jwtTokenProvider;


    public RegistrationController(RegistrationServiceImpl registrationService, UserMapper userMapper, JwtTokenProvider jwtTokenProvider) {
        this.registrationService = registrationService;
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
    public String confirmRegistration
            (HttpServletResponse response, @RequestParam("token") String token, Model model) throws IOException {
        try {
            jwtTokenProvider.validateToken(token);
        } catch (JwtAuthenticationException e) {
            model.addAttribute("errorMessage", e.getMessage());
            return "registrationFailed";

//            return ResponseEntity.badRequest().body(e.getMessage());
//            response.sendRedirect("http://localhost:3000");
        }
        userMapper.confirmRegistration(token);
        return "registrationComplete";
    }
}
