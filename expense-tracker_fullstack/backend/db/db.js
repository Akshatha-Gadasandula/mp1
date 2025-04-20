const mongoose = require('mongoose');

const db = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Db Connected');
    } catch (error) {
        console.error('DB Connection Error:', error.message);
        console.error('Error Details:', error);
    }
};

module.exports = { db };
