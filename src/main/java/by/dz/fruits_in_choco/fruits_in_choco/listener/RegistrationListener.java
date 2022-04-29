package by.dz.fruits_in_choco.fruits_in_choco.listener;

import by.dz.fruits_in_choco.fruits_in_choco.entity.user.User;
import by.dz.fruits_in_choco.fruits_in_choco.event.OnRegistrationCompleteEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.EventListener;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

@Component
public class RegistrationListener {
    private final JavaMailSender mailSender;

    public RegistrationListener(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }
//
//    @Override
//    public void onApplicationEvent(OnRegistrationCompleteEvent event) {
//        this.confirmRegistration(event);
//    }

    @EventListener
    public void handleRegistrationNewUser(OnRegistrationCompleteEvent event) {
        User user = event.getUser();
        String recipientAddress = user.getEmail();
        String subject = "Registration Confirmation";
        String confirmationUrl
                = event.getAppUrl() + "/registration/confirm?token=" + user.getActivationToken();

        SimpleMailMessage email = new SimpleMailMessage();
        email.setTo(recipientAddress);
        email.setSubject(subject);
        email.setText("\r\n" + "http://localhost:8080" + confirmationUrl);
        mailSender.send(email);
    }
}
