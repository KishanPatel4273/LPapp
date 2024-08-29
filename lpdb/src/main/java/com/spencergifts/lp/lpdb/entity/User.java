package com.spencergifts.lp.lpdb.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

@Entity
@Table(name = "users")
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "user_id", nullable = false)
  private Integer userId;

  @Column(name = "first_name", nullable = false)
  private String firstName;

   @Column(name = "last_name", nullable = false)
  private String lastName;

  @Column(name = "email", nullable = false, unique = true, columnDefinition = "VARCHAR(255) COMMENT 'spencer's email of user'")
  private String email;

  @Column(name = "admin", nullable = false, columnDefinition = "TINYINT(1) DEFAULT 0 COMMENT 'admin access?'")
  private Boolean admin;

  @Column(name = "active", nullable = false, columnDefinition = "TINYINT(1) DEFAULT 1 COMMENT 'if currently working'")
  private Boolean active;


  protected User() {}

  public User(String firstName, String lastName, String email) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }

  public Integer getUserId() {
    return userId;
  }

  public void setUserId(Integer userId) {
    this.userId = userId;
  }

  public String getFirstName() {
    return firstName;
  }

  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

  public String getLastName() {
    return lastName;
  }

  public void setLastName(String lastName) {
    this.lastName = lastName;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public Boolean getAdmin() {
    return admin;
  }

  public void setAdmin(Boolean admin) {
    this.admin = admin;
  }

  public Boolean getActive() {
    return active;
  }

  public void setActive(Boolean active) {
    this.active = active;
  }

  @Override
  public String toString(){
    return String.format(
      "User[userId=%d, first_name='%s', last_name='%s', email='%s', admin=%b, active=%b]", 
      userId, firstName, lastName, email, admin, active);
  }

}