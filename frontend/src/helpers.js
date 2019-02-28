/* returns an empty array of size max */
export const range = (max) => Array(max).fill(null);

/* returns a randomInteger */
export const randomInteger = (max = 1) => Math.floor(Math.random()*max);

/* returns a randomHexString */
const randomHex = () => randomInteger(256).toString(16);

/* returns a randomColor */
export const randomColor = () => '#'+range(3).map(randomHex).join('');

//Remove all children from an element (very useful)
export function removeChildren(el){
    while (el.firstChild){
        el.removeChild(el.firstChild);
    }
}

export function createElement(tag, data, options = {}) {
    const el = document.createElement(tag);
    el.textContent = data;
   
    // Sets the attributes in the options object to the element
    return Object.entries(options).reduce(
        (element, [field, value]) => {
            element.setAttribute(field, value);
            return element;
        }, el);
}

export function createPostTile(post, like, unlike, comment, val, vac) {

    //https://github.com/twbs/bootstrap/tree/43c20b912eed45e43be83d71e5aec9136aecb137/site/docs/4.1/examples
    //I used the album example as a layout on how the cards should be formatted and wrote this javascript code
    //to generate the html

    //Date for easy reading by humans
    let date = new Date(post.meta.published * 1000);

    //HTML generation
    let div1 = createElement("div", null, {id: "post-card-" + post.id, class: "card my-4 w-50 shadow-lg"});
    let img1 = createElement("img", null, {class: "card-img-top", src: "data:image/png;base64," + post.src});
    let div2 = createElement("div", null, {class: "card-body"});
    let lab1 = createElement("label", "User:", {class: "card-text font-weight-bold"});
    let par1 = createElement("p", post.meta.author, {class: "card-text"});
    let lab2 = createElement("label", "Description:", {class: "card-text font-weight-bold"});
    let par2 = createElement("p", post.meta.description_text, {class: "card-text"});
    let lab3 = createElement("label", "Likes:", {class: "card-text font-weight-bold"});
    let par3 = createElement("p", post.meta.likes.length, {class: "card-text"});
    let lab4 = createElement("label", "Comments:", {class: "card-text font-weight-bold"});
    let par4 = createElement("p", post.comments.length, {class: "card-text"});
    let div3 = createElement("div", null, {class: "d-flex justify-context-between align-items-center"});
    let div4 = createElement("div", null, {id: "post-card-btn-group-" + post.id, class: "btn-group"});
    let but1 = createElement("button", "like", {type: " button", class: "btn btn-sm btn-outline-secondary"});
    let but2 = createElement("button", "unlike", {type: " button", class: "btn btn-sm btn-outline-secondary"});
    let but3 = createElement("button", "comment", {type: " button", class: "btn btn-sm btn-outline-secondary"});
    let but4 = createElement("button", "view all likes", {type: " button", class: "btn btn-sm btn-outline-secondary"});
    let but5 = createElement("button", "view all comments", {type: " button", class: "btn btn-sm btn-outline-secondary"});
    let sma1 = createElement("small", date.toLocaleString("en-AU"), {class: "text-muted ml-3"});

    div1.appendChild(img1);
    div1.appendChild(div2);
    div2.appendChild(lab1);
    div2.appendChild(par1);
    div2.appendChild(lab2);
    div2.appendChild(par2);
    div2.appendChild(lab3);
    div2.appendChild(par3);
    div2.appendChild(lab4);
    div2.appendChild(par4);
    div2.appendChild(div3);
    div3.appendChild(div4);
    div3.appendChild(sma1);
    div4.appendChild(but1);
    div4.appendChild(but2);
    div4.appendChild(but3);
    div4.appendChild(but4);
    div4.appendChild(but5);

    //Add the corresponding listeners
    but1.addEventListener("click", like);
    but2.addEventListener("click", unlike);
    but3.addEventListener("click", comment);
    but4.addEventListener("click", val);
    but5.addEventListener("click", vac);

    return div1;
}

