
function registerUser() {

const USERNAME = document.getElementById('username').value;
const PASSWORD = document.getElementById('password').value;
const USER_EMAIL = document.getElementById('userEmail').value;
// 获取输入字段的值

const HASHED_PASS_WORD = CryptoJS.SHA256(PASSWORD).toString();
// 使用CryptoJS库中的SHA-256算法对密码进行哈希处理

if (USERNAME === '' || PASSWORD === '') {
    alert('用户名或密码不能为空');
    return;
}
// 验证用户名和密码字段是否为空

if (USERNAME.length < 6 || PASSWORD.length < 6) {
    alert('用户名或密码长度不能小于6位');
    return;
}
// 验证用户名和密码长度是否符合要求

fetch('http://localhost:3001/addUser', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({
    username: USERNAME,
    password: HASHED_PASS_WORD,
    userEmail: USER_EMAIL
    })
})
// 发送POST请求到服务器以添加新用户

    .then(response => response.json())
    .then(data => {

    if (data.success) {

        // 提示用户注册成功并根据选择跳转到登录页面
        const jump = window.confirm('注册成功，是否跳转到登录界面？');
        if (jump) {
        window.location.href = 'login.html';
        } else {
        console.log('注册成功！');
        }
    } else {
        alert('注册失败，请重试');
    }
    // 处理服务器的响应

    })
    .catch(error => {
    console.error('Error:', error);
    alert('注册失败，请检查服务器连接');
    });

}
// 注册用户函数

function backToLogin() {

    window.location.href = 'login.html';  // 跳转回登录界面

}
// 返回登录页面函数