const express = require('express');
const app = express();
const webpush =  require('web-push');
const port = 3000;
const CronJob = require('cron').CronJob;
var schedule = require('node-schedule');

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html')
app.set('views', './views');
app.use(express.static('./public'));
app.use(express.json());

// cd current folder : ./node_modules/.bin/web-push generate-vapid-keys
const publicVapidkey = 'BNE-Mp5h28nzr1fZJAy_L9KMGBRash6k11_R9F9GXgt_1NGZuI3NqGLOFkU42019Pzhp5GMyPN0yqUhO2EhOVKY';
const privateVapidKey = '_-w-wR6azHMOZdINnyIo1YsK1PLQdKPZ0_D2aCbJqyw'

webpush.setVapidDetails('mailto:thoaiky1992@gmail.com', publicVapidkey, privateVapidKey);

app.post('/subscribe', (req, res) => {
  const subscription = req.body;

  res.status(201).json({});
})

app.get('/', (req, res) => {
  res.render('index');
})

app.get('/send', (req, res) => { 
  var job = schedule.scheduleJob('notify1', '*/5 * * * * *', function() {
    const subscription = {
      endpoint: 'https://fcm.googleapis.com/fcm/send/d9Xwapy3MNU:APA91bGtCaOgiUkR5zfhZHrmQGntZ6IKTfCUBPr49PShrmR6DZl5VXKKZ4vPrCJCcVwO8PFhNi0v080MiYOMd7QmNkqpzgx80arBgHtlnhcX81jv5qHxn6KfQMvRu-wIKq1ElJcEzQtO',
      expirationTime: null,
      keys: {
        p256dh: 'BIg05XY0cVh2R4DvFZMgfeKZUQ-s-SptsDepRvhlG8AfycZRzhwxf7IhaPexi97DOu7YQVDnXztroOoIuhcenJQ',
        auth: '-4s8q20CM43Dr3jrWn-vrA'
      }
    }
    const payload = {
      title: 'Ky.Smile',
      body: 'Web-push send notification'
    }
    webpush.sendNotification(subscription, JSON.stringify(payload)).catch(err => console.log(err));
  }, null, true, 'Asia/Ho_Chi_Minh');
  
  res.render('index');
})

app.get('/stop', (req, res) => {
  const jobList = schedule.scheduledJobs;
  jobList.notify1.cancel();
  res.send("stop notification")
})


app.listen(port, () =>  console.log(`server starting on port : ${port}`));