var displayRepos = function(repos, searchTerm) {
    document.querySelector("#repo-search-term").textContent = searchTerm;
    if (repos.length === 0) {
        document.querySelector("#repos-container").textContent = "No repositories found.";
        return;
    }
    for(var i = 0; i < repos.length; i++) {
        var nextDiv = document.createElement("div");
        nextDiv.className = "flex-row justify-space-between list-item align-center";
        var leftDiv = document.createElement("div");
        leftDiv.textContent = repos[i].full_name;
        var rightDiv = document.createElement("div");
        rightDiv.classList = "flex-row align-center";
        if(repos[i].open_issues_count > 0) {
            rightDiv.innerHTML =
            "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        } else {
          rightDiv.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }
        //rightDiv.textContent = repos[i].open_issues_count;
        nextDiv.append(leftDiv,rightDiv);
        document.querySelector("#repos-container").appendChild(nextDiv);
    }
};

var getUserRepos = function(user) {
    // format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    // make a request to the url
    fetch(apiUrl).then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
                displayRepos(data, user);
            });
        } else {
            alert("Error: GitHub User Not Found");
        }
    }).catch(function(error) {
        // Notice this `.catch()` getting chained onto the end of the `.then()` method
        alert("Unable to connect to GitHub");
    });
};


//getUserRepos();
var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");

var formSubmitHandler = function(event) {
    event.preventDefault();
    var username = nameInputEl.value.trim();
    if(username) {
        getUserRepos(username);
        nameInputEl.value = "";
    } else {
        alert("Please enter a GitHub username.");
    }
};

userFormEl.addEventListener("submit", formSubmitHandler);