"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const port = process.env.PORT || 5000;
const start = async () => {
    try {
        app_1.app.listen(port, () => {
            console.log(`Server has succesfully started on port:${port}`);
        });
    }
    catch (e) {
        console.log(e);
    }
};
start();
