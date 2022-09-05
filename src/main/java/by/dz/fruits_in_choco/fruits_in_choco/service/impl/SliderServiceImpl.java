package by.dz.fruits_in_choco.fruits_in_choco.service.impl;

import by.dz.fruits_in_choco.fruits_in_choco.entity.slide.Slide;
import by.dz.fruits_in_choco.fruits_in_choco.repository.SliderRepository;
import by.dz.fruits_in_choco.fruits_in_choco.service.SliderService;
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
    public Slide updateSlide(Slide newSlide, Short id) {
        return sliderRepository.findById(id)
                .map(slide -> {
                    slide.setTitle(newSlide.getTitle());
                    slide.setText(newSlide.getText());
                    slide.setImageURL(newSlide.getImageURL());
                    slide.setHref(newSlide.getHref());
                    return sliderRepository.save(slide);
                })
                .orElseGet(() -> {
                    newSlide.setId(id);
                    return sliderRepository.save(newSlide);
                });
    }

    @Override
    public void deleteSlide(Short id) {
        sliderRepository.deleteById(id);
    }
}
