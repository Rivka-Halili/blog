const {randomBytes }=require('crypto');
const bodyParser= require('body-parser')
const cors = require('cors');
const axios =require('axios');

const app = require('express')();
app.use(bodyParser.json());
app.use(cors());

const posts={};

app.get('/posts',(req, res)=>{
  console.log(`start app.get('/posts`);
  res.send(posts);
  console.log(`end app.get('/posts''`);
});

app.post('/posts',async (req, res)=>{
  console.log(`start app.post('/posts'`);
  const id = randomBytes(4).toString("hex");
  const {title} =req.body;

  posts[id]={
      id, title
  };

  await axios.post('http://localhost:4005/events',{
    type:'PostCreated',
    data:{
      id, title
    }
  });
  res.status(201).send(posts[id]);
  console.log(`end app.post('/posts'`);
});

app.post('/events/',(req,res)=>{
  console.log('Recieved Event', req.body.type);
  res.send({});
});

app.listen(4000,()=>{
    console.log('Listening on post 4000');
});