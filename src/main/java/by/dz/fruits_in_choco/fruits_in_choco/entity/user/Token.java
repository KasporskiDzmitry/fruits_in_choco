package by.dz.fruits_in_choco.fruits_in_choco.entity.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity(name = "Token")
@Table(name = "token")
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Token {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String access;

    private String refresh;

    @Override
    public String toString() {
        return "Token{" +
                "id=" + id +
                ", access='" + access + '\'' +
                ", refresh=" + refresh +
                '}';
    }
}
