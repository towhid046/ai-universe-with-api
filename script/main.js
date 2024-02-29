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
  const { name, image, published_in, features, id, links } = tool;

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
        <button onclick="showDetailsClickHandelar('${id}'); show_modal.showModal()" class="btn border-none rounded-full bg-[#fef7f7]">
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

// show details click handelar:
const showDetailsClickHandelar = async (id) => {
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  const singleTool = data.data;
  displaySingleCardDetails(singleTool);
};

// set details pricing color:
const setColorByIndex = (index) => {
  if (index === 0) {
    return "text-green-500";
  }
  if (index === 1) {
    return "text-yellow-500";
  }
  if (index === 2) {
    return "text-red-500";
  }
  return color;
};

// set features item:
const setFeaturesItem = (features) => {
  let result = "";
  for (let feature in features) {
    result += `<li class="text-sm">${features[feature].feature_name}</li>`;
  }
  return result;
};

// display single card details:
const displaySingleCardDetails = (singleTool) => {
  const {
    description,
    pricing,
    features,
    integrations,
    image_link,
    input_output_examples: iOExamples,
    accuracy: { score, description: accuracyDeascription },
  } = singleTool;

  // input output example:
  const randomNumber = Math.round(Math.random() * 1);

  const modalContainer = document.getElementById("modal_content");

  modalContainer.innerHTML = `
    <!-- modal content start -->
    <div class="pr-14 pl-14 pb-14 pt-5 rounded-xl flex-col lg:flex-row flex justify-between gap-6">
      <!-- div left -->
      <div class="border-red-400 border-2 p-6 rounded-xl flex-1 bg-[#fef6f6] space-y-4">
        <h3 class="text-base font-bold">${description}</h3>
        <ul class="flex flex-col lg:flex-row items-center gap-4">
        ${pricing
          .map(
            (item, index) =>
              `<li class="bg-white ${setColorByIndex(
                index
              )} p-5 rounded-xl font-semibold text-base text-center"> 
                ${item?.price} 
              <br/> ${item?.plan} </li>`
          )
          .join("")}
        </ul>

        <div class="flex flex-col md:flex-row justify-between gap-6">
          <ul class="list-disc list-inside">
            <h3 class="font-bold text-xl mb-4">Features</h3>
            ${setFeaturesItem(features)}
          </ul>
          <ul class="list-disc list-inside">
            <h3 class="font-bold text-xl mb-4">Integrations</h3>
            ${integrations
              .map(
                (integration) =>
                  `<li class="text-sm">${integration || "No data found"}</li>`
              )
              .join("")}
          </ul>
        </div>

      </div>

      <!-- div right -->
      <div class="card border-2 bg-base-100 flex-1">
        <figure class="pt-5 px-5">
          <img class="rounded-xl" src="${
            image_link?.[0]
          }" alt="Image not found" />
          <button class="btn btn-sm btn-error text-white absolute right-7 top-7"> ${
            score || "Not found"
          }% accuracy</button>
        </figure>
        <div class="card-body items-center text-center">
          <h2 class="card-title">${
            iOExamples[randomNumber]?.input || "Input not found"
          }</h2>
          <p>${iOExamples[randomNumber]?.output || "Output not found"}</p>
        </div>
      </div>

    </div>
    <!-- modal content end -->
  `;
};

loadData();