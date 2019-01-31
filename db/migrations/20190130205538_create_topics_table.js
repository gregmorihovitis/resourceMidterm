exports.up = function (knex, Promise) {
  return knex.schema.createTable('topics', function (table) {
    table.increments('id').primary();
    table.string('topic_name');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('topics');
};
