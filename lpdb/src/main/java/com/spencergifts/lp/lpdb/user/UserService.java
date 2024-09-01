package com.spencergifts.lp.lpdb.user;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;

@Service
public class UserService
 {
    private final UserRepository userRepository;

    UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    List<User> findAll() {
        return userRepository.findAll();
    }

    Optional<User> findById(long user_id) {
        return userRepository.findById(user_id);
    }

    User save(User user) throws NullValueException, DuplicateEmailException {
        if (user.getFirstName() == null || user.getLastName() == null) {
            throw new NullValueException();
        }
        if (this.userRepository.emailExists(user.getEmail()) != null){
            throw new DuplicateEmailException();
        }
        return userRepository.save(user);
    }

    @Transactional
    void update(User user, long id) {
        userRepository.updateById(user.getAdmin(), user.getActive(), id);
    }

    void delete(User user) {
        // TODO: catch
        this.userRepository.delete(user);
    }
}
