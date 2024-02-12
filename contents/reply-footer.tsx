import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from "plasmo"

import { sendToBackgroundViaRelay } from "@plasmohq/messaging"

function insertReply(text: string) {
  const textareaElement: HTMLTextAreaElement | null = document.querySelector(
    '[data-testid="tweetTextarea_0"]'
  )
  const dataTransfer: DataTransfer = new DataTransfer()
  dataTransfer.setData("text/plain", text)

  const dispatchPasteEvent = (
    element: HTMLTextAreaElement | null,
    data: DataTransfer
  ): void => {
    if (element !== null) {
      const pasteEvent: ClipboardEvent = new ClipboardEvent("paste", {
        bubbles: true,
        cancelable: true,
        clipboardData: data
      })
      element.dispatchEvent(pasteEvent)
    }
  }

  dispatchPasteEvent(textareaElement, dataTransfer)
}

function getTweetText() {
  const tweetElement: HTMLDivElement | null =
    document.querySelector('[data-testid="tweetText"]') ||
    document.querySelector('[data-testid="tweet"]')

  return tweetElement.textContent
}

function getReplyContent() {
  const promptElement: HTMLDivElement | null = document.querySelector(
    '[data-testid="tweetTextarea_0"]'
  )

  return promptElement.textContent
}

const ReplyFooter = () => {
  async function generateReply() {
    const tweet = getTweetText()
    const prompt = getReplyContent()
    const x = await sendToBackgroundViaRelay({
      name: "generateReply",
      body: {
        tweet,
        prompt
      }
    })

    insertReply(x.message)
  }

  return <button onClick={generateReply}>Generate reply</button>
}

export default ReplyFooter

// export const getInlineAnchor: PlasmoGetInlineAnchor = () =>
//   document.querySelector("[data-testid='toolBar']")

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
  world: "MAIN"
}
