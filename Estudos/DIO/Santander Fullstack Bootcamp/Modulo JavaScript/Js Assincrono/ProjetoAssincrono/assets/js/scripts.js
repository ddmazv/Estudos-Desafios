const BASE_URL = " https://randomfox.ca/floof/";
const catBtn = document.getElementById("change-cat");
const catImage = document.getElementById("cat");

const getCats = async () => {
  try {
    const data = await fetch(BASE_URL);
    const json = await data.json();
    return json.image;
  } catch (e) {
    console.log(e.message);
  }
};

const loadImg = async () => {
  catImage.src = await getCats();
};

catBtn.addEventListener("click", loadImg);

loadImg;
