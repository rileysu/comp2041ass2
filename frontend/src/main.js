// importing named exports we use brackets
import {
    createPostTile,
    uploadImage,
    showLogin,
    showSignUp,
    hideLogin,
    hideSignUp,
    showFollow,
    hideFollow,
    showUnfollow,
    hideUnfollow,
    showPost,
    hidePost,
    showComment,
    hideComment,
    showProfile,
    hideProfile,
    removeChildren,
    createCommentTile,
    createUserTile,
    createAccountButtons,
    createPostButtons,
    createBackButtons
} from './helpers.js';

let token = null; //Authentication token
let closeFunction = null; //Function used when a page needs to close when another is being opened

let n = 10; //Page post number
let p = 0; //Page number

//https://stackoverflow.com/questions/25983603/how-to-submit-html-form-without-redirection for how to stop forms from redirecting by default
//https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API working with fetch
//https://developers.google.com/web/fundamentals/primers/promises working with promises

//Increase the page counter and display the feed page
function nextPage() {
    p++;
    feedPage();
}

//Decrease the page counter to a min of 0 then display the feed page
function prevPage() {
    if (p - 1 < 0){
        p = 0;
    } else {
        p--;
    }
    feedPage();
}

//Utility function to make fetching a user object easier in a later function
async function fetchUser(id) {
    let headers = {
        "Authorization": "Token " + token,
        "Accept": "application/json",
        "Content-Type": "application/json"
    };

    //Promise to either return the user object or fail
    return new Promise((resolve, reject) => {
        fetch("http://localhost:5000/user?id=" + id, {
            headers,
            method: "GET"
        }).then(function (response) {
            if (response.ok) {
                response.text().then(function (text) {
                    console.log(JSON.parse(text));
                    resolve(JSON.parse(text)); //Parse the JSON and return the object
                })
            } else {
                console.log(response.status);
                console.log(response.statusText);
                reject(); //Simply reject if it fails
            }
        }).catch(function (error) {
            console.log(error);
            reject(); //Simply reject if we encounter an error
        });
    });
}

async function handleLogin(e) {
    e.preventDefault(); //Prevent default submit

    //Make header without auth for login
    let headers = {
        "Accept": "application/json",
        "Content-Type": "application/json"
    };

    //Make payload with username and password
    let payload = {
        username: document.getElementById("username-login-input").value,
        password: document.getElementById("password-login-input").value
    };

    fetch("http://localhost:5000/auth/login", {
        headers,
        method: "POST",
        body: JSON.stringify(payload)
    }).then(async function (response) {
        if (!response.ok) {
            response.text().then(async function (text) {
                console.log(text);
                document.getElementById("login-desc").className = "";
                document.getElementById("login-desc").classList.add("text-danger");
                document.getElementById("login-desc").innerText = JSON.parse(text)["message"];
                //If it fails display the message and allow the user to try again
            });
        } else {
            response.text().then(async function (text) {
                document.getElementById("login-desc").className = "";
                document.getElementById("login-desc").classList.add("text-success");
                document.getElementById("login-desc").innerText = "success";
                //If it works then set the desc text to the right colour with the succeeded message
                token = JSON.parse(text)["token"];
                feedPage();
                //Set the global token and then load the feed page
            });
        }
    }).catch(function (error) {
        console.log(error);
        //Print error if fetch goes wrong
    })
}

async function handleSignUp(e) {
    e.preventDefault(); //Prevent default submit

    //Make header without auth for login
    let headers = {
        "Accept": "application/json",
        "Content-Type": "application/json"
    };

    //Make payload with username, password, email and name
    let payload = {
        username: document.getElementById("username-signup-input").value,
        password: document.getElementById("password-signup-input").value,
        email: document.getElementById("email-signup-input").value,
        name: document.getElementById("name-signup-input").value
    };

    fetch("http://localhost:5000/auth/signup", {
        headers,
        method: "POST",
        body: JSON.stringify(payload)
    }).then(async function (response) {
        if (!response.ok) {
            response.text().then(async function (text) {
                console.log(text);
                document.getElementById("signup-desc").className = "";
                document.getElementById("signup-desc").classList.add("text-danger");
                document.getElementById("signup-desc").innerText = JSON.parse(text)["message"];
                //Handle if we get an error from the server and display it to the user
            });
        } else {
            response.text().then(async function (text) {
                document.getElementById("signup-desc").className = "";
                document.getElementById("signup-desc").classList.add("text-success");
                document.getElementById("signup-desc").innerText = "success";
                //If it works then set the desc text to the right colour with the succeeded message
                token = JSON.parse(text)["token"];
                feedPage();
                //Set the global token and then load the feed page
            });
        }
    }).catch(function (error) {
        console.log(error);
        //Print error if fetch goes wrong
    })
}

