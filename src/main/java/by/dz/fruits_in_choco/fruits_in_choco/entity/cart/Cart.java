package by.dz.fruits_in_choco.fruits_in_choco.entity.cart;

import by.dz.fruits_in_choco.fruits_in_choco.entity.product.Product;
import by.dz.fruits_in_choco.fruits_in_choco.entity.user.User;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Data
@Entity(name = "Cart")
@Table(name = "cart")
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int quantity;

    private float price;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CartItem> cartItems;

    @OneToOne(mappedBy = "cart")
    @JsonBackReference
    private User user;

    public void add(CartItem cartItem) {
        this.cartItems.add(cartItem);
        refresh();
    }

    public CartItem update(Product product, int quantity) {
        CartItem cartItem = this.getCartItems().stream()
                .filter(i -> i.getProduct().getId() == product.getId())
                .toList()
                .get(0);

        cartItem.setQuantity(quantity);
        refresh();
        return cartItem;
    }

    public void delete(Long id) {
        this.getCartItems().removeIf(i -> i.getProduct().getId() == id);
        refresh();
    }

    public void refresh() {
        int quantity = 0;
        float price = 0;
        for (CartItem item : this.cartItems) {
            quantity += item.getQuantity();
            price += item.getProduct().getPrice() * item.getQuantity();
        }
        this.quantity = quantity;
        this.price = price;
    }

    public void clear() {
        this.price = 0;
        this.quantity = 0;
        this.cartItems = null;
    }

    @Override
    public String toString() {
        return "Cart{" +
                "id=" + id +
                ", quantity='" + quantity + '\'' +
                ", price=" + price +
                ", cartItems=" + cartItems +
                ", userId=" + user.getId() +
                '}';
    }
}
