import passport from 'passport';
const local = require('./local');
const kakao = require('./kakao');
import db from '../models';  // const { User } = require('../models'); => findOne ERROR 
const User = db.User;

type User = {
  id?: number,
}

module.exports = () => {
    passport.serializeUser((user:User, done) => {      
        console.log('serialize',user.id)
        done(null, user.id);                       // 서버에 id 저장
    });
  
    passport.deserializeUser(async(id, done) => {  // db에서 id로 data복구한 것들 => req.user
      console.log('deserialize',id)
      try {
        const user = await User.findOne({ where: { id }});
        done(null, user); // req.user
      } catch (error) {
        console.error(error);
        done(error);
      }
    });
  
    local();
    kakao();
};

// 프론트 <-> 서버: cookie만
// 서버가 쿠키파서, 익스프레스 세션으로 쿠키 검사 후 id: 1 발견
// db에서 id로 data복구 => req.user
// 요청 보낼때마다 deserializeUser가 실행됨(db 요청 1번씩 실행)