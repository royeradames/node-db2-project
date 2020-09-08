
exports.up = function(knex) {
    return knex.schema.createTable('cars', function (table) {
        table.increments()
        table.string('VIN').index().notNullable().unique()
        table.string('make').notNullable()
        table.string('model').notNullable()
        table.string('mileage').notNullable()
        table.string('transmissionType')
        table.string('titleStatus')
        table.timestamps()
      })
}

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('cars')
}
