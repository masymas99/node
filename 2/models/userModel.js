import mysql from "mysql2/promise";

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "nodejs_mysql"
});

export const createUser = async (name, email) => {
    const sql = "INSERT INTO users (name,email) VALUES (? , ?)";
    await db.execute(sql, [name, email]);
};

export const getUsers = async () => {
    const sql = "SELECT * FROM users";
    const [users] = await db.execute(sql);
    return users;
};

export const updateUser = async (userId, name, email) => {
    const sql = "UPDATE users SET name= ? , email = ? where id = ?";
    await db.execute(sql, [name, email, userId]);
};

export const deleteUser = async (userId) => {
    const sql = "DELETE FROM users WHERE id = ?";
    await db.execute(sql, [userId]);
};