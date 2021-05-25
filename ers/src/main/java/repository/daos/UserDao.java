package repository.daos;

import java.util.List;

import repository.models.User;

public interface UserDao {

    // crud operations
    int add(User u);

    List<User> getAllEmployees();

    User get(User i);

    User login(String username, String password);

    User update(User i);

    int remove(User i);

}
