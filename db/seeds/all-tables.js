//seed data that includes all tables (users, topics, resources, comments, likes, & ratings)

exports.seed = async function (knex, Promise) {
  await knex('users').del();
  await Promise.all(
    [
      knex('users').insert({ name: 'Greg', email: 'greg@greg.com', occupation: 'Video game all star' }),
      knex('users').insert({ name: 'Julia', email: 'julia@julia.com', occupation: 'Croissant Enthusiast' }),
      knex('users').insert({ name: 'Max', email: 'max@max.com', occupation: 'Scone Critic' }),
      knex('users').insert({ name: 'Arthur', email: 'arthur@arthur.com', occupation: 'Artist' })
    ]
  );
  await knex('topics').del();
  await Promise.all(
    [
      knex('topics').insert({ topic_name: 'Neuroscience' }),
      knex('topics').insert({ topic_name: 'Graphic Design' }),
      knex('topics').insert({ topic_name: 'Octopus' }),
      knex('topics').insert({ topic_name: 'Creative Code' }),

    ]
  );
  await knex('resources').del();
  await Promise.all(
    [
      knex('resources').insert({ url: 'https://www.sciencedaily.com/releases/2019/01/190129081919.htm', title: 'Engineers translate brain signals directly into speech', description: 'Advance marks critical step toward brain-computer interfaces that hold immense promise for those with limited or no ability to speak', date_posted: '05 Dec 2018', img_url: '/images/brain.jpg', user_id: 1, topic_id: 1 }),
      knex('resources').insert({ url: 'https://www.popsci.com/space-travel-brain-health', title: 'Space changes your brain in bigger ways than we thought', description: 'Space travel makes you smart', date_posted: '25 Sept 2018', img_url: '/images/space.jpg', user_id: 1, topic_id: 1 }),
      knex('resources').insert({ url: 'https://www.sciencedaily.com/releases/2019/01/190131162458.htm', title: 'Fight or flight: Serotonin neurons prompt brain to make the right call', description: 'Our brains rule', date_posted: '25 Sept 2018', img_url: '/images/brain2.jpg', user_id: 1, topic_id: 1 }),
      knex('resources').insert({ url: 'https://arstechnica.com/science/2019/02/watching-brains-on-acid-using-an-mri/', title: 'Watching brains on acid using an MRI', description: 'Cortex overload', date_posted: '25 Nov 2018', img_url: '/images/brain3.jpg', user_id: 1, topic_id: 1 }),
      knex('resources').insert({ url: 'https://blogs.scientificamerican.com/octopus-chronicles/octopuses-gain-consciousness-according-to-scientists-declaration/', title: 'Octopuses Gain Consciousness ', description: 'Octopuses are smarter than us', date_posted: '08 Jan 2019', img_url: '/images/octo1.jpg', user_id: 2, topic_id: 2 }),
      knex('resources').insert({ url: 'https://www.itsnicethat.com/articles/ken-kagami-bart-works-2-illustration-201118', title: 'Works of Bart', description: 'Slightly mad illustrations', date_posted: '05 Dec 2000', img_url: '/images/bart.jpg', user_id: 3, topic_id: 3 }),
      knex('resources').insert({ url: 'https://medium.com/gravitdesigner/typography-elements-everyone-needs-to-understand-5fdea82f470d', title: 'Typography Elements Everyone Needs to Understand', description: 'Good overview for beginners', date_posted: '05 Aug 2018', img_url: '/images/typo.png', user_id: 3, topic_id: 3 }),
      knex('resources').insert({ url: 'https://www.tutpad.com/', title: 'Free Graphic Design Tutorials', description: 'Good place to start learning', date_posted: '22 Oct 2018', img_url: '/images/graphic1.jpg', user_id: 3, topic_id: 3 }),
      knex('resources').insert({ url: 'https://www.howdesign.com/graphic-design-basics/7-graphic-design-tutorials-tktk-year/', title: 'Top 7 Graphic Design Tutorials', description: 'On Patterns & Geometry', date_posted: '02 Dec 2018', img_url: '/images/graphic2.jpg', user_id: 3, topic_id: 3 }),
      knex('resources').insert({ url: 'https://docs.derivative.ca/Category:Tutorials', title: 'First Things to Know about TouchDesigner', description: 'Good TD overview', date_posted: '09 Nov 2018', img_url: '/images/td.jpg', user_id: 4, topic_id: 4 }),
      knex('resources').insert({ url: 'https://towardsdatascience.com/an-easy-introduction-to-natural-language-processing-b1e2801291c1?gi=29d8663db476', title: 'An easy introduction to Natural Language Processing', description: 'Using computers to understand human language', date_posted: '01 Feb 2019', img_url: '/images/nlp.jpg', user_id: 4, topic_id: 4 }),
      knex('resources').insert({ url: 'https://hackernoon.com/creative-coding-basics-4d623af1c647', title: 'Creative coding basics', description: 'Getting started with the canvas in Javascript', date_posted: '01 Feb 2019', img_url: '/images/creative-code.jpg', user_id: 4, topic_id: 4 }),
      knex('resources').insert({ url: 'http://paperjs.org/about/', title: 'Paper.js — The Swiss Army Knife of Vector Graphics Scripting', description: 'Open source canvas used with JS', date_posted: '01 Jan 2019', img_url: '/images/paperjs.jpg', user_id: 4, topic_id: 4 }),
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
