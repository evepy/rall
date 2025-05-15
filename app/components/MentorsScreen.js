import React, { useState } from 'react';
import { Card, Button, Icon } from 'neobrutalism';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from 'neobrutalism';
import './MentorsScreen.css';

// Dummy data for mentors
const mentors = [
  {
    id: 1,
    username: 'UserK_651651',
    tags: ['Full-Stack', 'UI Design', 'Preparation...'],
    bio: "I'm Sofia, a passionate digital marketer with over a decade of experience driving growth in the exciting world of technology and startups. My specialty lies in unlocking the secrets of SEO, creating content that connects and designing marketing strategies that really make a difference.",
    rating: 4.5,
    image: '/images/mentor1.png',
  },
  // ... add more mentors
];

const MentorsScreen = ({ onNavigate }) => {
  const [index, setIndex] = useState(0);
  const mentor = mentors[index];

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + mentors.length) % mentors.length);
  };

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % mentors.length);
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
              Mentors available
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
            <img src={mentor.image} alt={mentor.username} className="card-image" />
            <div className="card-rating">{mentor.rating.toFixed(1)}</div>
          </div>
          <div className="card-body">
            <p className="card-username">@{mentor.username}</p>
            <div className="card-tags">
              {mentor.tags.map((tag) => (
                <Button key={tag} size="xs" variant={mentor.tags.includes(tag) ? 'primary' : 'outline'} className="tag-button">
                  {tag}
                </Button>
              ))}
            </div>
            <p className="card-bio">{mentor.bio}</p>
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

export default MentorsScreen; 