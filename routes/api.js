const express = require('express');
const router = express.Router();
const Ninja = require('../models/ninja');

// Get ninja
router.get('/ninja', (req, res) => {
	Ninja.aggregate([
		{
			$geoNear: {
				near: {
					type: 'Point',
					coordinates: [
						parseFloat(req.query.lng),
						parseFloat(req.query.lat),
					],
				},
				spherical: true,
				maxDistance: 1000000,
				distanceField: 'dist.calculated',
			},
		},
	]).then(function(results) {
		// results.sort()
		res.send(results);
	});
});

// Add a new ninja
router.post('/ninja', (req, res, next) => {
	Ninja.create(req.body)
		.then((ninja) => {
			res.send(ninja);
		})
		.catch(next);
});

// Update a ninja
router.put('/ninja/:id', (req, res, next) => {
	Ninja.findOneAndUpdate(
		{
			_id: req.params.id,
		},
		req.body,
		(err, doc, response) => {
			if (err) {
				next(err);
			} else {
				if (doc) {
					// res.send(doc);
					Ninja.findById(req.params.id, (err, response) => {
						if (err) {
							next({
								message: 'This should have not happened',
							});
						} else {
							res.send(response);
						}
					});
				} else {
					next({
						message: 'Ninja is long gone',
					});
				}
			}
		},
	);
});

// Delete a ninja
router.delete('/ninja/:id', (req, res, next) => {
	Ninja.findOneAndDelete({ _id: req.params.id })
		.then((ninja) => {
			if (!ninja) {
				next({
					message: 'Ninja is long gone',
				});
			} else {
				res.send(ninja);
			}
		})
		.catch(next);
});

module.exports = router;
