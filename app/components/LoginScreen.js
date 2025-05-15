import React, { useEffect } from 'react';
import ScrollingText from './ScrollingText';
import './LoginScreen.css';
import { useAppKit } from '@reown/appkit/react';
import { useAccount } from 'wagmi';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const LoginScreen = ({ onLoginSuccess }) => {
  const { open } = useAppKit();
  const { isConnected } = useAccount();

  useEffect(() => {
    if (isConnected) {
      onLoginSuccess();
    }
  }, [isConnected, onLoginSuccess]);

  const handleJoinNow = () => {
    try {
      open(); // This will open the Reown connect modal
    } catch (error) {
      console.error('Authentication failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#E2FF5C] p-4">
      {/* Top scrolling text */}
      <ScrollingText text="We are constantly improving the user experience, look for us on github. " direction="right" />

      <Card className="w-full max-w-md mx-auto mt-8 bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all">
        <div className="p-6">
          {/* Profile section */}
          <div className="mb-6 text-center">
            <div className="w-20 h-20 mx-auto mb-2 bg-black rounded-full border-4 border-black"></div>
            <p className="text-xl font-bold">@devepy</p>
        </div>

          {/* Description box */}
          <div className="mb-8 p-4 bg-[#E2FF5C] border-4 border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-lg">
            In this space we seek to unite people who love
            to share their knowledge with those who want to
            learn and are open to receive valuable
              feedback. If you are looking to learn from those
            who have already walked the path or if you are
            passionate about guiding others in their
            development, you have found your place.
          </p>
        </div>

        {/* Join Now button */}
          <Button 
            onClick={handleJoinNow}
            className="w-full py-6 text-xl font-bold bg-black text-white border-4 border-black rounded-lg hover:bg-[#E2FF5C] hover:text-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
          >
          Join Now
          </Button>
      </div>
      </Card>

      {/* Bottom scrolling text */}
      <ScrollingText text="VER. ALPHA " direction="left" />
    </div>
  );
};

export default LoginScreen; 