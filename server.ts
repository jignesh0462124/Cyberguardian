import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { OpenAI } from 'openai';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// OpenAI configuration
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// API endpoint
app.post('/analyze', async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    const completion = await openai.chat.completions.create({
      messages: [
        { 
          role: "system", 
          content: "You are a content moderation AI. Analyze the text for toxicity, hate speech, misinformation, and potential cyber threats. Provide a toxicity score from 0-10, a recommendation, and whether the content should be flagged." 
        },
        { role: "user", content: text }
      ],
      model: "gpt-4o-mini",
      max_tokens: 300
    });

    const analysis = completion.choices[0]?.message?.content || '';
    const toxicityMatch = analysis.match(/Toxicity Score: (\d+)/);
    const toxicityScore = toxicityMatch ? parseInt(toxicityMatch[1]) : 0;

    return res.json({
      toxicityScore,
      flagged: toxicityScore > 6,
      recommendation: toxicityScore > 6 ? "Block Content" : "Approve Content",
      explanation: analysis
    });
  } catch (error) {
    console.error('Error analyzing content:', error);
    res.status(500).json({ error: 'Failed to analyze content' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 