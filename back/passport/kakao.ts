import passport from 'passport';
import { Strategy } from 'passport-kakao';
import db from '../models';
const User = db.User;

module.exports = () => {
    passport.use(new Strategy({
        clientID: process.env.KAKAO_ID as string,
        clientSecret: '',
        callbackURL: '/auth/kakao/callback',
    }, async (accessToken:any, refreshToken:any, profile:any, done:any) => {
        try {
            const exUser = await User.findOne({
                where: { snsId: profile.id, provider: 'kakao' } 
            });
            if (exUser) {
                done(null, exUser);
            } else {
                const newUser = await User.create({
                    email: profile._json && profile._json.kakao_account_email,
                    nick: profile.displayName,
                    snsId: profile.id,
                    provider: 'kakao',
                });
                done(null, newUser);
            } 
        } catch (error) {
            console.error(error);
            done(error);
        }
    }));
}