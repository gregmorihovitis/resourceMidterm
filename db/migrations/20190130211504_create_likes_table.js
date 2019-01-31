exports.up = function (knex, Promise) {
  return knex.schema.createTable('likes', function (table) {
    table.increments('id').primary();
    table.integer('user_id').references('id').on('users');
    table.integer('resource_id').references('id').on('resources');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('likes');
};
