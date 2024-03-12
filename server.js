const express = require('express');
const connectDb = require('./config/db');
var cors = require('cors');
const Eval = require('./models/Eval');
// const auth = require('./middleware/auth');

const app = express();
connectDb();
const corsOptions = {
  origin: '*',
  methods: 'GET,PUT,POST,DELETE',
};
app.use(express.json({ extended: false }));
app.use(cors(corsOptions));

app.get('/', (req, res) => res.send('API running'));
app.use('/api/points', require('./routes/api/points'));

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/admin', require('./routes/api/admin'));

const PORT = process.env.PORT || 5000;
app.use(cors(corsOptions));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
