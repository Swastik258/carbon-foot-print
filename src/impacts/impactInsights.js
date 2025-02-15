// export default async function handler(req, res) {
//     if (req.method !== "POST") {
//       return res.status(405).json({ message: "Method not allowed" });
//     }
  
//     const { impactData } = req.body;
  
//     const response = await fetch("https://api.deepseek.com/generate", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${process.env.DEEPSEEK_API_KEY}`
//       },
//       body: JSON.stringify({
//         model: "deepseek-chat",
//         messages: [{ role: "user", content: `Analyze this sustainability data and generate insights: ${JSON.stringify(impactData)}` }],
//       }),
//     });
  
//     const data = await response.json();
//     res.status(200).json({ insight: data.choices[0].message.content });
//   }
  