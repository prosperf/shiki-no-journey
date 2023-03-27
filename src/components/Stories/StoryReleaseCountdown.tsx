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
    <StoryContainer>
      {Math.floor(timeLeft / (3600 * 24))}:{Math.floor(timeLeft / 3600) % 24}:
      {Math.floor(timeLeft / 60) % 60}:{timeLeft % 60}
    </StoryContainer>
  );
};