async function handleFollow(e) {
    e.preventDefault(); //Prevent default submit

    //Make header with auth
    let headers = {
        "Authorization": "Token " + token,
        "Accept": "application/json",
        "Content-Type": "application/json"
    };

    //Get username from form input
    let username = document.getElementById("username-follow-input").value;

    fetch("http://localhost:5000/user/follow?username=" + username, {
        headers,
        method: "PUT",
    }).then(async function (response) {
        if (!response.ok) {
            response.text().then(async function (text) {
                console.log(text);
                document.getElementById("follow-desc").className = "";
                document.getElementById("follow-desc").classList.add("text-danger");
                document.getElementById("follow-desc").innerText = JSON.parse(text)["message"];
                //Handle if we get an error from the server and display it to the user
            });
        } else {
            response.text().then(async function (text) {
                document.getElementById("follow-desc").className = "";
                document.getElementById("follow-desc").classList.add("text-success");
                document.getElementById("follow-desc").innerText = "success";
                //If it works then set the desc text to the right colour with the succeeded message
                feedPage();
                //Display feed page afterwards
            });
        }
    }).catch(function (error) {
        console.log(error);
        //Print error if fetch goes wrong
    })
}

async function handleUnfollow(e) {
    e.preventDefault(); //Prevent default submit

    //Make header with auth
    let headers = {
        "Authorization": "Token " + token,
        "Accept": "application/json",
        "Content-Type": "application/json"
    };

    //Get username from form input
    let username = document.getElementById("username-unfollow-input").value;

    fetch("http://localhost:5000/user/unfollow?username=" + username, {
        headers,
        method: "PUT",
    }).then(async function (response) {
        if (!response.ok) {
            response.text().then(async function (text) {
                console.log(text);
                document.getElementById("unfollow-desc").className = "";
                document.getElementById("unfollow-desc").classList.add("text-danger");
                document.getElementById("unfollow-desc").innerText = JSON.parse(text)["message"];
                //Handle if we get an error from the server and display it to the user
            });
        } else {
            response.text().then(async function (text) {
                document.getElementById("unfollow-desc").className = "";
                document.getElementById("unfollow-desc").classList.add("text-success");
                document.getElementById("unfollow-desc").innerText = "success";
                //If it works then set the desc text to the right colour with the succeeded message
                feedPage();
                //Display the feed page afterwards
            });
        }
    }).catch(function (error) {
        console.log(error);
        //Print error if fetch goes wrong
    })
}

async function handlePost(e) {
    e.preventDefault(); //Prevent default submit

    //Make header with auth
    let headers = {
        "Authorization": "Token " + token,
        "Accept": "application/json",
        "Content-Type": "application/json"
    };

    let payload = {
        description_text: document.getElementById("description-post-input").value,
        src: await uploadImage(document.getElementById("file-post-input"))
    };

    fetch("http://localhost:5000/post", {
        headers,
        method: "POST",
        body: JSON.stringify(payload)
    }).then(async function (response) {
        if (!response.ok) {
            response.text().then(async function (text) {
                console.log(text);
                document.getElementById("post-desc").className = "";
                document.getElementById("post-desc").classList.add("text-danger");
                document.getElementById("post-desc").innerText = JSON.parse(text)["message"];
                //Handle if we get an error from the server and display it to the user
            });
        } else {
            response.text().then(async function (text) {
                document.getElementById("post-desc").className = "";
                document.getElementById("post-desc").classList.add("text-success");
                document.getElementById("post-desc").innerText = "success";
                //If it works then set the desc text to the right colour with the succeeded message
                feedPage();
                //Display feed page afterwards
            });
        }
    }).catch(function (error) {
        console.log(error);
        //Print error if fetch goes wrong
    })
}

