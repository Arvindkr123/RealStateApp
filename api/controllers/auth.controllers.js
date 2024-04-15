import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // Hash the password
    const hashPassword = await bcrypt.hash(password, 10);

    // Save user into database
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashPassword,
      },
    });

    res.status(201).json({ message: "User created successfully!", newUser });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Something went wrong" });
  } finally {
    await prisma.$disconnect(); // Disconnect Prisma Client
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // CHECK IF USER ALREADY EXISTS
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    // CHECK IF THE PASSWORD IS CORRECT
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // GENERATE THE TOKEN AND SEND TO THE USER
    // res.setHeader("Set-Cookie", "test =" + "myValue").json({ success: true });
    const age = 1000 * 60 * 60 * 24 * 7;
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: age,
    });
    res
      .cookie("token", token, {
        httpOny: true,
        //secure: true,
        maxAge: age,
      })
      .status(200)
      .json({ message: "Login successful" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: error.message || "Something went wrong" });
  } finally {
    await prisma.$disconnect(); // Disconnect Prisma Client
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("token").status(200).json({ message: "user logged out" });
  } catch (error) {
    res.status(500).json({ error: error.message || "Something went wrong" });
  }
};
