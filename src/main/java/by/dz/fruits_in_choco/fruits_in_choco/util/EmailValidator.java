package by.dz.fruits_in_choco.fruits_in_choco.util;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Component;

import java.util.function.Predicate;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static by.dz.fruits_in_choco.fruits_in_choco.util.Constants.EMAIL_REGEX;

@Component
public class EmailValidator implements Predicate<String> {
    private static final Logger log = LogManager.getLogger(EmailValidator.class);
    public static final Pattern VALID_EMAIL_ADDRESS_REGEX = Pattern.compile(EMAIL_REGEX, Pattern.CASE_INSENSITIVE);

    @Override
    public boolean test(String s) {
        log.info("Validating email address: " + s);
        Matcher matcher = VALID_EMAIL_ADDRESS_REGEX.matcher(s);
        return matcher.find();
    }
}
