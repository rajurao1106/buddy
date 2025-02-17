import User from "../models/authentication.js";
export const signinForm = async (req, res) => {
  const { email, password } = req.body; 

  try {
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    return res.status(200).json({ message: 'Logged in successfully' });
  } catch (err) {
    console.error(err.message); 
    return res.status(500).json({ message: 'Server error' });
  }
};
