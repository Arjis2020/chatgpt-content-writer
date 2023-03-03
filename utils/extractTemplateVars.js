// export const extractTemplateVars = (template, message) => {
//   let regex = /\[\!(.*?)\]/g;
//   let splitRegex = /\[\!.*?\]/g;

//   let match, matches = [];
//   // Part 1
//   while (match = regex.exec(template)) {
//     matches.push(match[1]);
//   }

//   // Part 2
//   let arr = template.split(splitRegex);
//   // Part 3
//   arr = arr.map(s =>
//     s.replaceAll("\\", "\\\\")
//       .replaceAll("(", "\\(")
//       .replaceAll(")", "\\)")
//       .replaceAll(".", "\\.")
//   );
//   // Part 4
//   let reStr = arr.join("(.*?)");
//   let re = new RegExp(reStr, "g");

//   // Part 5
//   let m = re.exec(message);
//   let [garbage, ...values] = m;

//   // Part 6
//   let output = matches.map((match, i) => ({ [match]: values[i] }));

//   return output
// };

/**
 * 
 * @param {string} string 
 */
export const extractTemplateVars = (string) => {
  string = string.toLowerCase()
  const format = "(.+) best (.+) in (.+) in (.+)"
  const humandReadableFormat = "top 10 best {searchTerm} in {location} in {year}"
  const parsed = new RegExp(format).exec(string)
  if(!parsed || !parsed[0]) {
    throw new Error(`Please send a string with the following format: ${humandReadableFormat}`)
  }
  let critera = 'top 10 best',
    searchTerm = parsed[2],
    location = parsed[3],
    year = parsed[4]

  return {
    critera,
    searchTerm,
    location,
    year
  }
}