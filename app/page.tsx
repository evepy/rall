"use client";

import {
  useMiniKit,
  useAddFrame,
  useOpenUrl,
  useClose,
} from "@coinbase/onchainkit/minikit";
import {
  // Name,
  // Identity,
  // Address,
  // Avatar,
  // EthBalance,
} from "@coinbase/onchainkit/identity";
import { useEffect, useMemo, useState, useCallback } from "react";
import { Button } from "./components/DemoComponents";
import { Icon } from "./components/DemoComponents";
import { MainView } from './components/MainView';
import { useAccount } from "wagmi";

// Import the new Login and Role Selection screens
import LoginScreen from './components/LoginScreen';
import RoleSelectionScreen from './components/RoleSelectionScreen';
import MentorProfileScreen from './components/MentorProfileScreen';
import ApprenticeProfileScreen from './components/ApprenticeProfileScreen';
import { Card } from "@/components/ui/card";
import { MentorCard } from './components/MentorCard';
import { ApprenticeCard } from './components/ApprenticeCard';
import { ChatPreview } from './components/ChatPreview';
import { ActivityView } from './components/ActivityView';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'appkit-button': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

type Section = 'mensajeria' | 'actividad';
type UserRole = 'mentor' | 'learner';

// Mock data - replace with real data later
const MOCK_MENTORS = [
  {
    username: "@UserK_651651",
    rating: 4.5,
    expertise: ["Full-Stack", "UI Design", "Preparation"],
    bio: "I'm Sofia, a passionate digital marketer with over a decade of experience driving growth in the exciting world of technology and startups. My specialty lies in unlocking the secrets of SEO, creating content that connects and designing marketing strategies that really make a difference.",
    avatarUrl: "/path/to/avatar.jpg"
  },
  // Add more mock mentors...
];

const MOCK_APPRENTICES = [
  {
    username: "@UserK_651651",
    level: "Beginner",
    interests: ["React", "Web3", "DeFi"],
    bio: "Passionate about blockchain technology and eager to learn from experienced mentors.",
    avatarUrl: "/path/to/avatar.jpg"
  },
  // Add more mock apprentices...
];

// Mock data for chats and activity
const mockChats = [
  {
    id: '1',
    username: 'John Doe',
    walletAddress: '0x1234...5678',
    lastMessage: 'Hey, I would love to learn more about Web3 development!',
    timestamp: '10:30 AM',
    unreadCount: 2,
  },
  {
    id: '2',
    username: 'Alice Smith',
    walletAddress: '0x9876...4321',
    lastMessage: 'Thanks for the great mentoring session!',
    timestamp: '9:45 AM',
    unreadCount: 0,
  },
];

const mockActivity = {
  username: 'John Doe',
  walletAddress: '0x1234...5678',
  stats: {
    mentoring: 15,
    rating: 4.8,
    reviews: 12,
  },
  badges: [
    { id: '1', image: '/badges/mentor.png' },
    { id: '2', image: '/badges/expert.png' },
    { id: '3', image: '/badges/helpful.png' },
    { id: '4', image: '/badges/innovative.png' },
    { id: '5', image: '/badges/trusted.png' },
    { id: '6', image: '/badges/leader.png' },
  ],
  reviews: [
    {
      username: 'Alice Smith',
      walletAddress: '0x9876...4321',
      text: 'Excellent mentor! Really helped me understand Web3 development concepts.',
      date: '2 days ago',
    },
    {
      username: 'Bob Johnson',
      walletAddress: '0x5432...8765',
      text: 'Great communication and very knowledgeable about smart contracts.',
      date: '1 week ago',
    },
    {
      username: 'Carol White',
      walletAddress: '0x3456...7890',
      text: 'Patient and thorough in explaining complex blockchain concepts.',
      date: '2 weeks ago',
    },
  ],
};

const sectionLabels: Record<Section, string> = {
  mensajeria: 'Mensajería',
  actividad: 'Actividad',
};

