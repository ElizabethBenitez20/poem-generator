function initGlowCursor() {
  const cursor = document.createElement("div");
  cursor.className = "glow-cursor";
  document.body.appendChild(cursor);

  document.addEventListener("mousemove", function (e) {
    cursor.style.left = e.pageX + "px";
    cursor.style.top = e.pageY + "px";
  });
}

window.onload = initGlowCursor;

function displayPoem(response) {
  new Typewriter("#poem", {
    strings: response.data.answer,
    autoStart: true,
    delay: 1,
    cursor: "",
  });
}

function generatePoem(event) {
  event.preventDefault();

  let instructionsInput = document.querySelector("#user-instructions");
  let apiKey = "314t6060bfcoe7ed3da1e87a97833d3d";
  let context =
    "You are an expert in romantic poems and you love writing short poems. Your mission is to generate a 5-line poem and separate each line with a <br />. Be sure to follow the user instructions. Do not include a title for the poem. Sign the poem on a sixth line with '♥' within a <strong> element at the end of the poem and NOT at the beginning.";
  let prompt = `User instructions: Generate a Spanish poem about ${instructionsInput.value}`;
  let apiURL = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${apiKey}`;

  let poemElement = document.querySelector("#poem");
  poemElement.classList.remove("hidden");
  poemElement.innerHTML = `<div class="generating">⏳ Generating a Spanish poem about ${instructionsInput.value}</div>`;

  axios.get(apiURL).then(displayPoem);
}

let poemFormElement = document.querySelector("#poem-generator-form");
poemFormElement.addEventListener("submit", generatePoem);
