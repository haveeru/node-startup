const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();

// 1) MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json());

app.use((req, res, next) => {
    console.log('Hello from the middleware ');
    next();
})

app.use((req, res, next) => {
    req.requsetTime = new Date().toISOString();
    next();
})

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// 2) ROUTE HANDLERS

const getAllTours = (req, res)=> {
    console.log(req.requsetTime);
    res.status(200).json({
        status: 'success',
        requestedAt: req.requsetTime,
        results: tours.length,
        data: {
            // you do not need to write tours: tours (varaibale and value are same)
            tours
        }
    })
}

const getTour = (req, res)=> {
    console.log(req.param);
    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id);

    // if(id > tours.length){
    if(!tour){
        return res.status(404).json({
            status: 'fail',
            message: 'Invaildi ID'
        });
    }

    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    });
}

const createTour = (req, res) => {
    //console.lgo(req.body);

    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({id: newId}, req.body);

    tours.push(newTour);

    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            } 
        })
    });
}

const updateTour = (req, res) => {
    if(req.params.id*1 > tours.length){
        return res.status(404).json({
            status: 'fail',
            message: 'Invaildi ID'
        });
    }

    res.status(200).json({
        data: null
    })
}

const deleteTour = (req, res) => {
    if(req.params.id*1 > tours.length){
        return res.status(404).json({
            status: 'fail',
            message: 'Invaildi ID'
        });
    }

    res.status(204).json({
        status: 'success',
        data: {
            tour: '<Updated toru here...>'
        }
    })
}

const getAllUsers = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'this route is not yet defnied'
    })
}

const getUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'this route is not yet defnied'
    })
}

const createUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'this route is not yet defnied'
    })
}

const updateUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'this route is not yet defnied'
    })
}

const deleteUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'this route is not yet defnied'
    })
}

//app.get('/api/v1/tours', getAllTours) ;
//app.get('/api/v1/tours/:id', getTour);
//app.post('/api/v1/tours', createTour);
//app.patch('/api/v1/tours/:id', updateTour);
//app.delete('/api/v1/tours/:id', deleteTour);


// 3) ROUTES

app
    .route('/api/v1/tours')
    .get(getAllTours)
    .post(createTour);

app
    .route('/api/v1/tours/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour);


app
    .route('/api/v1/users')
    .get(getAllUsers)
    .post(createUser)

app
    .route('/api/v1/users/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser);

// 4) SERVER
const port = 3000;
app.listen(port, () => {
    console.log(`app running on port ${port}....`);
});

 