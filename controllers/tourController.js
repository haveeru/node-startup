const fs = require('fs');

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.getAllTours = (req, res)=> {
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

exports.getTour = (req, res)=> {
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

exports.createTour = (req, res) => {
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

exports.updateTour = (req, res) => {
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

exports.deleteTour = (req, res) => {
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