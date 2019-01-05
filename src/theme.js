// https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less
module.exports = {
  // 'primary-color': '#10e99b',
  'card-actions-background': '#f5f8fa',
};
var source = [1, 2, 3, 4, 5];

source.slice(1, 3); // 纯函数 返回[2, 3] source不变
source.splice(1, 3); // 不纯的 返回[2, 3, 4] source被改变

source.pop(); // 不纯的
source.push(6); // 不纯的
source.shift(); // 不纯的
source.unshift(1); // 不纯的
source.reverse(); // 不纯的

// 我也不能短时间知道现在source被改变成了什么样子，干脆重新约定一下
source = [1, 2, 3, 4, 5];

source.concat([6, 7]); // 纯函数 返回[1, 2, 3, 4, 5, 6, 7] source不变
source.join('-'); // 纯函数 返回1-2-3-4-5 source不变
 