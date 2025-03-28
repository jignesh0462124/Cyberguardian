import React, { useState } from 'react';
import './styles.css';

interface AnalysisResult {
  toxicityScore: number;
  flagged: boolean;
  recommendation: string;
  explanation: string;
}

function App() {
  const [content, setContent] = useState('');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: content })
      });
      const result = await response.json();
      setAnalysisResult(result);
    } catch (error) {
      console.error('Analysis failed', error);
    }
  };

  return (
    <div className="container">
      <h1>🛡 CyberGuardian Content Moderation</h1>
      <form onSubmit={handleSubmit} className="form">
        <textarea 
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter text for moderation analysis"
          className="textarea"
        />
        <button type="submit" className="button">Analyze Content</button>
      </form>
      {analysisResult && (
        <div className="result-container">
          <h2>Analysis Result</h2>
          <p>Toxicity Score: {analysisResult.toxicityScore}/10</p>
          <p>Recommendation: {analysisResult.recommendation}</p>
          {analysisResult.flagged && (
            <div className="warning-box">
              <strong>⚠ Content Flagged</strong>
              <p>{analysisResult.explanation}</p>
              <button 
                onClick={() => window.open('/report', '_blank')}
                className="report-button"
              >
                Report to Cyber Cell
              </button>
            </div>
          )}
        </div>
      )}
      <footer className="footer">
        <a 
          href="https://github.com/yourusername/cyberguardian"
          target="_blank"
          rel="noopener noreferrer"
        >
          View Source
        </a>
      </footer>
    </div>
  );
}

export default App; 