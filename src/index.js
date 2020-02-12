import Fuse from "fuse.js";
import dictionary from "./dictionary";

class TriniLingo {
  constructor() {
    this.searchInput = document.getElementById("search-input");
    this.searcResults = document.getElementById("search-results");
    this.selectedWordContainer = document.getElementById("selected-word");
    this.searcResults.classList.add("no-content");
    this.cachedSelectedWordOption =
      dictionary[Math.floor(Math.random() * dictionary.length)];
    this.fuseInstance = new Fuse(dictionary, {
      keys: ["slang", "definitions"],
      shouldSort: true
    });

    this.searchInput.onkeyup = this.search.bind(this);

    this.setSelectedWord.bind(this);
    this.selectResult.bind(this);
    this.setSelectedWord(null);
    this.setPlaceholder();
  }

  search(e) {
    const results = this.fuseInstance.search(e.target.value).slice(0, 6);
    this.searcResults.innerHTML = "";

    results.map(option => {
      const div = document.createElement("div");
      div.textContent = option.slang;
      div.dataset.option = option;
      div.onclick = this.selectResult.bind(this, option);
      div.classList.add("result-item");
      this.searcResults.appendChild(div);
    });

    if (results.length > 0) {
      this.searcResults.classList.remove("no-content");
    } else {
      this.searcResults.classList.add("no-content");
    }
  }

  setPlaceholder() {
    const randIndex = Math.floor(Math.random() * dictionary.length);
    this.searchInput.placeholder = dictionary[randIndex].slang + "...";
  }

  selectResult(option) {
    this.searchInput.value = option.slang;
    this.setSelectedWord(option);
    this.searcResults.classList.add("no-content");
  }

  setSelectedWord(dictionaryOption = null) {
    const useCached = !dictionaryOption;
    const selectedOption = useCached
      ? this.cachedSelectedWordOption
      : dictionaryOption;

    useCached
      ? this.selectedWordContainer.classList.remove("selected")
      : this.selectedWordContainer.classList.add("selected");

    this.selectedWordContainer.innerHTML = `
      <h1>${selectedOption.slang}</h1>
      <div>${
        selectedOption.definitions.length > 1
          ? `<ul>${selectedOption.definitions
              .map(def => `<li class="definition">${def}</li>`)
              .join("")}</ul>`
          : selectedOption.definitions[0]
      }</div>
    `;
  }
}

new TriniLingo();
