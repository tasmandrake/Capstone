const express = require('express');
const router = express.Router();
const knex = require('../knex');

router.get('/', (req, res) => {
  knex('users')
    .select([
      'name',
      'amount_spent',
      'amount_owed',
      'paid',
      'image_url',
      'phone',
    ])
    .then(users => res.send(users))
    .catch(err => console.error(err));
});

router.get('/:id', (req, res) => {
  const id = req.params.id;

  knex('users')
    .select([
      'name',
      'amount_spent',
      'amount_owed',
      'paid',
      'image_url',
      'phone',
    ])
    .where('id', id)
    .then(user => res.send(user))
    .catch(err => console.error(err));
});

router.get('/trip/:id', (req, res) => {
  const id = req.params.id;

  knex('trips')
    .where('trips.id', id)
    .join('users', 'trips.id', 'users.trip_id')
    .select([
      'users.id',
      'users.name',
      'users.image_url',
      'phone',
    ])
    .then(users => res.send(users))
    .catch(err => console.error(err));
});

router.post('/', (req, res) => {
  const body = req.body;
  knex('users')
    .insert(body)
    .returning([
      'name',
      'amount_spent',
      'amount_owed',
      'paid',
      'image_url'
    ])
    .then(newUser => res.send(newUser))
    .catch(err => console.error(err));
});

router.patch('/:id', (req, res) => {
  const id = req.params.id;
  const body = req.body;
  
  knex('users')
    .update(body)
    .returning([
      'name',
      'amount_spent',
      'amount_owed',
      'paid',
      'image_url'
    ])
    .where('id', id)
    .then(updatedUser => res.send(updatedUser))
    .catch(err => console.error(err));
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;

  knex('users')
    .del()
    .returning([
      'name',
      'amount_spent',
      'amount_owed',
      'paid',
      'image_url'
    ])
    .where('id', id)
    .then(deletedUser => res.send(deletedUser))
    .catch(err => console.error(err));
});

module.exports = router;
