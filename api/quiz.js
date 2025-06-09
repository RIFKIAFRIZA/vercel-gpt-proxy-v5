export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  const body = await req.json();
  const prompt = body.prompt;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 300,
    }),
  });

  const result = await response.json();
  return new Response(result.choices[0].message.content, { status: 200 });
}
