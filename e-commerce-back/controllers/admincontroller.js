const AdminModel = require('../models/Admins');
const RegisterModel = require('../models/Register');
const bcrypt = require('bcryptjs');

const AdminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await AdminModel.findOne({ email: email });
        if (!admin) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: "Invalid email or password" });
        }
        return res.json({ message: "Login successful", adminId: admin._id });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
const addAgents = async (req, res) => {
    try {
        const { name, Lastname, email, contact, password, repeatPassword, role } = req.body;

        if (password !== repeatPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        const user = await AdminModel.findOne({ email: email });
        if (user) {
            return res.status(400).json({ error: "Email is already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new AdminModel({ name, Lastname, email, contact, password: hashedPassword, role });
        await newAdmin.save();
        return res.json("admin added  successfully");
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
const deleteAdmin = async (req, res) => {
    const adminId = req.params.id;
    try {
        const deletedAdmin = await AdminModel.findByIdAndDelete(adminId);
        if (!deletedAdmin) {
            return res.json('Admin not found.');
        }
        return res.json('Admin deleted successfully:');
    } catch (error) {
        console.error('Error deleting admin:', error);
        return res.status(500).json('Error deleting admin.');
    }
}

const deleteUser = async (req, res) => {
    const UserId = req.params.id;
    try {
        const deletedAdmin = await RegisterModel.findByIdAndDelete(UserId);
        if (!deletedAdmin) {
            return res.json('User not found.');
        }
        return res.json('User deleted successfully:');
    } catch (error) {
        console.error('Error deleting User:', error);
        return res.status(500).json('Error deleting User.');
    }
}
const FetchAdmin = async (req, res) => {
    const adminId = req.params.id;
    try {
        const getAdmin = await AdminModel.findById(adminId);

        if (!getAdmin) {
            return res.status(404).json({ error: "Admin not found" });
        }
        return res.status(200).json({ role: getAdmin.role });
    } catch (error) {
        console.error('Error getting admin:', error);
        return res.status(500).json({ error: "Error getting admin" });
    }
}
module.exports = {
    addAgents,
    AdminLogin,
    deleteAdmin,
    deleteUser,
    FetchAdmin,
};