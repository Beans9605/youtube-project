const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltrounds = 10;
const userSchema = mongoose.Schema({
    name : {
        type : String,
        maxlength : 50
    },
    email : {
        type : String,
        trim : true,
        unique : 1
    },
    password : {
        type : String,
        minlength : 5,
    },
    lastname : {
        type : String,
        maxlength : 50
    },
    role : {
        type : Number,
        default :0
    },
    image: String,
    token : {
        type : String
    },
    tokenExp : {
        type : Number
    }
})


// 유저 모델에 데이터를 저장하기 전에 실행한다는 의미 = pre
userSchema.pre('save', function( next ) {


    var user = this;

    // salt를 이용해서 비밀번호를 암호화, salt 먼저 생성 요함
    // 비밀번호를 바꿀때만 암호화해야함

    if(user.isModified('password')) {
    // 비밀번호를 암호화 시킨다.
    bcrypt.genSalt(saltrounds, function(err, salt){
        if(err) return next(err)
        bcrypt.hash(user.password, salt, function(err, hash) {
            if(err) return next(err)
            user.password = hash
            next()
        })
    })
    } else {
        next()
    }
})

userSchema.methods.comparePassword = function(plainpassword, cb) {
    
    // plainpassword 1234567     암호화된 비밀번호 $2b$10$I.6FhAjzDCmo0NnwUVDkN.peDu3ner2EU6AD0QJeTIMr7FjAoFdZG
    bcrypt.compare(plainpassword, this.password, function(err, isMatch) {
        if(err) return cb(err)
        cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function(cb) {

    var user = this;

    // jsonwebtoken을 이용해서 token을 생성하기
    // 원본 문자열로 받을 수가 없음, 16진수 문자열로 바꿔줘야함
    var token = jwt.sign(user._id.toHexString(), 'secretToken');

    user.token = token;
    user.save(function(err, user) {
        if(err) return cb(err)
        cb(null, user)
    })

}

userSchema.statics.findByToken = function (token, cb) {
    var user = this;

    // 토큰을 decode한다.
    jwt.verify(token, 'secretToken', function(err, decoded) {
        // 유저 id를 이용해서 유저를 찾은 다음에
        // 클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인

        user.findOne({"_id" : decoded, "token" : token}, function(err, user) {
            if (err) return cb(err)
            cb (null, user)
        })
    })
}

const User = mongoose.model('User', userSchema)

module.exports = { User }