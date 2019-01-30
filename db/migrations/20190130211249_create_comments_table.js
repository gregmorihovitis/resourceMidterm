exports.up = function (knex, Promise) {
  return knex.schema.createTable('comments', function (table) {
    table.increments('id').primary();
    table.string('comment');
    table.integer('user_id').references('id').on('users');
    table.integer('resource_id').references('id').on('resources');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('comments');
};
