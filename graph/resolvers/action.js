const Action = {

  // This will load the user for the specific action. We'll limit this to the
  // admin users only or the current logged in user.
  user({user_id}, _, {loaders: {Users}, user}) {
    if (user && (user.hasRole('ADMIN') || user_id === user.id)) {
      return Users.getByID.load(user_id);
    }
  }
};

module.exports = Action;
