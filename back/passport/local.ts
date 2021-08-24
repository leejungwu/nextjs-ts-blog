import passport from 'passport';
import { Strategy } from 'passport-local';
import bcrypt from 'bcrypt';
import db from '../models';
const User = db.User;

module.exports = () => {
    passport.use(new Strategy({
        usernameField : 'email',        // req.body.email
        passwordField : 'password',     // req.body.password
    }, async (email, password, done) => {
        try {
            const user = await User.findOne({
                where: { email }
            });
            if (!user) {
                return done(null, false, { message: '존재하지 않는 사용자입니다.'});
            }
            const result = await bcrypt.compare(password, user.password);
    
            if (result) {
                return done(null, user);
            }
            return done(null, false, { message: '비밀번호가 틀렸습니다.' });
        } catch (error) {
            console.error(error);
            return done(error);
        }
    }));
}