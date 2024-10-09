package com.spencergifts.lp.lpdb.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

// user model

@Entity
@Table(name = "users")
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "user_id", unique = true, nullable = false)
  private long user_id;

  @Column(name = "first_name", nullable = false)
  private String first_name;

  @Column(name = "last_name", nullable = false)
  private String last_name;

  @Column(name = "email", nullable = false, unique = true)
  private String email;

  @Column(name = "admin", nullable = false)
  private boolean admin;

  @Column(name = "active", nullable = false)
  private boolean active;


  protected User() {}

  public User(long user_id, String first_name, String last_name, String email, boolean admin, boolean active) {
    this.user_id = user_id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.admin = admin;
    this.active = active;
  }

  public long getuser_id() {
    return user_id;
  }

  public void setuser_id(long user_id) {
    this.user_id = user_id;
  }

  public String getFirstName() {
    return first_name;
  }

  public void setFirstName(String first_name) {
    this.first_name = first_name;
  }

  public String getLastName() {
    return last_name;
  }

  public void setLastName(String last_name) {
    this.last_name = last_name;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public boolean getAdmin() {
    return admin;
  }

  public void setAdmin(boolean admin) {
    this.admin = admin;
  }

  public boolean getActive() {
    return active;
  }

  public void setActive(boolean active) {
    this.active = active;
  }

  @Override
  public String toString(){
    return String.format(
      "User[user_id=%d, first_name='%s', last_name='%s', email='%s', admin=%b, active=%b]", 
      user_id, first_name, last_name, email, admin, active);
  }

}