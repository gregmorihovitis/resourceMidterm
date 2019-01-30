//seed data that includes all tables (users, topics, resources, comments, likes, & ratings)

exports.seed = async function (knex, Promise) {
  await knex('users').del();
  await Promise.all(
    [
      knex('users').insert({ id: 1, name: 'Alice', email: 'alice@gmail.com', occupation: 'Bartender' }),
      knex('users').insert({ id: 2, name: 'Bob', email: 'bob@gmail.com', occupation: 'Dog-walker' }),
      knex('users').insert({ id: 3, name: 'Charlotte', email: 'charly@gmail.com', occupation: 'Food Critic' })
    ]
  );
  await knex('topics').del();
  await Promise.all(
    [
      knex('topics').insert({ id: 1, topic_name: 'Neuroscience' }),
      knex('topics').insert({ id: 2, topic_name: 'Graphic Design' }),
      knex('topics').insert({ id: 3, topic_name: 'Octopus' }),
    ]
  );
  await knex('resources').del();
  await Promise.all(
    [
      knex('resources').insert({ id: 1, url: 'https://www.sciencedaily.com/releases/2019/01/190129081919.htm', title: 'Engineers translate brain signals directly into speech', description: 'Advance marks critical step toward brain-computer interfaces that hold immense promise for those with limited or no ability to speak', date_posted: 2019 / 01 / 01, img_url: '', user_id: '', topic_id: '' }),
      knex('resources').insert({ id: 2, url: 'https://blogs.scientificamerican.com/octopus-chronicles/octopuses-gain-consciousness-according-to-scientists-declaration/', title: 'Octopuses Gain Consciousness ', description: 'Octopuses are smarter than us', date_posted: 2019 / 01 / 07, img_url: '', user_id: '', topic_id: '' }),
      knex('resources').insert({ id: 3, url: 'https://www.itsnicethat.com/articles/ken-kagami-bart-works-2-illustration-201118', title: 'Works of Bart', description: 'Slightly mad illustrations', date_posted: 2019 / 01 / 19, img_url: '', user_id: '', topic_id: '' }),
    ]
  );
  await knex('comments').del();
  await Promise.all(
    [
      knex('comments').insert({ id: 1, comment: 'This is cray cray', user_id: '', resource_id: '' }),
      knex('comments').insert({ id: 2, comment: 'Zomgz I am learning so much', user_id: '', resource_id: '' }),
      knex('comments').insert({ id: 3, comment: 'This site effin rules', user_id: '', resource_id: '' }),
    ]
  );
  await knex('likes').del();
  await Promise.all(
    [
      knex('likes').insert({ id: 1, user_id: '', resource_id: '' }),
      knex('likes').insert({ id: 2, user_id: '', resource_id: '' }),
      knex('likes').insert({ id: 3, user_id: '', resource_id: '' }),
    ]
  );
  await knex('ratings').del();
  return Promise.all(
    [
      knex('ratings').insert({ id: 1, rating: 5, user_id: '', resource_id: '' }),
      knex('ratings').insert({ id: 2, rating: 4, user_id: '', resource_id: '' }),
      knex('ratings').insert({ id: 3, rating: 3, user_id: '', resource_id: '' }),
    ]
  );
};
