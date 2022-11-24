function init() {
  const dogBar = document.querySelector("div#dog-bar");

  fetch("http://localhost:3000/pups")
    .then((resp) => resp.json())
    .then((data) => {
      data.map((dog) => {
        const spanDog = document.createElement("span");
        spanDog.classList += dog.isGoodDog;
        spanDog.textContent += dog.name;
        dogBar.appendChild(spanDog);
      });

      const spanQuery = document.querySelectorAll("span");
      const dogInfo = document.getElementById("dog-info");
      data.map((dog) => {
        for (let i = 0; i < spanQuery.length; i++) {
          spanQuery[i].addEventListener("click", () => {
            if (spanQuery[i].textContent === dog.name) {
              dogInfo.innerHTML = `<img src=${dog.image} /> <h2>${dog.name}</h2>`;
              if (dog.isGoodDog === true) {
                dogInfo.innerHTML += `<button class="good"> Good Dog!</button>`;
              } else {
                dogInfo.innerHTML += `<button class="bad"> Bad Dog!</button>`;
              }

              const buttonStatus = document.getElementsByTagName("button")[1];
              buttonStatus.addEventListener("click", () => {
                if (buttonStatus.className == "good") {
                  buttonStatus.textContent = "Bad Dog";
                  buttonStatus.className = "bad";
                  const spanDog = document.createElement("span");
                  spanDog.classList = dog.isGoodDog;
                  spanDog.id = "new-dog";
                  spanDog.textContent =
                    buttonStatus.previousElementSibling.textContent;
                  dogBar.appendChild(spanDog);
                } else {
                  buttonStatus.textContent = "Good Dog";
                  buttonStatus.className = "good";
                  const spanDog = document.createElement("span");
                  spanDog.classList = dog.isGoodDog;
                  spanDog.id = "new-dog";
                  spanDog.textContent =
                    buttonStatus.previousElementSibling.textContent;
                  dogBar.appendChild(spanDog);
                }
                const spanQuery = document.getElementById("new-dog");
                spanQuery.addEventListener("click", () => {
                  if (spanQuery.textContent === dog.name) {
                    dogInfo.innerHTML = `<img src=${dog.image} /> <h2>${dog.name}</h2>`;
                    if (dog.isGoodDog === true) {
                      dogInfo.innerHTML += `<button class="good"> Good Dog!</button>`;
                    } else {
                      dogInfo.innerHTML += `<button class="bad"> Bad Dog!</button>`;
                    }
                  }
                });
              });
            }
          });
        }
      });

      const filterButton = document.getElementById("good-dog-filter");
      filterButton.addEventListener("click", () => {
        spanQuery.forEach((element) => element.remove());
        if (filterButton.textContent == "Filter good dogs: OFF") {
          filterButton.textContent = "Filter good dogs: ON";
          spanQuery.forEach((dog) => {
            if (dog.className == "true") {
              dogBar.appendChild(dog);
            }
          });
        } else {
          filterButton.textContent = "Filter good dogs: OFF";
          spanQuery.forEach((dog) => {
            if (dog.className == "false") {
              dogBar.appendChild(dog);
            }
          });
        }
      });
    });
}
document.addEventListener("DOMContentLoaded", init);