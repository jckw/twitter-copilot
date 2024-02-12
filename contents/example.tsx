import type { PlasmoCSConfig } from "plasmo"

const Example = () => {
  return <button>Hello world</button>
}

export default Example

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"]
}
