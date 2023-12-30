class UserRepository {
  constructor(db) {
    this.db = db;
  }

  async addUser(user) {
    const query = `
        INSERT INTO public."user" (
          username, 
          password_hash, 
          email
        ) VALUES ($1, $2, $3)
        RETURNING user_id;
      `;
    const values = [user.username, user.passwordHash, user.email];

    try {
      const { rows } = await this.db.query(query, values);
      return rows[0].user_id;
    } catch (error) {
      throw new Error(`Unable to add user: ${error.message}`);
    }
  }

  async deleteUser(userId) {
    const query = `
      DELETE FROM public."user"
      WHERE user_id = $1;
    `;
    const values = [userId];

    try {
      const result = await this.db.query(query, values);
      return result.rowCount > 0;
    } catch (error) {
      throw new Error(`Unable to delete user: ${error.message}`);
    }
  }

  async updateUser(updateData) {
    const setClauses = [];
    const values = [];
  
    if (updateData.username) {
      setClauses.push(`username = $${setClauses.length + 1}`);
      values.push(updateData.username);
    }
    if (updateData.password) {
      // TODO pswd need to be rehashed
      setClauses.push(`password_hash = $${setClauses.length + 1}`);
      values.push(updateData.password);
    }
    if (updateData.email) {
      setClauses.push(`email = $${setClauses.length + 1}`);
      values.push(updateData.email);
    }
    if (updateData.profilePhoto) {
      setClauses.push(`profile_photo = $${setClauses.length + 1}`);
      values.push(updateData.profilePhoto);
    }
  
    if (setClauses.length === 0) {
      throw new Error("No valid fields provided for update");
    }
  
    values.push(updateData.userId);
  
    const query = `
      UPDATE public."user"
      SET ${setClauses.join(", ")}
      WHERE user_id = $${values.length};
    `;

    console.log(query)
    console.log(values)
  
    try {
      await this.db.query(query, values);
      return true;
    } catch (error) {
      throw new Error(`Unable to update user: ${error.message}`);
    }
  }

  async updateLastLogin(userId) {
    const query = `
      UPDATE public."user"
      SET last_login = $1
      WHERE user_id = $2;
    `;
    const values = [new Date(), userId];

    try {
      await this.db.query(query, values);
      return true;
    } catch (error) {
      throw new Error(`Unable to update last login: ${error.message}`);
    }
  }

  async getUserById(userId) {
    const query = `
      SELECT user_id, username, email, profile_photo, favorite_spot_id, last_login, registration_at
      FROM public."user"
      WHERE user_id = $1;
    `;
    const values = [userId];

    try {
      const { rows } = await this.db.query(query, values);
      return rows[0];
    } catch (error) {
      throw new Error(`Unable to retrieve user: ${error.message}`);
    }
  }

  // login means here email or username
  async getUserByLogin(userLogin) {
    const query = `
      SELECT user_id, username, email, profile_photo, favorite_spot_id, last_login, registration_at
      FROM public."user"
      WHERE userName = $1 OR email = $1;
    `;
    const values = [userLogin];

    try {
      const { rows } = await this.db.query(query, values);
      return rows[0];
    } catch (error) {
      throw new Error(`Unable to retrieve user: ${error.message}`);
    }
  }
}

module.exports = UserRepository;
