"use client";

import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { createPublicClient, http, getAddress } from "viem";
import { baseSepolia } from "viem/chains";
import { contractMentorship, contractMentorshipAbi } from "@/contracts/mentorship";
// Helper function to shorten address
const shortenAddress = (address: string | undefined) => {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

const ReviewsPage = () => {
  const { address } = useAccount();
  const [reviews, setReviews] = useState<any[]>([]); // TODO: Define a proper type for reviews
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!address) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      setReviews([]);

      const publicClient = createPublicClient({
        chain: baseSepolia, // Assuming Base Sepolia, adjust if needed
        transport: http(),
      });

      try {
        // Fetch reviews where the author is a Mentor (Role 0)
        const mentorReviews = await (publicClient.readContract as any)({
          address: contractMentorship,
          abi: contractMentorshipAbi,
          functionName: "getReviewsOf",
          args: [getAddress(address), 0], // 0 for Role.Mentor
        }) as any[];

        // Fetch reviews where the author is a Mentee (Role 1)
        const menteeReviews = await (publicClient.readContract as any)({
          address: contractMentorship,
          abi: contractMentorshipAbi,
          functionName: "getReviewsOf",
          args: [getAddress(address), 1], // 1 for Role.Mentee
        }) as any[];

        // Combine and set reviews
        setReviews([...mentorReviews, ...menteeReviews]);
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setError("Failed to fetch reviews.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [address]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Reviews</h1>
      {!address && <p>Please connect your wallet to see reviews.</p>}
      {loading && <p>Loading reviews...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {address && !loading && reviews.length === 0 && <p>No tienes reseñas</p>}
      {address && !loading && reviews.length > 0 && (
        <div className="space-y-4">
          {reviews.map((review, index) => (
            <div key={index} className="border rounded-lg p-4">
              <p className="text-gray-700 mb-2">{review.comment}</p>
              <p className="text-sm text-gray-500">
                - {shortenAddress(review.from)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewsPage; 