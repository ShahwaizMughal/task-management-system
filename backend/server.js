const dotenv = require('dotenv');
dotenv.config();

const connectDB = require('./config/db');
connectDB();

const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors())

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const adminRoutes = require('./routes/adminRoutes');
app.use('/api/admin', adminRoutes);

const employeeRoutes = require('./routes/employeeRoutes');
app.use('/api/employee', employeeRoutes);


app.get('/', (req,res) => {
    res.send('API is running');
});

const PORT = process.env.PORT;

app.listen(PORT, ()=>{
    console.log(`server running on port : `, PORT);
})