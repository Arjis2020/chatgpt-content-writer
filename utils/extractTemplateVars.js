import { v4 as uuidV4 } from 'uuid'

/**
 * 
 * @param {string} string 
 */
export const extractTemplateVars = (string) => {
  string = string.toLowerCase().trim().replace(/\s{2,}/g,' ')
  const format = "(.+) best (.+) in (.+) in (.+)"
  const humandReadableFormat = "top 10 best {searchTerm} in {location} in {year}"
  const parsed = new RegExp(format).exec(string)
  if (!parsed || !parsed[0]) {
    throw new Error(`Please send a string with the following format: ${humandReadableFormat}`)
  }
  let criteria = `${parsed[1]} best`,
    searchTerm = parsed[2],
    location = parsed[3],
    year = parsed[4]

  return {
    id: uuidV4(),
    criteria,
    searchTerm,
    location,
    year
  }
}