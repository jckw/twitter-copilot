import OpenAI from "openai"

import type { PlasmoMessaging } from "@plasmohq/messaging"

const openai = new OpenAI({
  apiKey: process.env.PLASMO_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
})

async function generateReply(tweet: string, prompt: string) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are a ghost tweeter who is tasked to generate a reply for the user, who will provide a description of the vibe/purpose of the reply"
      },
      {
        role: "user",
        content: `Return a reply that has the vibe/purpose: "${prompt}".\nThis is the tweet: "${tweet}"`
      }
    ],
    model: "gpt-3.5-turbo"
  })

  return completion.choices[0].message.content
}

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const message = await generateReply(req.body.tweet, req.body.prompt)

  res.send({
    message
  })
}

export default handler
