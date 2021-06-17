const jwt = require("jsonwebtoken");
const JWT_SECRET =
	"9e2d424ace2881d82528d9969ee468948444cde2d556f7f85b0c5cdaf4e5b357aead4efb";

module.exports = (req, res, next) => {
	const authHeader = req.header("Authorization");
	if (!authHeader) {
		return res.status(401).json({ error: "Unauthorized, access denied" });
	}
	try {
		const decodedToken = jwt.verify(authHeader, JWT_SECRET);
		req.userId = decodedToken.user._id;
		next();
	} catch (err) {
		res.status(401).json({ error: "Unauthorized, access denied" });
	}
};
