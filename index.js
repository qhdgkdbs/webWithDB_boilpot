const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');
const { User } = require("./models/User");
const config = require("./config/key");

//application/x-www-form-urlencoded 의 데이터를 분석할 수 있게 해주는 것
app.use(bodyParser.urlencoded({extended : true}));

//application/json의 데이터를 분석/가져올 수 있게
app.use(bodyParser.json());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURL , { 
    useNewUrlParser : true, useUnifiedTopology : true, useCreateIndex : true, useFindAndModify : false
}).then(() => console.log("MONGO_DB connected"))
.catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello World!dd'));


app.post('/register', (req, res) => {
    //회원 가입 할때 필요한 정보들을 클라이언트에서 가져오면
    //그것들을 데이터 베이스에 넣어준다.
    //데이터 모델을 가져와야한다.

    const user = new User(req.body)
    //body에는 
    // {
    //     id : qhdgkdbs,
    //     password : asdf,
    // }
    // 처럼 데이터가 들어있음

    user.save((err, userInfo) => {
        if(err) return res.json({success : false, err})

        return res.status(200).json({
            success : true
        }
        )
    })

})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))