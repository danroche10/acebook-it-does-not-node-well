const PostsController = require('../controllers/posts');
const { pool } = require('../database/connection'); // this is essential if your tests involve database connection
const Post = require('../model/posts'); // put whatever you are testing here

// essential to include following before and after functions if your tests involve database connection
beforeEach(async () => {
  await pool.query(
    'TRUNCATE TABLE users, posts, likes, comments, images RESTART IDENTITY;'
  );
});

afterEach(async () => {
  await pool.end();
});

test('checks test db is accessed', async () => {
  await pool.query(
    "INSERT INTO users(username, password, email) VALUES('dandelion', 'Password1', 'test@test.com'); INSERT INTO posts(text, created_at, user_id) VALUES('testtesttest', current_timestamp, 1);"
  );
  const data = await Post.getPosts();
  expect(data[0].id).toStrictEqual(1);
  expect(data[0].message).toStrictEqual('testtesttest');
  expect(data[0].name).toStrictEqual('dandelion');
});
