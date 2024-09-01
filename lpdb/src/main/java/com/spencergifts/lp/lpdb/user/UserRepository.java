
package com.spencergifts.lp.lpdb.user;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.data.repository.query.Param;

import jakarta.transaction.Transactional;

/*
 * outline methods on the user table
 */
interface UserRepository extends ListCrudRepository<User, Long> {

    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.admin = :admin, u.active = :active WHERE u.user_id = :id")
    void updateById(@Param("admin") boolean admin, @Param("active") boolean active, @Param("id") long id);

    @Query(value = "SELECT * FROM users WHERE email = :email", nativeQuery=true)
    User emailExists(@Param("email") String email);
}