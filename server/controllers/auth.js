import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {secretOrKey} from '../config/keys.js';

import UserAuth from "../models/userAuth.js";

// Load input validations
import { validateRegisterInput } from "../validation/register.js";
import { validateLoginInput } from "../validation/login.js";

export const registerUser = async (req, res) => {
  const user = req.body;
  const newUser = new UserAuth(user);
  const { errors, isValid } = validateRegisterInput(req.body);
  try {
    if (!isValid) {
      return res.status(400).json(errors);
    }
    UserAuth.findOne({ email: user.email }).then((user) => {
      user
        ? res.status(400).json("Email Already exists")
        : // Hash password before inserting int database
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then((user) => res.json(user))
                .catch((err) => console.log(err));
            });
          });
    });
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const { errors, isValid } = validateLoginInput(req.body);
  try {
    if (!isValid) {
      return res.status(400).json(errors);
    }
    // Find user by email
    UserAuth.findOne({ email }).then((user) => {
      if (!user) {
        return res.status(404).json("Email not found");
      }

      // Check password
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (isMatch) {
          // User matched
          // Create JWT Payload
          const payload = {
            id: user.id,
            name: user.name,
          };
          // Sign token
          jwt.sign(
            payload,
            secretOrKey,
            {
              expiresIn: 31556926, // 1 year in seconds
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token,
              });
            }
          );
        } else {
          return res
            .status(400)
            .json({ passwordincorrect: "Password incorrect" });
        }
      });
    });
  } catch (error) {
    console.log(error);
  }
};
