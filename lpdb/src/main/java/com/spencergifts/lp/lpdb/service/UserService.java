package com.spencergifts.lp.lpdb.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.spencergifts.lp.lpdb.exceptions.DuplicateEmailException;
import com.spencergifts.lp.lpdb.exceptions.NullValueException;
import com.spencergifts.lp.lpdb.model.User;
import com.spencergifts.lp.lpdb.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class UserService
 {
    private final UserRepository userRepository;

    UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public Optional<User> findById(long user_id) {
        return userRepository.findById(user_id);
    }

    public User save(User user) throws NullValueException, DuplicateEmailException {
        if (user.getFirstName() == null || user.getLastName() == null) {
            throw new NullValueException();
        }
        if (this.userRepository.emailExists(user.getEmail()) != null){
            throw new DuplicateEmailException();
        }
        return userRepository.save(user);
    }

    @Transactional
    public
    void update(User user, long id) {
        userRepository.updateById(user.getAdmin(), user.getActive(), id);
    }

    public void delete(User user) {
        // TODO: catch
        this.userRepository.delete(user);
    }
}
