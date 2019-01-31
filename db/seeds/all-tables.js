//seed data that includes all tables (users, topics, resources, comments, likes, & ratings)

exports.seed = async function (knex, Promise) {
  await knex('users').del();
  await Promise.all(
    [
      knex('users').insert({ name: 'Alice', email: 'alice@gmail.com', occupation: 'Bartender' }),
      knex('users').insert({ name: 'Bob', email: 'bob@gmail.com', occupation: 'Dog-walker' }),
      knex('users').insert({ name: 'Charlotte', email: 'charly@gmail.com', occupation: 'Food Critic' })
    ]
  );
  await knex('topics').del();
  await Promise.all(
    [
      knex('topics').insert({ topic_name: 'Neuroscience' }),
      knex('topics').insert({ topic_name: 'Graphic Design' }),
      knex('topics').insert({ topic_name: 'Octopus' }),
    ]
  );
  await knex('resources').del();
  await Promise.all(
    [
      knex('resources').insert({ url: 'https://www.sciencedaily.com/releases/2019/01/190129081919.htm', title: 'Engineers translate brain signals directly into speech', description: 'Advance marks critical step toward brain-computer interfaces that hold immense promise for those with limited or no ability to speak', date_posted: '05 Dec 2000', img_url: '', user_id: 1, topic_id: 1 }),
      knex('resources').insert({ url: 'https://blogs.scientificamerican.com/octopus-chronicles/octopuses-gain-consciousness-according-to-scientists-declaration/', title: 'Octopuses Gain Consciousness ', description: 'Octopuses are smarter than us', date_posted: '05 Dec 2000', img_url: '', user_id: 2, topic_id: 2 }),
      knex('resources').insert({ url: 'https://www.itsnicethat.com/articles/ken-kagami-bart-works-2-illustration-201118', title: 'Works of Bart', description: 'Slightly mad illustrations', date_posted: '05 Dec 2000', img_url: '', user_id: 3, topic_id: 3 }),
    ]
  );
  await knex('comments').del();
  await Promise.all(
    [
      knex('comments').insert({ comment: 'This is cray cray', user_id: 1, resource_id: 1 }),
      knex('comments').insert({ comment: 'Zomgz I am learning so much', user_id: 2, resource_id: 2 }),
      knex('comments').insert({ comment: 'This site effin rules', user_id: 3, resource_id: 3 }),
    ]
  );
  await knex('likes').del();
  await Promise.all(
    [
      knex('likes').insert({ user_id: 1, resource_id: 1 }),
      knex('likes').insert({ user_id: 2, resource_id: 2 }),
      knex('likes').insert({ user_id: 3, resource_id: 3 }),
    ]
  );
  await knex('ratings').del();
  return Promise.all(
    [
      knex('ratings').insert({ rating: 5, user_id: 1, resource_id: 1 }),
      knex('ratings').insert({ rating: 4, user_id: 2, resource_id: 2 }),
      knex('ratings').insert({ rating: 3, user_id: 3, resource_id: 3 }),
    ]
  );
};
