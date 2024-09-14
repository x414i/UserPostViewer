let getPosts = (userID) => {
    let request = new XMLHttpRequest();
    
    request.open("GET", "https://jsonplaceholder.typicode.com/posts?userId=" + userID);
    request.responseType = "json";
    request.send();
    
    request.onload = function() {
        if (request.status >= 200 && request.status <= 299) {
            let posts = request.response;
            let postsContainer = document.getElementById("posts");
            postsContainer.innerHTML = ''; 
            
            posts.forEach(post => {
                let content = `
                 <div class="post">
                    <h3>${post.title}</h3>
                    <h4>${post.body}</h4>
                 </div>`;
                postsContainer.innerHTML += content;
            });
        } else {
            alert("Error: " + request.status);
        }
    };
};

let getUsers = () => {
    let request = new XMLHttpRequest();
    
    request.open("GET", "https://jsonplaceholder.typicode.com/users");
    request.responseType = "json";
    request.send();
    
    request.onload = function() {
        if (request.status >= 200 && request.status <= 299) {
            let users = request.response;
            let usersContainer = document.getElementById("users");
            usersContainer.innerHTML = ''; 
            
            users.forEach(user => {
                let content = `
                 <div class="user" onclick="clickUser(${user.id}, this)">
                    <h3>${user.name}</h3>
                    <h3>${user.email}</h3>
                 </div>`;
                usersContainer.innerHTML += content;
            });
        } else { 
            alert("Error: " + request.status);
        }
    };
};

let clickUser = (userID, element) => {
  
    let allUsers = document.querySelectorAll('.user');
    allUsers.forEach(user => {
        user.classList.remove('selected');
    });

    element.classList.add('selected');
    
    getPosts(userID);
};

window.onload = function() {
    getUsers();
};
