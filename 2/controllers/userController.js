import { createUser, getUsers, updateUser, deleteUser } from '../models/userModel.js';

export const createUserController = async (req, res) => {
    const { name, email } = req.body;
    await createUser(name, email);
    res.json({ msg: 'Created' });
};

export const getUsersController = async (req, res) => {
    const users = await getUsers();
    res.json({ msg: 'List of Users', users });
};

export const updateUserController = async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    await updateUser(id, name, email);
    res.json({ msg: 'Updated' });
};

export const deleteUserController = async (req, res) => {
    const { id } = req.params;
    await deleteUser(id);
    res.json({ msg: 'Deleted' });
};