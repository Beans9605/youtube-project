const { User } = require('../models/User');

let auth = (req, res, next) => {
    // 인증처리를 하는 곳

    // 클라이언트 쿠키에서 토큰을 가져온다.
    let token = req.cookies.x_auth;
    // 토큰을 복화 한 후 유저를 찾는다.
    User.findByToken(token, (err, user)=> {
        if(err) throw err;
        if(!user) return res.json({isAuth : false, error : true})
        // 미들웨어이기 때문에 중간에서 처리 됐기 때문에 req에 데이터를 넣어주면
        // auth app에서 req로 사용할 수 있음
        req.token = token;
        req.user = user;
        next();
    })
    // 유저가 있으면 인증 okay

    // 유저가 없으면 인증 no

}

module.exports = { auth };