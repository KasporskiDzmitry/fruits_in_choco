package by.dz.fruits_in_choco.fruits_in_choco.entity.user;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity(name = "User")
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;

    private String password;

    @Column(name = "firstname")
    private String firstName;

    @Column(name = "lastname")
    private String lastName;

    @Column(name = "status", columnDefinition = "ENUM('ACTIVE', 'BANNED', 'NOT_CONFIRMED')")
    @Enumerated(value = EnumType.STRING)
    private Status status;

    @Column(name = "role", columnDefinition = "ENUM('ADMIN', 'USER')")
    @Enumerated(value = EnumType.STRING)
    private Role role;

    @Column(name = "activationtoken")
    private String activationToken;

    @OneToOne(cascade = {CascadeType.REMOVE})
    @JoinColumn(name = "token_id")
    private Token token;

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", status=" + status +
                ", role=" + role +
                ", activationToken='" + activationToken + '\'' +
                ", token=" + token +
                '}';
    }
}
