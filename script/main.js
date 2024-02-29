const loadData = async (isShow, isSort) => {
  const url = "https://openapi.programming-hero.com/api/ai/tools";
  const response = await fetch(url);
  const data = await response.json();
  const tools = data.data.tools;
  displayTools(tools, isShow, isSort);
};

const displayTools = (tools, isShow, isSort) => {
  const cardsContainer = document.getElementById("cards_container");

  // primarly show 6 card
  !isShow && !isSort
    ? (tools = tools.slice(0, 6))
    : (cardsContainer.innerHTML = "");

  // sort tools base on the date:
  if (isSort) {
    document.getElementById("show_more_div").classList.add("hidden");
    cardsContainer.innerHTML = "";
    tools = tools.sort((a, z) =>
      a.published_in.split("/")[2] < z.published_in.split("/")[2] ? 1 : -1
    );
  }

  // set tool to display in the ui:
  tools.forEach((tool) => {
    displayEachTool(tool, cardsContainer);
  });
};

const displayEachTool = (tool, cardsContainer) => {
  const { name, image, published_in, features, links } = tool;

  const div = document.createElement("div");
  div.classList = `card bg-base-100 border-2`;

  div.innerHTML = `
  <figure class="pt-7 px-7">
  <img src="${image}" class="rounded-xl"/>
  </figure>
  <div class="card-body items-start">
  <h2 class="text-2xl font-bold">Features</h2>
 
    <ol 
      id="features_list_container" 
      class="mb-5 list-decimal list-inside"
      >
      ${features.map((feature) => `<li>${feature}</li>`).join("")}
    </ol>

      <div class="w-full flex justify-between border-t-2 pt-5 items-center">
        <div>
          <h3 class="font-bold text-3xl">${name}</h3>
          <span class="mr-2">
              <i class="fa-solid fa-calendar-days"></i>
          </span>
          <span>${published_in}</span>
        </div>
        
        <button class="btn border-none rounded-full bg-[#fef7f7]">
          <i class="fa-solid fa-arrow-right-long text-lg text-[#eb5757]"></i>
        </button>
      </div>

    </div>

    `;
  cardsContainer.appendChild(div);
};

// show more click handelar:
const showMoreClickHandelar = () => {
  document.getElementById("show_more_div").classList.add("hidden");
  isShow = true;
  loadData(isShow);
};

// sort by date button click handearl:
const sortByDateClickHandelar = () => {
  const isSort = true;
  loadData(false, isSort);
};
loadData();
