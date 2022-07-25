package by.dz.fruits_in_choco.fruits_in_choco.util;

import org.springframework.stereotype.Service;

import java.util.function.Predicate;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static by.dz.fruits_in_choco.fruits_in_choco.util.Constants.EMAIL_REGEX;

@Service
public class EmailValidator implements Predicate<String> {
    public static final Pattern VALID_EMAIL_ADDRESS_REGEX =
            Pattern.compile(EMAIL_REGEX, Pattern.CASE_INSENSITIVE);

    @Override
    public boolean test(String s) {
        Matcher matcher = VALID_EMAIL_ADDRESS_REGEX.matcher(s);
        return matcher.find();
    }
}
