import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

interface RatingStarsProps {
  rating: number;
}

export default function RatingStars({ rating }: RatingStarsProps) {
  const stars=[];

  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<FaStar key={i} />);
    } else if (rating >= i - 0.5) {
      stars.push(<FaStarHalfAlt key={i} />);
    } else {
      stars.push(<FaRegStar key={i} />);
    }
  }

  return (
    <div className="flex items-center gap-1 text-yellow-400">
      {stars}
      <span className="text-black ml-2">{rating}</span>
    </div>
  );
}
