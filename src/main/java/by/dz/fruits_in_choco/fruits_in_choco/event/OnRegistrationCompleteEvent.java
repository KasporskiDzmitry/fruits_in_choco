package by.dz.fruits_in_choco.fruits_in_choco.event;

import by.dz.fruits_in_choco.fruits_in_choco.entity.User;
import org.springframework.context.ApplicationEvent;

public class OnRegistrationCompleteEvent extends ApplicationEvent {
    private String appUrl;
    private User user;


    public OnRegistrationCompleteEvent(User user, String appUrl) {
        super(user);
        this.user = user;
        this.appUrl = appUrl;
    }

    public String getAppUrl() {
        return appUrl;
    }

    public void setAppUrl(String appUrl) {
        this.appUrl = appUrl;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
