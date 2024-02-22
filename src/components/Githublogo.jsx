// GitHubLogo.js

import React from 'react';
import Images from '../images';

const GitHubLogo = ({ githubId }) => {
  return (
    <div className="github-logo">
      <img
        src="images/github.svg" // Replace with the correct path to your SVG file
        alt="GitHub Logo"
        className="logo-image"
      />
      <p className="github-id">{`https://github.com/SyedHuzaifaNazim`}</p>
    </div>
  );
};

export default GitHubLogo;