export function createCommentTile(string1, string2, string3){

    //https://github.com/twbs/bootstrap/tree/43c20b912eed45e43be83d71e5aec9136aecb137/site/docs/4.1/examples
    //I used the album example as a layout on how the cards should be formatted and wrote this javascript code
    //to generate the html

    //HTML generation
    let div1 = createElement("div", null, {class: "card my-4 w-50 shadow-lg"});
    let div2 = createElement("div", null, {class: "card-body"});
    let lab1 = createElement("label", "User:", {class: "card-text font-weight-bold"});
    let par1 = createElement("p", string1, {class: "card-text"});
    let lab2 = createElement("label", "Comment:", {class: "card-text font-weight-bold"});
    let par2 = createElement("p", string2, {class: "card-text"});
    let lab3 = createElement("label", "Time:", {class: "card-text font-weight-bold"});
    let par3 = createElement("p", string3, {class: "card-text"});

    div1.appendChild(div2);
    div2.appendChild(lab1);
    div2.appendChild(par1);
    div2.appendChild(lab2);
    div2.appendChild(par2);
    div2.appendChild(lab3);
    div2.appendChild(par3);

    return div1;
}

export function createUserTile(string1, string2, string3){

    //https://github.com/twbs/bootstrap/tree/43c20b912eed45e43be83d71e5aec9136aecb137/site/docs/4.1/examples
    //I used the album example as a layout on how the cards should be formatted and wrote this javascript code
    //to generate the html

    //HTML generation
    let div1 = createElement("div", null, {class: "card my-4 w-50 shadow-lg"});
    let div2 = createElement("div", null, {class: "card-body"});
    let lab1 = createElement("label", "User:", {class: "card-text font-weight-bold"});
    let par1 = createElement("p", string1, {class: "card-text"});
    let lab2 = createElement("label", "Posts:", {class: "card-text font-weight-bold"});
    let par2 = createElement("p", string2, {class: "card-text"});
    let lab3 = createElement("label", "Following:", {class: "card-text font-weight-bold"});
    let par3 = createElement("p", string3, {class: "card-text"});

    div1.appendChild(div2);
    div2.appendChild(lab1);
    div2.appendChild(par1);
    div2.appendChild(lab2);
    div2.appendChild(par2);
    div2.appendChild(lab3);
    div2.appendChild(par3);

    return div1;
}

export function createAccountButtons(){
    //HTML generation
    let form1 = createElement("form", null, {class: "form-inline mt-2"});
    let but1 = createElement("button", "Sign Up", {id: "signup-button", class:"btn btn-outline-light my-2 mx-1", type:"button"});
    let but2 = createElement("button", "Login", {id: "login-button", class:"btn btn-outline-light my-2 mx-1", type:"button"});

    form1.appendChild(but1);
    form1.appendChild(but2);

    return form1;
}

export function createPostButtons(followFunction, unfollowFunction, postFunction, profileFunction, prevFunction, nextFunction){
    //HTML generation
    let form1 = createElement("form", null, {class: "form-inline mt-2"});
    let but1 = createElement("button", "Follow", {id: "follow-button", class:"btn btn-outline-light my-2 mx-1", type:"button"});
    let but2 = createElement("button", "Unfollow", {id: "unfollow-button", class:"btn btn-outline-light my-2 mx-1", type:"button"});
    let but3 = createElement("button", "Post", {id: "post-button", class:"btn btn-outline-light my-2 mx-1", type:"button"});
    let but4 = createElement("button", "Profile", {id: "profile-button", class:"btn btn-outline-light my-2 mx-1", type:"button"});
    let but5 = createElement("button", "Prev Page", {id: "prev-button", class:"btn btn-outline-light my-2 mx-1", type:"button"});
    let but6 = createElement("button", "Next Page", {id: "next-button", class:"btn btn-outline-light my-2 mx-1", type:"button"});

    form1.appendChild(but1);
    form1.appendChild(but2);
    form1.appendChild(but3);
    form1.appendChild(but4);
    form1.appendChild(but5);
    form1.appendChild(but6);

    //Add the corresponding listeners
    but1.addEventListener("click", followFunction);
    but2.addEventListener("click", unfollowFunction);
    but3.addEventListener("click", postFunction);
    but4.addEventListener("click", profileFunction);
    but5.addEventListener("click", prevFunction);
    but6.addEventListener("click", nextFunction);

    return form1;
}

