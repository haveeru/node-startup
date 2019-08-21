const fs = require('fs');
const express = require('express');

const app = express();

// app.get('/', (req, res)=> {
//    res.status(200).json({message: 'hello from serve side', app: 'Natorus'});
// });

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res)=> {
    res.status(200).json({
        status: 'success',
        results: tours.length(),
        data: {
            // you do not need to write tours: tours (varaibale and value are same)
            tours
        }
    })
});

const port = 3000;
app.listen(port, () => {
    console.log(`app running on port ${port}....`);
});

 