package by.dz.fruits_in_choco.fruits_in_choco.service.impl;

import by.dz.fruits_in_choco.fruits_in_choco.entity.user.User;
import by.dz.fruits_in_choco.fruits_in_choco.exception.EntityNotFoundException;
import by.dz.fruits_in_choco.fruits_in_choco.repository.UserRepository;
import by.dz.fruits_in_choco.fruits_in_choco.service.ProfileService;
import org.springframework.stereotype.Service;

@Service("profileService")
public class ProfileServiceImpl implements ProfileService {
    private final UserRepository userRepository;

    public ProfileServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User updateProfile(User newProfile) {
        User profile = userRepository.findById(newProfile.getId())
                .orElseThrow(() -> new EntityNotFoundException(User.class.getSimpleName(), newProfile.getId()));

        profile.setFirstName(newProfile.getFirstName());
        profile.setLastName(newProfile.getLastName());
        profile.setEmail(newProfile.getEmail());
        profile.setRatings(newProfile.getRatings());
        return userRepository.save(profile);
    }
}
