function buildPayload(data: any) {
  const categories = Object.keys(data.currentByCategory).map((cat) => {
    const current = data.currentByCategory[cat];
    const last = data.lastByCategory[cat] || 0;

    return {
      category: cat,
      current,
      last,
      isNew: last === 0,
      changePercent: last === 0 ? null : ((current - last) / last) * 100,
    };
  });

  return {
    total: {
      current: data.currentTotal,
      last: data.lastTotal,
      changePercent:
        data.lastTotal === 0
          ? null
          : ((data.currentTotal - data.lastTotal) / data.lastTotal) * 100,
    },
    categories,
  };
}

export async function generateAIInsights(data: any) {
  const payload = buildPayload(data);

  const insights = [];

  if (payload.total.changePercent) {
    insights.push(
      `Total spending increased by ${payload.total.changePercent.toFixed(1)}%`,
    );
  }

  payload.categories.forEach((cat) => {
    if (cat.isNew) {
      insights.push(`${cat.category} is a new category with ₹${cat.current}`);
    }
  });

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "meta-llama/llama-3-8b-instruct",
      messages: [
        {
          role: "system",
          content: `You are a financial analyst.

                                STRICT RULES:
                                - Use ONLY the provided data
                                - Do NOT assume or invent any values
                                - If last = 0 → say "new category", NOT percentage increase
                                - If changePercent is null → do NOT mention percentage
                                - Do NOT mention loans, debts, or investments
                                - All amounts must be in ₹

                                Return:
                                - Exactly 3 bullet points
                                - Include real numbers from data
                                - Highlight biggest increase correctly
                                - Give 1 realistic suggestion ONLY based on categories

                                Rewrite these financial insights in a clean, professional way:
                ${insights.join("\n")}
                 `,
        },
        {
          role: "user",
          content: insights.join("\n"),
        },
      ],
    }),
  });

  const json = await res.json();
  return json.choices?.[0]?.message?.content || "No insights generated";
}
