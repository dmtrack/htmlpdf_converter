import { app } from './app';

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server has succesfully started on ${port}`);
});