function handleLike(e) {

    //Make header with auth
    let headers = {
        "Authorization": "Token " + token,
        "Accept": "application/json",
        "Content-Type": "application/json"
    };

    //Fetch the id from the event target
    let id = e.target.parentNode.id.split("-")[4];

    fetch("http://localhost:5000/post/like?id=" + id, {
        headers,
        method: "PUT",
    }).then(async function (response) {
        if (!response.ok) {
            response.text().then(async function (text) {
                console.log(JSON.parse(text)["message"]);
                document.getElementById("info-navbar").innerText = "error liking post " + id;
                //Handle if we get an error from the server and display it to the user
            });
        } else {
            response.text().then(async function (text) {
                console.log(JSON.parse(text)["message"]);
                document.getElementById("info-navbar").innerText = "liked post " + id;
                //If it works then display the succeeded message
            });
        }
    }).catch(function (error) {
        console.log(error);
        //Print error if fetch goes wrong
    })
}

function handleUnlike(e) {

    //Make header with auth
    let headers = {
        "Authorization": "Token " + token,
        "Accept": "application/json",
        "Content-Type": "application/json"
    };

    //Fetch the id from the event target
    let id = e.target.parentNode.id.split("-")[4];

    fetch("http://localhost:5000/post/unlike?id=" + id, {
        headers,
        method: "PUT",
    }).then(async function (response) {
        if (!response.ok) {
            response.text().then(async function (text) {
                console.log(JSON.parse(text)["message"]);
                document.getElementById("info-navbar").innerText = "error unliking post " + id;
                //Handle if we get an error from the server and display it to the user
            });
        } else {
            response.text().then(async function (text) {
                console.log(JSON.parse(text)["message"]);
                document.getElementById("info-navbar").innerText = "unliked post " + id;
                //If it works then display the succeeded message
            });
        }
    }).catch(function (error) {
        console.log(error);
        //Print error if fetch goes wrong
    })
}

function handleComment(e) {
    let id = e.target.parentNode.id.split("-")[4];
    console.log(id);

    commentPage();

    let sendComment = function () {
        //Make header with auth
        let headers = {
            "Authorization": "Token " + token,
            "Accept": "application/json",
            "Content-Type": "application/json"
        };

        //Create payload with comment (doesn't need the extra stuff like it says in the API)
        let payload = {
            comment: document.getElementById("comment-comment-input").value
        };

        //Grab id from the event target
        let id = e.target.parentNode.id.split("-")[4];

        fetch("http://localhost:5000/post/comment?id=" + id, {
            headers,
            method: "PUT",
            body: JSON.stringify(payload)
        }).then(async function (response) {
            if (!response.ok) {
                response.text().then(async function (text) {
                    console.log(JSON.parse(text)["message"]);
                    document.getElementById("comment-desc").className = "";
                    document.getElementById("comment-desc").classList.add("text-danger");
                    document.getElementById("comment-desc").innerText = JSON.parse(text)["message"];
                    //Handle if we get an error from the server and display it to the user
                });
            } else {
                response.text().then(async function (text) {
                    console.log(JSON.parse(text)["message"]);
                    document.getElementById("comment-desc").className = "";
                    document.getElementById("comment-desc").classList.add("text-success");
                    document.getElementById("comment-desc").innerText = "success";
                    //If it works then display the succeeded message
                    feedPage();
                    //Display the feed page afterwards
                });
            }
        }).catch(function (error) {
            console.log(error);
            //Print error if fetch goes wrong
        })
    };

    let commentform = document.getElementById("comment-form");
    commentform.addEventListener("submit", sendComment);
    //Add event listener to the button
    //This must be done just in time since we don't know what the ID is beforehand
}

function vacPage(e) {
    //Get the id from the event target
    let id = e.target.parentNode.id.split("-")[4];

    //Run the close function from the previous page
    if (closeFunction != null) {
        closeFunction();
    }

    //Create back button on the navbar which naviages back to the feedPage
    document.getElementById("navbar-buttons").appendChild(createBackButtons(feedPage));

    //Make header with auth
    let headers = {
        "Authorization": "Token " + token,
        "Accept": "application/json",
        "Content-Type": "application/json"
    };

    fetch("http://localhost:5000/post?id=" + id, {
        headers,
        method: "GET"
    }).then(async function (response) {
        if (response.ok) {
            response.text().then(async function (text) {
                console.log(JSON.parse(text));
                let post = JSON.parse(text);
                //Receive post containing list of comments
                post.comments.forEach(function (comment) {
                    let date = new Date(comment.published * 1000);
                    document.getElementById("large-feed").appendChild(createCommentTile(comment.author, comment.comment, date.toLocaleString("en-AU")));
                    //Print each comment in the list of comments received with a user readable date attached
                });

            })
        } else {
            console.log(response.status);
            console.log(response.statusText);
            //if the response is not ok then print the error
        }
    }).catch(async function (error) {
        console.log(error);
        //Print error if we cant fetch
    });

    closeFunction = function () {
        removeChildren(document.getElementById("navbar-buttons"));
        removeChildren(document.getElementById("large-feed"));
        //Close function needs to be removing the comments and back button
    };
}

