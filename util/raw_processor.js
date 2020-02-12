const {
  wiktionary,
  cguillaumme,
  triniinxisle,
  izaTrini
} = require("./raw_stage1");

function processString(string, { stripType, appendPeriod } = {}) {
  let str = string;
  if (stripType) str = str.replace(/\(.{1,4}\)/, "");
  str = str.trim()[0].toUpperCase() + str.trim().slice(1);
  if (appendPeriod) str = str.charAt(str.length - 1) === "." ? str : str + ".";
  return str;
}

function formatDictionary() {
  let definitions;
  let slang;
  const formattedDictionary = Object.keys(DICTIONARY).map(key => {
    slang = key;
    definitions = DICTIONARY[key];
    return { slang, definitions };
  });

  console.log(formattedDictionary);
}

const DICTIONARY = {};

function parseRawDictionary(dict, delimiter, dictName) {
  dict.forEach(string => {
    let slang;
    let defintion;
    try {
      const splitted = string.split(delimiter);

      if (splitted.length !== 2) {
        throw new Error(
          `${dictName}  Incorrect delimitter: \n${dictName} \n  ${string} \n ${splitted}`
        );
      }
      const [rawSlang, rawDefinition] = splitted;
      slang = processString(rawSlang);
      defintion = processString(rawDefinition, { appendPeriod: true });
    } catch (error) {
      throw new Error(
        `Cant processString \n${dictName} \n ${string
          .split(delimiter)
          .join("\n")}`
      );
    }
    if (DICTIONARY[slang]) {
      DICTIONARY[slang].push(defintion);
    } else {
      DICTIONARY[slang] = [defintion];
    }
  });
}

// wiktionary Processor
parseRawDictionary(wiktionary, " -", "wiktionary");
// cguillaumme Processor
parseRawDictionary(cguillaumme, " -", "cguillaumme");
// triniinxisle Processor
parseRawDictionary(triniinxisle, ":", "triniinxisle");
// izaTrini Processor
parseRawDictionary(izaTrini, "....", "izaTrini");

// console.log(JSON.stringify(DICTIONARY));
//node ./util/raw_processor.js > raw_dictionary.json

formatDictionary();
// console.log(formatDictionary());
//node ./util/raw_processor.js > util/formatted_dictionary.js
