package by.dz.fruits_in_choco.fruits_in_choco.service.impl;

import by.dz.fruits_in_choco.fruits_in_choco.entity.user.User;
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
        return userRepository.findById(newProfile.getId())
                .map(user -> {
                    user.setFirstName(newProfile.getFirstName());
                    user.setLastName(newProfile.getLastName());
                    user.setEmail(newProfile.getEmail());
                    user.setRatings(newProfile.getRatings());
                    return userRepository.save(user);
                })
                .orElseGet(() -> {
                    newProfile.setId(newProfile.getId());
                    return userRepository.save(newProfile);
                });
    }
}
