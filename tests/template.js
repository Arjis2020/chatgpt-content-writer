// /**
//  * 
//  * @param {string} string 
//  * @returns 
//  */

import { extractTemplateVars } from "../utils/extractTemplateVars.js";

// const template = (string) => {
//     return string
// }

// const res = template`
//     Hello, there!
// `

// console.log(res)

const res = extractTemplateVars("top 25 best food delivery companies in usa in 2023")
console.log(res)