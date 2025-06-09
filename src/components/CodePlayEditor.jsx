// src/components/CodePlayEditor.jsx
import React from 'react';
import { dracula } from '@uiw/codemirror-theme-dracula';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { javascript } from '@codemirror/lang-javascript';
import { css } from '@codemirror/lang-css';
import { html } from '@codemirror/lang-html';
import { cpp } from '@codemirror/lang-cpp';
import '../styles/CodePlayEditor.css';

export default function CodePlayEditor({ code, setCode, output, language, hideTerminal }) {
  const getExtension = () => {
    switch (language) {
      case 'python':
        return python();
      case 'javascript':
        return javascript();
      case 'css':
        return css();
      case 'html':
        return html();
      case 'cpp':
        return cpp();
      default:
        return [];
    }
  };

  return (
    <div className="editor-card">
      <CodeMirror
        value={code}
        height="200px"
        theme={dracula}
        extensions={[getExtension()]}
        onChange={(value) => setCode(value)}
      />

      {!hideTerminal && (
        <div className="wrap">
          <div className="terminal">
            <div className="head">
              <p className="title">
                <svg width="16" height="16" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none">
                  <path d="M7 15L10 12L7 9M13 15H17" />
                  <path d="M7.8 21H16.2C18 21 21 18 21 16.2V7.8C21 6 18 3 16.2 3H7.8C6 3 3 6 3 7.8V16.2C3 18 6 21 7.8 21Z" />
                </svg>
                Terminal
              </p>
            </div>
            <div className="body">
              <pre className="pre">
                <code>-</code>
                <code>{output || 'Нет вывода'}</code>
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
