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
      const { name, lastName, email, contact, password, repeatPassword, role } = req.body;
  
      if (password !== repeatPassword) {
        return res.status(400).json({ error: "Passwords do not match" });
      }
  
      const existingUser = await AdminModel.findOne({ email: email });
      if (existingUser) {
        return res.status(400).json({ error: "Email is already registered" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const newAdmin = new AdminModel({ name, lastName, email, contact, password: hashedPassword, role });
      await newAdmin.save();
      
      return res.status(201).json({ message: "Admin added successfully" });
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
const updateAdmin = async (req, res) => {
    try {
        const AdminId = req.params.id;
        const { newName, newLastName, newEmail, newContact } = req.body;
        
        const update = {};
        
        if (newName) update.name = newName;
        if (newLastName) update.lastName = newLastName; 
        if (newEmail) update.email = newEmail;
        if (newContact) update.contact = newContact;
    
        const updatedAdmin = await AdminModel.findByIdAndUpdate(AdminId, update, { new: true });
    
        if (!updatedAdmin) {
            return res.status(404).json({ message: "Admin not found." });
        }
    
        res.send(updatedAdmin);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};
const updateUsers = async (req, res) => {
    try {
        const UserId = req.params.id;
        const { newName, newEmail } = req.body;
        
        const update = {};
        
        if (newName) update.name = newName;
        if (newEmail) update.email = newEmail;
      
        const updateduser = await  RegisterModel.findByIdAndUpdate(UserId, update, { new: true });
    
        if (!updateduser) {
            return res.status(404).json({ message: "Admin not found." });
        }
    
        res.send(updateduser);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};



 



module.exports = {
    addAgents,
    AdminLogin,
    deleteAdmin,
    deleteUser,
    FetchAdmin,
    updateAdmin,
    updateUsers,
};