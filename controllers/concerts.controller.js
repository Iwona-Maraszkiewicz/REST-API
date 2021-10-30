const Concert = require('../models/concerts.model');
const Seat = require('../models/seats.model');


exports.getAll = async (req, res) => {
    try {
      res.json(await Concert.find());
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  };

exports.getById = async (req, res) => {

    try {
      const dep = await Concert.findById(req.params.id);
      if(!dep) res.status(404).json({ message: 'Not found' });
      else res.json(dep);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }

  };

exports.getTicketsOfConcerts = async(req,res) => {
    try {
      const concert = await Concert.findById(req.params.id);
      const tickets = await Seat.find({day: concert.day});
      const freeTickets = 50 - tickets.length;
      if(!concert) res.status(404).json({ message: 'Not found' });
      else res.json({concert: concert, freeTickets: freeTickets});
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  };
  


exports.post = async (req, res) => {

    try {

      const { performer, genre, price, day, image } = req.body;
      const newConcert = new Concert({ performer: performer, genre: genre, price: price, day: day, image: image });
      await newConcert.save();
      res.json({ message: 'OK' });

    } catch(err) {
      res.status(500).json({ message: err });
    }

  };

exports.put = async (req, res) => {
    const { performer, genre, price, day, image } = req.body;

    try {
      const dep = await Concert.findById(req.params.id);
      if(dep) {
        await Concert.updateOne({ _id: req.params.id }, { $set: { performer: performer, genre: genre, price: price, day: day, image: image  }});
        res.json({ message: 'OK', dep  });
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }

  };

exports.delete = async (req, res) => {

    try {
      const dep = await Concert.findById(req.params.id);
      if(dep) {
        await Concert.deleteOne({ _id: req.params.id });
        res.json({ message: 'OK', dep });
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }

  };
