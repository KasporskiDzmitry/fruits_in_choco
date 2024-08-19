package by.dz.fruits_in_choco.fruits_in_choco.service.impl;

import by.dz.fruits_in_choco.fruits_in_choco.entity.Slide;
import by.dz.fruits_in_choco.fruits_in_choco.exception.EntityNotFoundException;
import by.dz.fruits_in_choco.fruits_in_choco.repository.SliderRepository;
import by.dz.fruits_in_choco.fruits_in_choco.service.SliderService;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("sliderService")
public class SliderServiceImpl implements SliderService {
    private final SliderRepository sliderRepository;

    public SliderServiceImpl(SliderRepository sliderRepository) {
        this.sliderRepository = sliderRepository;
    }

    @Override
    public List<Slide> getSlides() {
        return sliderRepository.findAll();
    }

    @Override
    public Slide saveSlide(Slide slide) {
        return sliderRepository.save(slide);
    }

    @Override
    public Slide updateSlide(Slide newSlide, Long id) {
        Slide slide = sliderRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Slide", id));

        slide.setTitle(newSlide.getTitle());
        slide.setText(newSlide.getText());
        slide.setImageURL(newSlide.getImageURL());
        slide.setHref(newSlide.getHref());
        return sliderRepository.save(slide);
    }

    @Override
    public void deleteSlide(Long id) {
        try {
            sliderRepository.deleteById(id);
        } catch (EmptyResultDataAccessException e) {
            throw new EntityNotFoundException("Slide", id);
        }
    }
}
