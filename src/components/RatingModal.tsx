
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Star } from "lucide-react";

interface Store {
  id: number;
  name: string;
  address?: string;
  rating: number;
}

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  store: Store | null;
  onSave: (storeId: number, rating: number) => void;
  initialRating?: number;
}

export const RatingModal: React.FC<RatingModalProps> = ({
  isOpen,
  onClose,
  store,
  onSave,
  initialRating,
}) => {
  const [rating, setRating] = useState<number>(initialRating || 0);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);

  useEffect(() => {
    if (initialRating) {
      setRating(initialRating);
    } else {
      setRating(0);
    }
  }, [initialRating, isOpen]);

  const handleSave = () => {
    if (store && rating > 0) {
      onSave(store.id, rating);
    }
  };

  const handleStarClick = (value: number) => {
    setRating(value);
  };

  const handleStarHover = (value: number) => {
    setHoveredRating(value);
  };

  const handleMouseLeave = () => {
    setHoveredRating(null);
  };

  if (!store) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Rate {store.name}</DialogTitle>
        </DialogHeader>
        <div className="py-6">
          <div className="text-center mb-4">
            <p className="text-sm text-muted-foreground mb-2">
              How would you rate your experience?
            </p>
            <div
              className="flex justify-center gap-2"
              onMouseLeave={handleMouseLeave}
            >
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => handleStarClick(value)}
                  onMouseEnter={() => handleStarHover(value)}
                  className="focus:outline-none transition-transform hover:scale-110"
                >
                  <Star
                    size={32}
                    className={`${
                      (hoveredRating !== null
                        ? value <= hoveredRating
                        : value <= rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    } transition-colors`}
                  />
                </button>
              ))}
            </div>
            <p className="mt-2 font-medium">
              {rating === 0
                ? "Select a rating"
                : `You rated: ${rating} ${rating === 1 ? "star" : "stars"}`}
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="button" onClick={handleSave} disabled={rating === 0}>
            Submit Rating
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
