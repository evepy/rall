import React from 'react';
import ScrollingText from './ScrollingText';
import './RoleSelectionScreen.css'; // Assuming you'll add styles later

const RoleSelectionScreen = ({ onRoleSelect }) => {
  const handleRoleSelect = (role) => {
    console.log(`${role} selected`);
    // Use the onRoleSelect prop to navigate
    onRoleSelect(role === 'Mentor' ? 'mentor' : 'apprentice');
  };

  return (
    <div className="role-selection-screen-container">
      {/* Placeholder for Mentor section */}
      <div className="mentor-section" onClick={() => handleRoleSelect('Mentor')}>
        {/* <img src="..." alt="Mentor" /> */}
        <h2>MENTOR</h2>
        <p>
          The mentor is a beacon of knowledge and
          experience, willing to share his or her wisdom
          to illuminate the path of the mentee.
        </p>
      </div>

      {/* Separator or text like -OR- */}
      <div className="separator">
        -OR-
      </div>

      {/* Placeholder for Apprentice section */}
      <div className="apprentice-section" onClick={() => handleRoleSelect('Apprentice')}>
        {/* <img src="..." alt="Apprentice" /> */}
        <h2>APPRENTICE</h2>
        <p>
          The apprentice is the engine of his or her own
          learning, driven by curiosity and the desire to
          grow.
        </p>
      </div>

       {/* Additional text box */}
      <div className="additional-text-box">
        <p>
          Share your experience, ignite the spark of
          knowledge.
          Your guide is a beacon on their learning path.
          Inspire the future, leave an indelible mark.
        </p>
      </div>

      {/* Bottom scrolling text */}
      <ScrollingText text="VER. ALPHA " direction="left" />
    </div>
  );
};

export default RoleSelectionScreen; 