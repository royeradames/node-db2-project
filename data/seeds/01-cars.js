
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
        },
        {
          VIN: '8C4505606P1535YF3',
          Mileage: 190447,
          Make: 'Hyundai',
          Model: 'Sonata',
        }
      ]);
    });
};
