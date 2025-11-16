// /pages/api/contributions.ts
import type { NextApiRequest, NextApiResponse } from "next";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

if (!GITHUB_TOKEN) {
  console.warn("GITHUB_TOKEN não está definido!");
}

const query = `
{
  user(login: "seu-usuario-github") {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            date
            contributionCount
          }
        }
      }
    }
  }
}
`;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!GITHUB_TOKEN) {
    return res.status(500).json({ message: "GitHub token not set" });
  }

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("GitHub API error:", text);
      return res.status(response.status).json({ message: text });
    }

    const data = await response.json();
    return res.status(200).json({ data });
  } catch (err: any) {
    console.error("Error fetching contributions:", err);
    return res.status(500).json({ message: err.message });
  }
}
