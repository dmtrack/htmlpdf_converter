import { app } from './app';

const port = process.env.PORT || 5000;

const start = async () => {
    try {
        app.listen(port, () => {
            console.log(`Server has succesfully started on port:${port}`);
        });
    } catch (e) {
        console.log(e);
    }
};

start();
