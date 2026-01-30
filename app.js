window.onload = async () => {
    let container = document.querySelector("#dog-container");
    let loader = document.querySelector("#loader");
    let numDogs = prompt("How many dog pictures do you want to see? (Max 100)");
    let count = parseInt(numDogs);

    if (isNaN(count) || count <= 0) {
        alert("Please enter a valid number. Showing 5 dogs by default.");
        count = 5;
    }
    if (count > 100) {
        alert("You can request a maximum of 100 dogs. Showing 100 dogs.");
        count = 100;
    }

    loader.style.display = "block"; // Show loader
    container.innerHTML = ""; // Clear previous images

    for (let i = 0; i < count; i++) {
        let dogImage = await getDogImage();
        let img = document.createElement("img");
        img.src = dogImage;
        container.appendChild(img);
    }

    loader.style.display = "none"; // Hide loader
};

// Back to Top Button Functionality
let backToTopButton = document.getElementById("back-to-top");

window.onscroll = function() {
    scrollFunction();
};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        backToTopButton.classList.add("show");
    } else {
        backToTopButton.classList.remove("show");
    }
}

backToTopButton.addEventListener("click", function() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
});

let url = "https://dog.ceo/api/breeds/image/random";

async function getDogImage() {
    try {
        let res = await axios.get(url);
        return res.data.message;
    } catch (err) {
        console.log(err);
        return "Image not found";
    }
}