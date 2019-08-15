import bcrypt from "bcrypt";
import mongoose, {
  model,
  PassportLocalDocument,
  PassportLocalModel,
  PassportLocalSchema,
  Schema
} from "mongoose";
import mongodbErrorHandler from "mongoose-mongodb-errors";

export interface IUserModel extends PassportLocalDocument {
  email: string;
  password: string;
  comparePassword: any;
}

// Every user has an email and password.  The password is not stored as
// plain text - see the authentication helpers below.
const UserSchema = new Schema<IUserModel>({
  email: {
    type: mongoose.Schema.Types.String
  },
  password: {
    type: mongoose.Schema.Types.String
  }
});

UserSchema.plugin(mongodbErrorHandler as any);

// The user's password is never saved in plain text.  Prior to saving the
// user model, we 'salt' and 'hash' the users password.  This is a one way
// procedure that modifies the password - the plain text password cannot be
// derived from the salted + hashed version. See 'comparePassword' to understand
// how this is used.
UserSchema.pre("save", function save(next) {
  const user = this as IUserModel;
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (saltErr, salt) => {
    if (saltErr) {
      return next(saltErr);
    }
    bcrypt.hash(user.password, salt, (hashErr, hash) => {
      if (hashErr) {
        return next(hashErr);
      }
      user.password = hash;
      next();
    });
  });
});

// We need to compare the plain text password (submitted whenever logging in)
// with the salted + hashed version that is sitting in the database.
// 'bcrypt.compare' takes the plain text password and hashes it, then compares
// that hashed password to the one stored in the DB.  Remember that hashing is
// a one way process - the passwords are never compared in plain text form.
UserSchema.methods.comparePassword = function comparePassword(
  candidatePassword,
  cb
) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

export const User = model<IUserModel>("user", UserSchema);
