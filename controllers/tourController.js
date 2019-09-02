const Tour = require('./../models/tourModel');

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      result: 'fail',
      message: 'missing name or price'
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  console.log(req.requsetTime);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requsetTime,
    // results: tours.length,
    // data: {
    //   // you do not need to write tours: tours (varaibale and value are same)
    //   tours
    // }
  });
};

exports.getTour = (req, res) => {
  console.log(req.param);
  const id = req.params.id * 1;
  // const tour = tours.find(el => el.id === id);

  res.status(200).json({
    status: 'success'
    // data: {
    //   tour
    // }
  });
};

exports.createTour = (req, res) => {
  res.status(201).json({
    status: 'success'
    // data: {
    //   tour: newTour
    // }
  });
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    data: null
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: {
      tour: '<Updated toru here...>'
    }
  });
};
