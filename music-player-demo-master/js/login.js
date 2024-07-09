
 function loginUser() {

    
    const USERNAME = document.getElementById("username").value;
    const PASSWORD = document.getElementById("password").value;
    // 获取输入字段的值

    
    const HASHED_PASSWORD = CryptoJS.SHA256(PASSWORD).toString();
    // 使用CryptoJS库中的SHA-256算法对密码进行哈希处理

    
    if (USERNAME === "" || PASSWORD === "") {
      alert("用户名或密码不能为空");
      return;
    }

    // 在控制台输出哈希后的密码，用于验证

    fetch("http://localhost:3001/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: USERNAME,
        password: HASHED_PASSWORD
      })
    })
    // 发送POST请求到服务器以验证用户身份

    .then(response => response.json())
    .then(data => {
        
        if (data.success) {
          localStorage.setItem('u_username',data.result.map(item=>item.u_username));
          const jump = window.confirm("登录成功，是否跳转？");
          if (jump) {
            window.location.href = "main-window.html";
          } else {
            console.log("登录成功！");
          }
          // 在成功时提示用户并根据选择进行页面跳转

        } else {
          alert("用户名或密码错误");
        }
        // 处理服务器的响应

      })
      .catch(error => {
        console.error("Error:", error);
        alert("登录失败，请检查服务器连接");
      });
  }
  // 用户登录函数

  function registerUser() {
    window.location.href = "register.html";
  }
  // 跳转到注册页面函数

  function forgetPassword() {
    const SET_PASSWORD_WINDOW = document.getElementById("set-password-window");
    SET_PASSWORD_WINDOW.style.display = "block";
  }
  // 忘记密码操作函数，显示重置密码窗口

  function backToLogin() {
    const SET_PASSWORD_WINDOW = document.getElementById("set-password-window");
    SET_PASSWORD_WINDOW.style.display = "none";
  }
  // 返回登录页面函数

  function resetPassword() {
    const USERNAME = document.getElementById("oldUserName").value;
    const PASSWORD = document.getElementById("newPassWord").value;
    const EMAIL = document.getElementById("oldEmail").value;
    // 获取输入字段的值

    const HASHED_PASSWORD = CryptoJS.SHA256(PASSWORD).toString();
    // 使用CryptoJS库中的SHA-256算法对新密码进行哈希处理

    if (USERNAME === "" || PASSWORD === "") {
      alert("用户名或密码不能为空");
      return;
    }
    // 验证用户名和密码字段是否为空

    
    fetch("http://localhost:3001/updateUser", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: USERNAME,
        password: HASHED_PASSWORD,
        useremail: EMAIL
      })
    })
    // 发送PUT请求到服务器以更新用户密码
    
    .then(response => response.json())
    .then(data => {
        if (data.success) {
          
          fetch("http://localhost:3001/loginuser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              username: USERNAME,
              password: HASHED_PASSWORD
            })
          })
          // 成功更新密码后再次登录用户

            .then(response => response.json())
            .then(data => {
              if (data.success) {

                
                const jump = window.confirm("密码重置成功，是否返回登录？");
                if (jump) {
                  backToLogin();
                }
              } else {
                alert("用户名或邮箱输入错误");
              }
              // 成功登录后提示用户并返回登录页面

            })
            .catch(error => {
              console.error("Error:", error);
              alert("请检查服务器连接");
            });
        } else {
          alert("密码重置失败，请重试");
        }
        // 处理服务器的响应

      })
      .catch(error => {
        console.error("Error:", error);
        alert("密码重置失败，请检查服务器连接");
      });
  }
// 重置密码函数