export default function App() {
  const { address } = useAccount();
  const handleShowAddress = useCallback(() => {
    if (address) {
      alert(`Mi dirección en Base: ${address}`);
    } else {
      alert("Por favor conecta tu wallet");
    }
  }, [address]);
  const { setFrameReady, isFrameReady, context } = useMiniKit();
  const [frameAdded, setFrameAdded] = useState(false);
  const [userRole, setUserRole] = useState<UserRole | null>(null);

  // Track if profile has been configured for the user
  const [profileConfigured, setProfileConfigured] = useState(false);

  // State to track if the user has successfully logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [currentSection, setCurrentSection] = useState<Section>('mensajeria');
  const [showRoleSelection, setShowRoleSelection] = useState(true);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [showNavDropdown, setShowNavDropdown] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const addFrame = useAddFrame();
  const openUrl = useOpenUrl();
  const close = useClose();

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  useEffect(() => {
    // Check for user role in localStorage on initial load AFTER login state is determined
    if (isLoggedIn) {
        const role = localStorage.getItem('userRole') as UserRole;
        if (role) {
          setUserRole(role);
          // After role, check if profile config exists
          const key = role === 'mentor' ? 'mentorProfile' : 'apprenticeProfile';
          setProfileConfigured(!!localStorage.getItem(key));
        } else {
            // If logged in but no role, keep userRole as null to show role selection
            setUserRole(null);
        }
    }
  }, [isLoggedIn]); // Dependency on isLoggedIn

  const handleAddFrame = useCallback(async () => {
    const frameAddedResult = await addFrame();
    setFrameAdded(Boolean(frameAddedResult));
  }, [addFrame]);

  // Function to handle successful login
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowRoleSelection(true);
  };

  // Function to handle role selection
  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setShowRoleSelection(false);
    setCurrentSection('mensajeria');
  };

  // Navigation functions
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    const maxIndex = selectedRole === 'learner' ? MOCK_MENTORS.length - 1 : MOCK_APPRENTICES.length - 1;
    if (currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const saveFrameButton = useMemo(() => {
    if (context && context.client && !context.client.added) {
      return (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleAddFrame}
          className="text-[var(--app-accent)] p-4"
          icon={<Icon name="plus" size="sm" />}
        >
          Save Frame
        </Button>
      );
    }

    if (frameAdded) {
      return (
        <div className="flex items-center space-x-1 text-sm font-medium text-[#0052FF] animate-fade-out">
          <Icon name="check" size="sm" className="text-[#0052FF]" />
          <span>Saved</span>
        </div>
      );
    }

    return null;
  }, [context, frameAdded, handleAddFrame]);

  // --- Rendering Logic ---

  // If not logged in, show login screen
  if (!isLoggedIn) {
    return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
  }

  // If logged in but need to select role, show role selection
  if (showRoleSelection) {
    return <RoleSelectionScreen onRoleSelect={handleRoleSelect} />;
  }

  // If logged in and role selected, but profile not configured, show profile form
  if (isLoggedIn && userRole !== null && !profileConfigured) {
    return userRole === 'mentor'
      ? <MentorProfileScreen onSave={() => setProfileConfigured(true)} />
      : <ApprenticeProfileScreen onSave={() => setProfileConfigured(true)} />;
  }

  const currentData = selectedRole === 'learner' ? MOCK_MENTORS : MOCK_APPRENTICES;
  const sectionTitle = selectedRole === 'learner' ? 'Mentors' : 'Apprentices';

  return (
    <div className="min-h-screen bg-[#E2FF5C] p-4">
      {/* Header with dropdown navigation */}
      <div className="relative mb-8">
        <button 
          onClick={() => setShowNavDropdown(!showNavDropdown)}
          className="w-full flex items-center justify-between p-4 bg-black text-white border-4 border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        >
          <span className="text-xl font-bold">{sectionTitle} {currentSection}</span>
          <span className="text-2xl">▼</span>
        </button>

        {/* Navigation dropdown */}
        {showNavDropdown && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border-4 border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-10">
            {(['mensajeria', 'actividad'] as Section[]).map((section) => (
              <button
                key={section}
                onClick={() => {
                  setCurrentSection(section);
                  setShowNavDropdown(false);
                }}
                className={`w-full p-4 text-left hover:bg-[#E2FF5C] ${
                  currentSection === section ? 'bg-[#E2FF5C]' : ''
                }`}
              >
                {sectionLabels[section]}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Content area */}
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        {/* Current card */}
        {currentSection === 'mensajeria' && (
          <div className="space-y-4">
            {mockChats.map((chat) => (
              <ChatPreview
                key={chat.id}
                id={chat.id}
                username={chat.username}
                walletAddress={chat.walletAddress}
                lastMessage={chat.lastMessage}
                timestamp={chat.timestamp}
                unreadCount={chat.unreadCount}
              />
            ))}
          </div>
        )}
        {currentSection === 'actividad' && (
          <ActivityView {...mockActivity} />
        )}

        {/* Navigation buttons */}
        {currentSection === 'mensajeria' && (
          <div className="flex justify-center space-x-8">
            {currentIndex > 0 && (
              <button
                onClick={handlePrevious}
                className="w-16 h-16 bg-white border-4 border-black rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center text-2xl"
              >
                ←
              </button>
            )}
            {currentIndex < currentData.length - 1 && (
              <button
                onClick={handleNext}
                className="w-16 h-16 bg-white border-4 border-black rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center text-2xl"
              >
                →
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
