const knex = require('knex')({
  client: 'postgresql',
  connection: {
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port,
    ssl      : settings.ssl
  }
});

/*******************************
Description: Searches resource table and returns
resources with matching topic_id
Input: A topic ID and a callbackfunction.
Output:
*******************************/
function findResourceByTopicId(topicId, cb){

  knex('resources')
    .select('*')
    .where('topic_id', topicId)
    .then(rows => {
      cb(rows);
      knex.destroy();
    })
    .catch(err => console.log(err.message));
}

//Test
console.log("Testing finding resource by topic id");
findResourceByTopicId(id, function(input){console.log(input)});

/*******************************
Description: Searches resource table and returns
resources with matching id
Input: A resource ID and a callbackfunction.
Output:
*******************************/

function findResourceByResourceId(resourceId, cb){

  knex('resources')
  .select('*')
  .where('id', resourceId)
  .then(rows => {
    cb(rows);
    knex.destroy();
  })
  .catch(err => console.log(err.message));

}


//Test
console.log("Testing finding resource by resource id");
findResourceByResourceId(id, function(input){console.log(input)});

/*******************************
Description: Searches resource table and returns
resources with matching user_id
Input: A user ID and a callbackfunction.
Output:
*******************************/

function findResourceByUserId(userId, cb){

  knex('resources')
  .select('*')
  .where('user_id', userId)
  .then(rows => {
    cb(rows);
    knex.destroy();
  })
  .catch(err => console.log(err.message));

}

//Test
console.log("Testing finding resource bu user id.");
findResourceByUserId(id, function(input){console.log(input)});


/*******************************
Description: Searches resource table and returns
all resources liked by the user.
Input: A user ID and a callbackfunction.
Output:
*******************************/

function findResourceByUserLikes(userId, cb){

  knex('resources')
  .join('likes', 'resources.user_id', '=', 'likes.user_id')
  .select('*')
  .where('user_id', userId)
  .then(rows => {
    cb(rows);
    knex.destroy();
  })
  .catch(err => console.log(err.message));
}

//Test
console.log("Testing finding resources by user likes.");
findResourceByUserLikes(id, function(input){console.log(input)});


/*******************************
Description: Adds a like to the  likes table.
Input: A user ID and resource ID.
Output:
*******************************/

function likeResource(userId, resourceId){

  knex('likes')
    .insert({user_id: userId,
             resource_id: resourceId})
    .returning('*')
    .catch(err => console.log(err.message))
    .then(function() {knex.destroy()});

};

//Test
console.log("Testing adding a like.");
likeResource(userid, resourceid);

/*******************************
Description: Adds a new resource to the resource table.
Input: An input object with all the new resource data.
Output: Adds new resource to the recource table.
*******************************/

function newResource(input){

  knex('resources')
    .insert({url: input.url,
             title: input.title,
             description: input.description,
             user_id: input.user_id,
             topic_id: input.topic_id,
             date_posted: input.date_posted,
             image_url: input.image_url})
    .returning('*')
    .catch(err => console.log(err.message))
    .then(function() {knex.destroy()});

};

//Test
console.log("Testing adding a new resource.");
newResource({url: input.url,
             title: input.title,
             description: input.description,
             user_id: input.user_id,
             topic_id: input.topic_id,
             date_posted: input.date_posted,
             image_url: input.image_url});


/*******************************
Description: Adds a new user to the user table.
Input: An input object with all the new user data.
Output: Adds new user to the users table.
*******************************/

function newUser(input){

  knex('users')
    .insert({name: input.name,
             email: input.email})
    .returning('*')
    .catch(err => console.log(err.message))
    .then(function() {knex.destroy()});

};

//Test
console.log("Testing adding a new user.");
newUser({name: input.name, email: input.email});


/**

Example use in route:

  router.get("/", (req, res) => {
    findResourceById(id, (results) => {
        res.json(results);
    });
  });

  return router;

**/
