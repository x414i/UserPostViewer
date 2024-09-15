let getPosts = (userID) => {
    fetch("https://jsonplaceholder.typicode.com/posts?userId=" + userID)
    .then(response => {
        if(response.ok)
        return response.json()
    })
    .then(posts => {
        let postsContainer = document.getElementById("posts");
        postsContainer.innerHTML = ''; // Clear previous posts
        
        posts.forEach(post => {
            let content = `
            <div id="post">
                <h3>${post.title}</h3>
                <p>${post.body}</p>
            </div>`;
            postsContainer.innerHTML += content;
        });
    });
}

let getUsers = () => {
   return new Promise((resolve , reject) => {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => {
            if(response.ok)
                return response.json();
            else
                reject("Error with user request");
        })
        .then(users => {
            let usersContainer = document.getElementById("users");
            usersContainer.innerHTML = ''; // Clear previous users
            
            users.forEach(user => {
                let content = `
                <div class="user" onclick="clickUser(${user.id}, this)">
                    <img src="https://robohash.org/${user.id}?set=set4" alt="${user.name}">
                    <div>
                        <h3>${user.name}</h3>
                        <p>${user.email}</p>
                    </div>
                </div>`;
                usersContainer.innerHTML += content;
            });
            resolve();
        });
    });
}

let clickUser = (userID, element) => {
    let allUsers = document.querySelectorAll('.user');
    allUsers.forEach(user => {
        user.classList.remove('selected');
    });

    element.classList.add('selected');
    getPosts(userID);
}

window.onload = function() {
    getUsers().then(() => {
        getPosts(1);
    }).catch(error => {
        console.log(error);
    });
}