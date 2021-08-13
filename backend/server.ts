import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
  console.log(req.body);
});

app.listen(5000, () => {
  console.log('Server is running.');
});
