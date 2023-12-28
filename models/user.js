class User {
  constructor({
    userId,
    username,
    passwordHash,
    email,
    profilePhoto,
    favoriteSpotId,
    lastLogin,
    registrationAt,
  }) {
    this.userId = userId;
    this.username = username;
    this.passwordHash = passwordHash;
    this.email = email;
    this.profilePhoto = profilePhoto;
    this.favoriteSpotId = favoriteSpotId;
    this.lastLogin = lastLogin;
    this.registrationAt = registrationAt || new Date();
  }
}

export default User;
