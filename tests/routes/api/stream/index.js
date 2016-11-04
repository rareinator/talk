require('../../../utils/mongoose');
const Action = require('../../../../models/action');
const User = require('../../../../models/user');
const Comment = require('../../../../models/comment');
const expect = require('chai').expect;
const streamRoutes = require('../../../../routes/api/stream');

describe('api/stream: routes', () => {
  const comments = [{
    id: 'abc',
    body: 'comment 1',
    asset_id: 'asset',
    author_id: '123'
  },{
    id: 'def',
    body: 'comment 2',
    asset_id: 'asset',
    author_id: '456'
  },{
    id: 'hij',
    body: 'comment 3',
    asset_id: '456'
  }]

  const users = [{
    id: '123',
    display_name: 'John',
  },{
    id: '456',
    display_name: 'Paul',
  }]

  const actions = [{
    action_type: 'flag',
    item_id: 'abc'
  },{
    action_type: 'like',
    item_id: 'hij'
  }]

  beforeEach(() => {
    return Comment.create(comments).then(() => {
      return User.create(users)
    }).then(() => {
      return Action.create(actions)
    })
  })

  it('should return a stream with comments, users and actions', () => {
    streamRoutes('./')({
        query: {
          asset_id: 'asset'
      }
    }, {
      json: (data) => {
        expect(data).to.equal(1);
      }
    })
  })
})
