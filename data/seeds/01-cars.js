
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('cars').del()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {
          VIN: 'F956W2D792689D922',
          Mileage: 176746,
          Make: 'Mercedes-Benz',
          Model: 'SL-Class',
        }
      ]);
    });
};
