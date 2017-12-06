import Mock from 'mockjs';
const LoginUsers = [
  {
    id: 1,
    username: 'admin',
    password: '123456',
    avatar: 'https://static.lagou.com/thumbnail_300x300/i/image/M00/7C/4E/Cgp3O1hFMOeAY7nlAAA-eVqPl_4805.png',
    name: '洪睿管理员'
  },
    {
        id: 2,
        username: 'user01',
        password: '123456',
        avatar: 'http://img4.imgtn.bdimg.com/it/u=2860875647,936472265&fm=27&gp=0.jpg',
        name: '用户'
    }
];

const Users = [];

for (let i = 0; i < 86; i++) {
  Users.push(Mock.mock({
    id: Mock.Random.guid(),
    name: Mock.Random.cname(),
    // addr: Mock.mock('@county(true)'),
      mobile:/^1[0-9]{10}$/,  //账号
    'age|18-60': 1,
    // birth: Mock.Random.date(),
    sex: Mock.Random.integer(0, 1)
  }));
}

export { LoginUsers, Users };
