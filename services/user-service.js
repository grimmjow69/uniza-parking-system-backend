const bcrypt = require("bcrypt");
const User = require("../db-models/user");
const ExtecptionType = require("../enums/exception-type")

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async addUser(userDetail) {
    try {
      const existingUserByuserName = await this.getUserByLogin(userDetail.username);
      if (existingUserByuserName) {
        throw new Error(ExtecptionType.USERNAME_TAKEN);
      }

      const existingUserByEmail = await this.getUserByLogin(userDetail.email);
      if (existingUserByEmail) {
        throw new Error(ExtecptionType.EMAIL_TAKEN);
      }

      const saltRounds = 7;
      const hashedPassword = await bcrypt.hash(userDetail.password, saltRounds);

      const newUser = new User({
        username: userDetail.username,
        passwordHash: hashedPassword,
        email: userDetail.email,
      });

      const userId = await this.userRepository.addUser(newUser);
      return userId;
    } catch (error) {
      console.error(`Failed to add user - ${error.message}`);
      throw error;
    }
  }

  async loginUser(login) {
    try {
      const user = await this.userRepository.getUserByLogin(login);

      if (!user) {
        throw new Error(ExtecptionType.USER_NOT_FOUND);
      }

      const isMatch = await bcrypt.compare(
        userDetails.password,
        user.passwordHash
      );

      if (isMatch) {
        const { passwordHash, ...userWithoutPassword } = user;
        return userWithoutPassword;
      } else {
        throw new Error(ExtecptionType.INCORRECT_PASSWORD);
      }
    } catch (error) {
      console.error(`Login failed - ${error.message}`);
      throw error;
    }
  }

  async deleteUser(userId) {
    try {
      const user = await this.userRepository.getUserById(userId);
      if (!user) {
        throw new Error(`User with id ${userId} not found.`);
      }
  
      const isDeleted = await this.userRepository.deleteUser(userId);
      return isDeleted;
    } catch (error) {
      console.error(`Failed to delete user - ${error.message}`);
      throw error;
    }
  }

  async updateUser(updateData) {
    try {
      const user = await this.userRepository.getUserById(updateData.userId);
      if(!user) {
        throw new Error(ExtecptionType.USER_NOT_FOUND);
      }
      const isUpdated = await this.userRepository.updateUser(
        updateData
      );
      return isUpdated;
    } catch (error) {
      console.error(`Failed to update user - ${error.message}`);
      throw error;
    }
  }

  async updateLastLogin(userId) {
    try {
      const isUpdated = await this.userRepository.updateLastLogin(userId);
      return isUpdated;
    } catch (error) {
      console.error(`Failed to update last login - ${error.message}`);
      throw error;
    }
  }

  async getUserById(userId) {
    try {
      const user = await this.userRepository.getUserById(userId);
      return user;
    } catch (error) {
      console.error(`Failed to retrieve user - ${error.message}`);
      throw error;
    }
  }

  async getUserByLogin(userLogin) {
    try {
      const user = await this.userRepository.getUserByLogin(userLogin);
      return user;
    } catch (error) {
      console.error(`Failed to retrieve user - ${error.message}`);
      throw error;
    }
  }
}

module.exports = UserService;
