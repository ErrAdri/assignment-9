// Paste your Giphy API key here (keep a copy in .env for reference — .env is git-ignored)
const apiKey = "jKdfdZAD22CBUMDKpE72XId0yUcbDbkL";

// Grab the elements we need from the page
const gifContainer = document.querySelector("#gif-container");
const fetchButton = document.querySelector("#fetch-gif-btn");
const searchInput = document.querySelector("#search-input");

// Fetch GIFs from Giphy for a search term and return an array of original image URLs
async function getGifs(searchTerm) {
  // Extra credit: the search term is added to the URL with string interpolation
  const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(searchTerm)}&limit=24&offset=0&rating=g&lang=en`;

  const response = await fetch(endpoint);
  const data = await response.json();

  // Pull the original image URL out of each GIF object
  const images = data.data.map((gif) => gif.images.original.url);
  console.log(images);

  return images;
}

// When the button is clicked, fetch GIFs and render them on the page
fetchButton.addEventListener("click", async () => {
  // Use whatever the user typed, or fall back to a default query
  const searchTerm = searchInput.value.trim() || "cats";

  try {
    const images = await getGifs(searchTerm);

    // Clear out old results before showing the new ones
    gifContainer.innerHTML = "";

    for (const imageUrl of images) {
      gifContainer.innerHTML += `<img src="${imageUrl}" class="col-3 mb-3">`;
    }
  } catch (error) {
    console.error("Something went wrong fetching GIFs:", error);
  }
});