async function valPage(e) {
    //Get the id from the event target
    let id = e.target.parentNode.id.split("-")[4];

    //Run close function from last page
    if (closeFunction != null) {
        closeFunction();
    }

    //Create back button on the navbar which naviages back to the feedPage
    document.getElementById("navbar-buttons").appendChild(createBackButtons(feedPage));

    //Make header with auth
    let headers = {
        "Authorization": "Token " + token,
        "Accept": "application/json",
        "Content-Type": "application/json"
    };

    fetch("http://localhost:5000/post?id=" + id, {
        headers,
        method: "GET"
    }).then(async function (response) {
        if (response.ok) {
            response.text().then(async function (text) {
                console.log(JSON.parse(text));
                let post = JSON.parse(text);
                //Receive post containing list of user ids for those who like the post
                post.meta.likes.forEach(async function (userid) {
                    let user = await fetchUser(userid); //Here is where we use the function to cut down on space
                    document.getElementById("large-feed").appendChild(createUserTile(user.username, user.posts.length, user.following.length));
                    //Print each user in the list of userids of people who liked the post
                });

            })
        } else {
            console.log(response.status);
            console.log(response.statusText);
            //if the response is not ok then print the error
        }
    }).catch(async function (error) {
        console.log(error);
        //Print error if we cant fetch
    });

    closeFunction = function () {
        removeChildren(document.getElementById("navbar-buttons"));
        removeChildren(document.getElementById("large-feed"));
        //Close function needs to be removing the comments and back button
    };
}

function loginPage() {
    //Run close function from last page
    if (closeFunction != null) {
        closeFunction();
    }
    //Hide navbar and show the form
    navbar.classList.remove("visible");
    navbar.classList.add("invisible");
    showLogin();
    //Create our close function where we remove buttons and show the navbar again
    closeFunction = function () {
        removeChildren(document.getElementById("navbar-buttons"));
        navbar.classList.add("visible");
        navbar.classList.remove("invisible");
        hideLogin();
    }
}

function signInPage() {
    //Run close function from last page
    if (closeFunction != null) {
        closeFunction();
    }
    //Hide navbar and show the form
    navbar.classList.remove("visible");
    navbar.classList.add("invisible");
    showSignUp();
    //Create our close function where we remove buttons and show the navbar again
    closeFunction = function () {
        removeChildren(document.getElementById("navbar-buttons"));
        navbar.classList.add("visible");
        navbar.classList.remove("invisible");
        hideSignUp();
    }
}

function followPage() {
    //Run close function from last page
    if (closeFunction != null) {
        closeFunction();
    }
    //Hide navbar and show the form
    navbar.classList.remove("visible");
    navbar.classList.add("invisible");
    showFollow();
    //Create our close function where we remove buttons and show the navbar again
    closeFunction = function () {
        removeChildren(document.getElementById("navbar-buttons"));
        navbar.classList.add("visible");
        navbar.classList.remove("invisible");
        hideFollow();
    }
}

function unfollowPage() {
    //Run close function from last page
    if (closeFunction != null) {
        closeFunction();
    }
    //Hide navbar and show the form
    navbar.classList.remove("visible");
    navbar.classList.add("invisible");
    showUnfollow();
    //Create our close function where we remove buttons and show the navbar again
    closeFunction = function () {
        removeChildren(document.getElementById("navbar-buttons"));
        navbar.classList.add("visible");
        navbar.classList.remove("invisible");
        hideUnfollow();
    }
}

function postPage() {
    //Run close function from last page
    if (closeFunction != null) {
        closeFunction();
    }
    //Hide navbar and show the form
    navbar.classList.remove("visible");
    navbar.classList.add("invisible");
    showPost();
    //Create our close function where we remove buttons and show the navbar again
    closeFunction = function () {
        removeChildren(document.getElementById("navbar-buttons"));
        navbar.classList.add("visible");
        navbar.classList.remove("invisible");
        hidePost();
    }
}

function commentPage() {
    //Run close function from last page
    if (closeFunction != null) {
        closeFunction();
    }
    //Hide navbar and show the form
    navbar.classList.remove("visible");
    navbar.classList.add("invisible");
    showComment();
    //Create our close function where we remove buttons and show the navbar again
    closeFunction = function () {
        removeChildren(document.getElementById("navbar-buttons"));
        navbar.classList.add("visible");
        navbar.classList.remove("invisible");
        hideComment();
    }
}

