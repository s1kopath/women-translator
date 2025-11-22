export async function interpretText(text: string): Promise<string> {
  try {
    // Using Hugging Face Inference Providers with OpenAI-compatible chat completions endpoint
    // The proxy in vite.config.ts handles authentication server-side
    // You can use different models like: deepseek-ai/DeepSeek-R1, meta-llama/Llama-3.2-3B-Instruct, etc.
    // Provider selection: :fastest (highest throughput), :cheapest (lowest cost), or :provider-name
    const response = await fetch("/api/hf/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "meta-llama/Llama-3.2-3B-Instruct:fastest", // Using fastest provider selection
        messages: [
          {
            role: "system",
            content:
              'You are a humorous AI that interprets what women say and reveals the "hidden meaning" in a playful, lighthearted way. Be funny, witty, and entertaining, but never mean-spirited or offensive. Keep responses brief and punchy (under 100 words).',
          },
          {
            role: "user",
            content: `What she said: "${text}"\n\nWhat she really means:`,
          },
        ],
        max_tokens: 150,
        temperature: 0.8,
        top_p: 0.9,
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("API request failed:", response.status, errorData);
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();

    if (data && data.choices && data.choices[0] && data.choices[0].message) {
      const interpretation = data.choices[0].message.content.trim();
      return interpretation || getFallbackInterpretation(text);
    }

    return getFallbackInterpretation(text);
  } catch (error) {
    console.error("Error interpreting text:", error);
    return getFallbackInterpretation(text);
  }
}

function getFallbackInterpretation(text: string): string {
  const lowerText = text.toLowerCase();

  const interpretations: { [key: string]: string } = {
    "i'm fine":
      "I'm definitely NOT fine. You should know what you did wrong without me having to explain it.",
    "it's fine":
      "It's absolutely not fine, and you're going to hear about this for the next three months.",
    "do whatever you want":
      "Do NOT do whatever you want. This is a test, and you're currently failing.",
    "we need to talk":
      "Buckle up. You've done something, and we're about to have a serious conversation about it.",
    "nothing's wrong": "Everything is wrong. Start guessing.",
    sure: "This is the most passive-aggressive 'yes' you'll ever hear. I'm keeping score.",
    "i'm not mad":
      "I'm furious, but I want to see if you're smart enough to figure out why.",
    "go ahead": "If you do this, you'll regret it. This is your final warning.",
    "you're right": "You're wrong, but I'm tired of arguing about it.",
    "i'll be ready in 5 minutes":
      "I haven't even started getting ready yet. You have at least 30 minutes.",
  };

  for (const [phrase, meaning] of Object.entries(interpretations)) {
    if (lowerText.includes(phrase)) {
      return meaning;
    }
  }

  if (lowerText.includes("hungry")) {
    return "I'm starving, but I'll reject every restaurant suggestion you make for the next 20 minutes.";
  }

  if (lowerText.includes("tired")) {
    return "I need attention and cuddles, but I'm going to pretend I just want to sleep.";
  }

  if (lowerText.includes("okay") || lowerText.includes("ok")) {
    return "Things are definitely not okay, but I'm giving you one more chance to figure it out yourself.";
  }

  if (lowerText.includes("don't worry")) {
    return "You should absolutely worry. I'm already worried and slightly annoyed that you're not.";
  }

  return "She's definitely thinking about something deeper than what she just said. Proceed with caution and bring chocolate.";
}
