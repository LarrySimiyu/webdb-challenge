exports.up = function (knex, Promise) {
    return knex.schema.createTable('actions', table => {

        table
            .increments(); //unique ID

        table
            .string('action_description')
            .notNullable();
        table
            .string('notes');
        table
            .integer('project_id') //primary key 
            .unsigned()
            .unique();
        table
            .foreign('project_id')
            .references('id')
            .on('projects');
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('actions');
};