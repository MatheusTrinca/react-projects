import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

function App() {
  const [markdown, setMarkdown] = useState('## Markdown Preview');

  return (
    <section className="markdown">
      <textarea
        className="input"
        value={markdown}
        onChange={e => setMarkdown(e.target.value)}
      />
      <article className="result">
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </article>
    </section>
  );
}

export default App;
