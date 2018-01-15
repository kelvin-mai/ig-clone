const router = require('express').Router(),
auth = require('../middleware/auth'),
handle = require('../handlers/api');

router.route('/')
  .get((req, res) => {
     require('../models').Post.find().remove().exec().then(() => res.send('cleared'));
   });

router.route('/users')
  .get(handle.allUsers);

router.route('/users/:username')
  .get(handle.getUser);

router.route('/users/:username/post')
  .get(handle.getUserPosts)
  .post(auth.loginRequired, auth.authorizationRequired, handle.createPost);

router.route('/users/:username/post/:pid')
  .get(handle.getPost)
  .put(auth.loginRequired, auth.authorizationRequired, handle.updatePost)
  .delete(auth.loginRequired, auth.authorizationRequired, handle.deletePost);

router.route('/posts')
  .get(handle.allPosts);

router.route('/posts/:pid')
  .get(handle.getPost);

module.exports = router;
