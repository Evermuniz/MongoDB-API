// Code to seed the database for testing purposes

// using the connection, models, and seed data
const connection = require("../config/connection");

const { User, Thought } = require("../models");

const { getRandomReaction, getRandomThought, getRandomName } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  // clear the database
  let userCheck = await connection.db.listCollections({ name: "users" }).toArray();
  if (userCheck.length) {
    await connection.db.dropCollection("users");
  }

  let thoughtCheck = await connection.db.listCollections({ name: "thoughts" }).toArray();
  if (thoughtCheck.length) {
    await connection.db.dropCollection("thoughts");
  }

  //empty user array
  const user = [];

  //creating 10 users
  for (let i = 0; i < 10; i++) {
    const fullName = getRandomName();

    //splitting the name into first and last to create a username, mainly to practice using these methods
    const first = fullName.split(" ")[0];
    const last = fullName.split(" ")[1];

    //creating a random username and email
    const username = `${first}_${last}${Math.floor(Math.random() * 100)}`;
    const email = `${first}.${last}${Math.floor(Math.random() * 100)}@email.com`;

    //pushing the username and email to the user array
    user.push({
      username,
      email,
    });
  }

  //inserting the user array into the database
  const insertedUsers = await User.collection.insertMany(user);

  //creating friends for each user
  for (let i = 0; i < insertedUsers.insertedCount; i++) {
    const currentUserId = insertedUsers.insertedIds[i];

    //random number of friends for each user
    const numFriends = Math.floor(Math.random() * 5);

    //creating a random friend for each user
    for (let j = 0; j < numFriends; j++) {
      const randomFriendIndex = Math.floor(Math.random() * insertedUsers.insertedCount);

      //making sure the random friend is not the current user
      if (randomFriendIndex !== i) {
        const randomFriendId = insertedUsers.insertedIds[randomFriendIndex];
        await User.findByIdAndUpdate(currentUserId, { $addToSet: { friends: randomFriendId } });
      }
    }
  }

  //empty thought array
  const thought = [];

  //creating 10 thoughts
  for (let i = 0; i < 10; i++) {
    const num = Math.floor(Math.random() * 3);

    //creating a random thought for each user
    for (let j = 0; j < num; j++) {
      const thoughtText = getRandomThought();
      const createdAt = new Date().toLocaleDateString();
      const randomUserIndex = await User.find({});
      const userIndex = i;
      const username = randomUserIndex[userIndex].username;

      //creating a random reaction for each thought
      const reactions = [];
      for (let k = 0; k < num; k++) {
        const reactionData = getRandomReaction();
        reactions.push([reactionData]);
      }

      //pushing the thought to the thought array
      thought.push({
        thoughtText,
        createdAt,
        username,
        reactions,
      });
    }
  }
  //inserting the thought array into the database
  const userThoughts = await Thought.collection.insertMany(thought);

  //creating a thought for each user
  for (let i = 0; i < userThoughts.insertedCount; i++) {
    const username = thought[i].username;
    const userId = await User.find({ username: username });
    const thoughts = thought[i]._id;
    await User.findByIdAndUpdate(userId[0]._id, { $addToSet: { thoughts: thoughts } });
  }

  //log the user and thought data
  console.table(user);
  console.table(thought);
  console.info("Seeding complete");
  process.exit(0);
});
