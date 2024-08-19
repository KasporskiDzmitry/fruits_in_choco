package by.dz.fruits_in_choco.fruits_in_choco.service;

import by.dz.fruits_in_choco.fruits_in_choco.entity.Slide;

import java.util.List;

public interface SliderService {
    List<Slide> getSlides();
    Slide saveSlide(Slide slide);
    Slide updateSlide(Slide slide, Long id);
    void deleteSlide(Long id);
}
