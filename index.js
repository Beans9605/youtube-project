const express = require('express');
const app = express();
const port = 5000;
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Yeong:database@bolierplate-ypsud.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser:true, useUnifiedTopology : true, useCreateIndex : true, useFindAndModify : false
}).then(()=> console.log('MongoDB Connected...')).catch(err=>console.log(err));


// 기본 경로로 접근하면 response에 hello world! 문자열을 보내줌
app.get('/', (req, res) => res.send('Hello World!~ 안녕하세요~'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));