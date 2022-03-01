const express = require("express");
const cors = require("cors");
const { BadRequestError, errorHandler } = require("./app/errors");
const setupContactRoutes = require("./app/routes/contact.routes");
const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to contact book application."});
});

setupContactRoutes(app);

// handle 404 response
app.use((req, res, next) => {
    // Code ở đây sẽ chạy khi không có route được định nghĩa nào
    // khớp với yêu cầu. Gọi next() để chuyển sang middleware xử lý lỗi
    next(new BadRequestError(404, "Resource not found"))
});

app.use((err, req, res, next, error) => {
    // Middleware xử lý lỗi tập chung.
    // Trong các đoạn code xử lý ở các route, gọi next(error)
    // sẽ chuyển về middleware xử lý lỗi này
    errorHandler.handleError(error, res);
});

module.exports = app;