const form = document.querySelector("#zipForm");
const input = document.querySelector("#input-field");
const outputCards = document.querySelector("#output");
const results = document.querySelector("#results");
var counter = 0;
form.addEventListener("submit", getLocationInfo);

function getLocationInfo(e) {
  const inputVal = input.value;

  fetch(`https://api.zippopotam.us/GB/${inputVal}`)
    .then((response) => {
      console.log(response);
      if (response.status != 200) {
        document.querySelector(`#output`).innerHTML = `
        <article class="message is-danger"><div class="message-body">Invalid postcode, please try again</div></article
        `;
        showIcon("remove");
        input.classList.remove("success");
        input.classList.add("invalid");
        results.innerHTML = "";
        throw Error(response.statusText);
      } else {
        showIcon("check");
        input.classList.remove("invalid");
        input.classList.add("success");
        return response.json();
      }
    })
    .then((data) => {
      console.log(data);
      let output = "";
      let resultsFound = 0;
      data.places.forEach((place) => {
        resultsFound += 1;
        output += `<article class="message is-info">
        <div class="message-header"><p>${place["place name"]}</p></div> 
        <div class="message-body">
        <ul>
          <li><strong>Town: </strong>${place["place name"]}</li>
          <li><strong>Country: </strong>${place["state"]}</li>
          <li><strong>Longitude: </strong>${place["longitude"]}</li>
          <li><strong>Latitude: </strong>${place["latitude"]}</li>
        </ul>
      </div>
      </article>
      `;
      });
      results.innerHTML = `<p class="has-text-light">${resultsFound} Result(s) Found.</p>`;
      outputCards.innerHTML = output;
    })
    .catch((err) => console.log(err));

  e.preventDefault();
}

function showIcon(icon) {
  document.querySelector(".icon-remove").style.display = "none";
  document.querySelector(".icon-check").style.display = "none";

  document.querySelector(`.icon-${icon}`).style.display = "inline-flex";
}
