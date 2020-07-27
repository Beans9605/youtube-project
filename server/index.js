const express = require('express');
const app = express();
const port = 5000;


const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const config = require('./config/key');
const { auth } = require('./middleware/auth');
const { User } = require('./models/User');

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended : true}));
// application/json
app.use(bodyParser.json());
app.use(cookieParser());
const mongoose = require('mongoose');

mongoose.connect(config.mongoURI, {
    useNewUrlParser:true, useUnifiedTopology : true, useCreateIndex : true, useFindAndModify : false
}).then(()=> console.log('MongoDB Connected...')).catch(err=>console.log(err));









// 기본 경로로 접근하면 response에 hello world! 문자열을 보내줌
app.get('/', (req, res) => res.send('Hello World!~ 안녕하세요~'));


app.post('/api/users/login', (req, res)=> {
    // 요청된 이메일을 데이터베이스에서 있는지 찾는다.
    User.findOne({email: req.body.email}, (err, user) => {
        if (!user) {
            return res.json({
                loginSuccess : false,
                message : "제공된 이메일에 해당하는 유저가 없습니다."
            })
        }

        user.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch) return res.json({loginSuccess:false, massege: "비밀번호가 틀렸습니다."})
            // 비밀번호가 맞다면 token 생성
            user.generateToken((err, user) => {
                if(err) return res.status(400).send(err);
                // 토큰을 저장한다. 어디에? 쿠키, 로컬스토리지, 세션 등등 여러군데 저장 가능.
                res.cookie("x_auth", user.token).status(200).json({loginSuccess:true, userId : user._id})
            })
        })


    })

    // 요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인.

    // 비밀번호까지 같다면 token 생성

})


// role 1 : admin, role : 특정 부서 admin 이면 달라질 수 있음

// middleware? endpoint에 req를 받은 다음 cb function전에 수행하는 작업
app.get('/api/users/auth', auth, (req, res)=> {
    // 여기까지 미들웨어를 통과해 왔다는 얘기는 Authentication 작업이 끝났다는 의미
    res.status(200).json({
        _id : req.user._id,
        // role이 0이면 일반 유저 1, 2, 3 등등 이면 관리자
        isAdmin : req.user.role === 0 ? false : true, 
        email : req.user.email,
        name : req.user.name,
        lastname : req.user.lastname,
        role : req.user.role,
        image : req.user.image
    })
})

app.get('/api/users/logout', auth, (req, res)=> {
    User.findOneAndUpdate({_id:req.user._id}, {token: ""}, (err, user)=>{
        if (err) return res.json({success:false, err});
        return res.status(200).send({
            success: true
        })
    })
})

// 회원가입을 위한 route
app.post('/api/users//register', (req, res) => {
    // 회원 가입할 때 필요한 정보들을 client에서 가져오면
    // 그것들을 데이터 베이스에 넣어준다.
    const user = new User(req.body) 

    user.save((err, userInfo)=> {
        if(err) return res.json({success:false, err})
        // status(200)은 성공했다는 의미임
        return res.status(200).json({success:true})
    })

})
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));