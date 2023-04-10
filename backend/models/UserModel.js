class UserModel {
  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }

  getUsername() {
    return this.username;
  }

  getEmail() {
    return this.email;
  }

  getPassword() {
    return this.password;
  }
}
export default UserModel;