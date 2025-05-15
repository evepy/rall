import React, { useState } from 'react';
import { Card, Button, Icon } from 'neobrutalism';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from 'neobrutalism';
import './ApprenticesScreen.css';

// Dummy data for apprentices
const apprentices = [
  {
    id: 1,
    username: 'UserK_651651',
    tags: ['Full-Stack', 'UI Design', 'Preparation...'],
    bio: 'Mentoring in frontend web development (React, Tailwind CSS) to improve my skills in practical projects and get my first job as a developer.',
    rating: 4.5,
    image: '/images/apprentice1.png',
  },
  // ... add more items as needed
];

const ApprenticesScreen = ({ onNavigate }) => {
  const [index, setIndex] = useState(0);
  const apprentice = apprentices[index];

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + apprentices.length) % apprentices.length);
  };

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % apprentices.length);
  };

  return (
    <div className="screen-container">
      <header className="screen-header">
        <Button variant="ghost" size="sm" onClick={handlePrev} className="back-button">
          <Icon name="arrow-left" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="screen-title">
              <Icon name="arrow-down" />
              Apprentices seeking help
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onSelect={() => onNavigate('activity')}>Activity</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => onNavigate('mentorsMessaging')}>Mentors Messaging</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <img src="/logo.png" width={38} height={40} alt="Rall Logo" className="screen-logo" />
      </header>

      <div className="carousel">
        <Card className="profile-card">
          <div className="card-image-wrapper">
            <img src={apprentice.image} alt={apprentice.username} className="card-image" />
            <div className="card-rating">{apprentice.rating.toFixed(1)}</div>
          </div>
          <div className="card-body">
            <p className="card-username">@{apprentice.username}</p>
            <div className="card-tags">
              {apprentice.tags.map((tag) => (
                <Button key={tag} size="xs" variant={apprentice.tags.includes(tag) ? 'primary' : 'outline'} className="tag-button">
                  {tag}
                </Button>
              ))}
            </div>
            <p className="card-bio">{apprentice.bio}</p>
          </div>
        </Card>
      </div>

      <footer className="carousel-footer">
        <Button variant="ghost" size="sm" onClick={handlePrev}>
          <Icon name="arrow-left" />
        </Button>
        <Button variant="ghost" size="sm" onClick={handleNext}>
          <Icon name="arrow-right" />
        </Button>
      </footer>
    </div>
  );
};

export default ApprenticesScreen; 