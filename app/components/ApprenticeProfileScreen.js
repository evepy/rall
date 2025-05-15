import React, { useState } from 'react';
import './ApprenticeProfileScreen.css';

const helpOptions = [
  'Mentoring in open source projects',
  'Mentoring for portfolio',
  'Preparation and strategy for Hackathons',
  'Code review and best practices',
  'Technology career counseling',
];
// Reuse same expertise options for simplicity
const defaultExpertise = [
  'FrontEnd',
  'BackEnd',
  'Full-Stack',
  'UI Design',
  'PM',
  'AI & Automatization',
  'RV | AR | MR',
];

const ApprenticeProfileScreen = ({ onSave }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [bio, setBio] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [newTag, setNewTag] = useState('');

  const toggleOption = (option) => {
    setSelectedOptions((prev) =>
      prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
    );
  };

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleAddTag = () => {
    const tag = newTag.trim();
    if (tag && !selectedTags.includes(tag)) {
      setSelectedTags((prev) => [...prev, tag]);
    }
    setNewTag('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSave = () => {
    const profile = { selectedOptions, bio, selectedTags };
    try {
      localStorage.setItem('apprenticeProfile', JSON.stringify(profile));
    } catch (e) {
      console.error('Failed to save apprenticeProfile', e);
    }
    onSave();
  };

  return (
    <div className="apprentice-profile-container">
      <h2 className="profile-heading">What kind of help are you looking for?</h2>
      <div className="options-container">
        {helpOptions.map((opt) => (
          <button
            key={opt}
            className={`option-button ${selectedOptions.includes(opt) ? 'selected' : ''}`}
            onClick={() => toggleOption(opt)}
          >
            {selectedOptions.includes(opt) && <span className="checkmark">✓</span>} {opt}
          </button>
        ))}
      </div>

      <h3 className="profile-subheading">Biography</h3>
      <textarea
        className="bio-textarea"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        maxLength={200}
        placeholder="Tell us about yourself (max 200 chars)"
      />
      <div className="char-count">{bio.length}/200</div>

      <h3 className="profile-subheading">What would you like to reinforce?</h3>
      <div className="tags-container">
        {defaultExpertise.map((tag) => (
          <button
            key={tag}
            className={`tag-button ${selectedTags.includes(tag) ? 'selected' : ''}`}
            onClick={() => toggleTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="new-tag-row">
        <input
          type="text"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          onKeyDown={handleKeyDown}
          className="new-tag-input"
          placeholder="Add a new"
        />
        <button className="add-tag-button" onClick={handleAddTag}>↪</button>
      </div>

      <button className="save-profile-button" onClick={handleSave}>
        Save Apprentice Profile
      </button>
    </div>
  );
};

export default ApprenticeProfileScreen; 