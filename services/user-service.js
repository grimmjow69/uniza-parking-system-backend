class UserService {
    constructor(userRepository) {
      this.userRepository = userRepository;
    }
  
    async addUser(userDetails) {
      try {
        const userId = await this.userRepository.addUser(userDetails);
        return userId;
      } catch (error) {
        console.error(`Failed to add user - ${error.message}`);
        throw error;
      }
    }
  
    async deleteUser(userId) {
      try {
        const isDeleted = await this.userRepository.deleteUser(userId);
        return isDeleted;
      } catch (error) {
        console.error(`Failed to delete user - ${error.message}`);
        throw error;
      }
    }
  
    async updateUser(userId, updateData) {
      try {
        const isUpdated = await this.userRepository.updateUser(userId, updateData);
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