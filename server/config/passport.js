import Jwt from "passport-jwt";
import mongoose from "mongoose";
import {secretOrKey} from "./keys.js";
// import UserAuth from '../models/userAuth.js';


const User = mongoose.model("UserAuth")


export default function (passport) {
    console.log("passport ran")
    const opts = {};
    opts.jwtFromRequest = Extract_Jwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = secretOrKey;
    passport.use(
        new Strategy(opts, (jwt_payload, done) => {
          User.findById(jwt_payload.id)
            .then(user => {
              if (user) {
                return done(null, user);
              }
              return done(null, false);
            })
            .catch(err => console.log(err));
        })
      );
}
