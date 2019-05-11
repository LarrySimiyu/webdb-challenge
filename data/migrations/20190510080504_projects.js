exports.up = function (knex, Promise) {
    return knex.schema.createTable('projects', table => {
        table.increments(); //unique ID
        table
            .string('name')
            .notNullable(); // cannot be left empty
        table
            .string('description')
            .notNullable();
        table
            .boolean('completed')
            .notNullable();
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('projects')
};