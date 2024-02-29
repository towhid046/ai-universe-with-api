const loadData = async () => {
  const url = "https://openapi.programming-hero.com/api/ai/tools";
  const response = await fetch(url);
  const data = await response.json();
  const tools = data.data.tools;
  displayTools(tools);
};

const displayTools = (tools) => {
  const cardsContainer = document.getElementById("cards_container");
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

      <ol class="mb-5 list-decimal list-inside">
        <li>Natural alnguage processing</li>
        <li>Contextual understanding</li>
        <li>Text generation</li>
      </ol>

      <div class="w-full flex justify-between border-t-2 pt-5 items-center">
        <div>
          <h3 class="font-bold text-3xl">ChatGPT</h3>
          <span class="mr-2">
              <i class="fa-solid fa-calendar-days"></i>
          </span>
          <span>11/01/2022</span>
        </div>
        
        <button class="btn border-none rounded-full bg-[#fef7f7]">
          <i class="fa-solid fa-arrow-right-long text-lg text-[#eb5757]"></i>
        </button>
      </div>

    </div>

    `;
  cardsContainer.appendChild(div);
};
loadData();