//This one is like a hybrid between a handle and a page function (but falls into page)
function profilePage() {
    //Run close function from last page
    if (closeFunction != null) {
        closeFunction();
    }

    //Show the profile page and add a back button with listener for the feedPage
    showProfile();
    document.getElementById("navbar-buttons").appendChild(createBackButtons(feedPage));

    //Make header with auth
    let headers = {
        "Authorization": "Token " + token,
        "Accept": "application/json",
        "Content-Type": "application/json"
    };

    fetch("http://localhost:5000/user/", {
        headers,
        method: "GET"
    }).then(async function (response) {
        if (response.ok) {
            response.text().then(async function (text) {
                console.log(JSON.parse(text));
                let user = JSON.parse(text);

                //Set all the text areas accordingly on the profile page
                document.getElementById("user-profile-username").innerText = user.username;
                document.getElementById("user-profile-name").innerText = user.name;
                document.getElementById("user-profile-email").innerText = user.email;
                document.getElementById("user-profile-posts").innerText = user.posts.length;
                document.getElementById("user-profile-following").innerText = user.following.length;
                document.getElementById("user-profile-followers").innerText = user.followed_num;
            })
        } else {
            //If there is an error then print the status
            console.log(response.status);
            console.log(response.statusText);
        }
    }).catch(async function (error) {
        //If there is an error in the fetch then print why
        console.log(error);
    });

    //Define our close function as removing all elements from the navbar, feed and hiding the profile form.
    closeFunction = function () {
        removeChildren(document.getElementById("navbar-buttons"));
        //removeChildren(document.getElementById("large-feed")); Not actually needed but is useful if more information is added in the future
        hideProfile();
    };
}


function feedPage() {
    //Run close function from last page
    if (closeFunction != null) {
        closeFunction();
    }

    //Append the pagenumber to the navbar as well as all the buttons we need for the user to navigate
    document.getElementById("page-navbar").innerText = "Page: " + p;
    document.getElementById("navbar-buttons").appendChild(createPostButtons(followPage, unfollowPage, postPage, profilePage, prevPage, nextPage));

    //Make header with auth
    let headers = {
        "Authorization": "Token " + token,
        "Accept": "application/json",
        "Content-Type": "application/json"
    };

    fetch("http://localhost:5000/user/feed?p=" + p*n + "&n=" + n, {
        headers,
        method: "GET"
    }).then(async function (response) {
        if (response.ok) {
            response.text().then(async function (text) {
                console.log(JSON.parse(text)["posts"]);
                //Load all posts
                let posts = JSON.parse(text)["posts"];
                posts.forEach(function (post) {
                    //Create a post tile for each post in the list
                    document.getElementById("large-feed").appendChild(createPostTile(post, handleLike, handleUnlike, handleComment, valPage, vacPage));
                });

            })
        } else {
            //If there is an error then print the status
            console.log(response.status);
            console.log(response.statusText);
        }
    }).catch(async function (error) {
        //If there is an error in the fetch then print why
        console.log(error);
    });

    //Define our close function as removing all elements from the navbar, feed and nullifying the two navbar-text elements used for alerting the user
    closeFunction = function () {
        document.getElementById("page-navbar").innerText = "";
        document.getElementById("info-navbar").innerText = "";
        removeChildren(document.getElementById("navbar-buttons"));
        removeChildren(document.getElementById("large-feed"));
    };
}

//On the first page create the account buttons
document.getElementById("navbar-buttons").appendChild(createAccountButtons());

//Define all the static elements we have in html
const navbar = document.getElementById("navbar");
const loginbutton = document.getElementById("login-button");
const signupbutton = document.getElementById("signup-button");
const loginform = document.getElementById("login-form");
const signupform = document.getElementById("signup-form");
const followform = document.getElementById("follow-form");
const unfollowform = document.getElementById("unfollow-form");
const postform = document.getElementById("post-form");

//Attach listeners to them to access pages and submit forms
loginform.addEventListener("submit", handleLogin);
signupform.addEventListener("submit", handleSignUp);
followform.addEventListener("submit", handleFollow);
unfollowform.addEventListener("submit", handleUnfollow);
postform.addEventListener("submit", handlePost);
loginbutton.addEventListener("click", loginPage);
signupbutton.addEventListener("click", signInPage);
