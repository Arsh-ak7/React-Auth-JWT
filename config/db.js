const mongoose = require("mongoose");

const connectDB = async () => {
	try {
		await mongoose.connect("mongodb://localhost:27017/rest_jwt", {
			useCreateIndex: true,
			useUnifiedTopology: true,
			useNewUrlParser: true,
			useFindAndModify: false,
		});

		console.log("MongoDB connected");
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

module.exports = connectDB;