export function createBackButtons(backFunction){
    //HTML generation
    let form1 = createElement("form", null, {class: "form-inline mt-2"});
    let but1 = createElement("button", "Back", {id: "back-button", class:"btn btn-outline-light my-2 mx-1", type:"button"});

    form1.appendChild(but1);

    //Add the corresponding listener
    but1.addEventListener("click", backFunction);

    return form1;
}

//Show functions show a form
//Hide functions hide a form
//All functions below do the same thin with their corresponding forms

export function showLogin(){
    let form = document.getElementById("login-form");
    form.classList.remove("invisible");
    form.classList.add("visible");
}

export function hideLogin(){
    let form = document.getElementById("login-form");
    form.classList.add("invisible");
    form.classList.remove("visible");
}

export function showSignUp(){
    let form = document.getElementById("signup-form");
    form.classList.remove("invisible");
    form.classList.add("visible");
}

export function hideSignUp(){
    let form = document.getElementById("signup-form");
    form.classList.add("invisible");
    form.classList.remove("visible");
}

export function showFollow(){
    let form = document.getElementById("follow-form");
    form.classList.remove("invisible");
    form.classList.add("visible");
}

export function hideFollow(){
    let form = document.getElementById("follow-form");
    form.classList.add("invisible");
    form.classList.remove("visible");
}

export function showUnfollow(){
    let form = document.getElementById("unfollow-form");
    form.classList.remove("invisible");
    form.classList.add("visible");
}

export function hideUnfollow(){
    let form = document.getElementById("unfollow-form");
    form.classList.add("invisible");
    form.classList.remove("visible");
}

export function showPost(){
    let form = document.getElementById("post-form");
    form.classList.remove("invisible");
    form.classList.add("visible");
}

export function hidePost(){
    let form = document.getElementById("post-form");
    form.classList.add("invisible");
    form.classList.remove("visible");
}

export function showComment(){
    let form = document.getElementById("comment-form");
    form.classList.remove("invisible");
    form.classList.add("visible");
}

export function hideComment(){
    let form = document.getElementById("comment-form");
    form.classList.add("invisible");
    form.classList.remove("visible");
}

export function showProfile(){
    let form = document.getElementById("user-profile-card");
    form.classList.remove("invisible");
    form.classList.add("visible");
}

export function hideProfile(){
    let form = document.getElementById("user-profile-card");
    form.classList.add("invisible");
    form.classList.remove("visible");
}



// Given an input element of type=file, grab the data uploaded for use
export async function uploadImage(target) {
    //I did not implement this but it checks if the file type is of the correct type
    const [ file ] = target.files;

    const validFileTypes = [ 'image/jpeg', 'image/png', 'image/jpg' ]
    const valid = validFileTypes.find(type => type === file.type);

    if (!valid)
        return false;

    //Promises make things easy
    return new Promise((resolve, reject) => {
        const reader = new FileReader(); //Init reader

        //When the file reads the file then resolve with the base64 conversion of the binary string result
        reader.onload = (e) => {
            console.log(btoa(e.target.result));
            return resolve(btoa(e.target.result));
        };

        //If there is an error then return that instead
        reader.onerror = (e) => {
            console.log(e);
            reject("failed to read file");
        };

        //Signal the reader to read the file
        reader.readAsBinaryString(file);
    });
}