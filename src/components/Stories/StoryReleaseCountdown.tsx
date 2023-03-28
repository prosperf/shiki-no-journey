import { useEffect, useState } from "react";
import { useCountdown } from "usehooks-ts";
import { StoryContainer } from "./StoryContainer";

export const StoryReleaseCountdown = ({
  secondsUntilRelease,
}: {
  secondsUntilRelease: number;
}) => {
  const [timeLeft, countDownControllers] = useCountdown({
    countStart: secondsUntilRelease,
  });

  useEffect(() => {
    countDownControllers.startCountdown();
  }, [secondsUntilRelease]);

  return (
    <div className="text-center">
      <h2>Next Release In</h2>
      <div className="flex text-center justify-center">
        <div className="mx-4">
          <p>{Math.floor(timeLeft / (3600 * 24))}</p>
          <p>Days</p>
        </div>
        <div className="mx-4">
          <p>{Math.floor(timeLeft / 3600) % 24}</p>
          <p>Hours</p>
        </div>
        <div className="mx-4">
          <p>{Math.floor(timeLeft / 60) % 60}</p>
          <p>Minutes</p>
        </div>
        <div className="mx-4">
          <p>{timeLeft % 60}</p>
          <p>Seconds</p>
        </div>
      </div>
    </div>
  );
};
