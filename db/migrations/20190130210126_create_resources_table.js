exports.up = function (knex, Promise) {
  return knex.schema.createTable('resources', function (table) {
    table.increments('id').primary();
    table.string('url');
    table.string('title');
    table.string('description');
    table.date('date_posted')
    table.string('img_url');
    table.integer('user_id').references('id').on('users');
    table.integer('topic_id').references('id').on('topics');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('resources');
};
