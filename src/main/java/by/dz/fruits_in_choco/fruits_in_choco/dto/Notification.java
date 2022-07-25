package by.dz.fruits_in_choco.fruits_in_choco.dto;

import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
@Builder
public class Notification {
    private Date date;
    private String type;
}
