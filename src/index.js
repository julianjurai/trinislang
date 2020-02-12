import Fuse from "fuse.js";
import dictionary from "./dictionary";

var fuse = new Fuse(dictionary, {
  keys: ["slang", "definition"],
  shouldSort: true
});

const searcResults = document.getElementById("search-results");

document.getElementById("search-input").onkeyup = function(e) {
  console.log("searching", e.target.value);
  const results = fuse.search(e.target.value);
  console.log("fuse.search(e.target.value)", fuse.search(e.target.value));
  searcResults.innerHTML = results
    .slice(0, 20)
    .map(({ slang, definition }) => `<div>${slang + ": " + definition}</div>`);
};

class TriniLingo {
  constructor() {
    this.searchInput = document.getElementById("search-input");
    this.searcResults = document.getElementById("search-results");
    this.selectedWordContainer = document.getElementById("selected-word");

    this.fuseInstance = new Fuse(dictionary, {
      keys: ["slang", "definition"],
      shouldSort: true
    });

    this.search.bind(this);
    this.setSelectedWord.bind(this);
    this.setSelectedWord(null);
  }

  search(searchStr) {
    const results = this.fuseInstance.search(searchStr).slice(0, 11);

    this.searcResults.innerHTML = results.map(
      ({ slang, definition }) => `<i>${slang + ": " + definition}</i>`
    );
  }

  setSelectedWord(dictionaryOption = null) {
    const random = !dictionaryOption;
    const randIndex = Math.floor(Math.random() * dictionary.length);
    const selectedOption = random ? dictionary[randIndex] : dictionaryOption;
    this.selectedWordContainer.innerHTML = `
      <h1>${selectedOption.slang}s</h1>
      <div>${selectedOption.definition}</div>
    `;
  }
}

new TriniLingo();
