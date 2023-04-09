import { useEffect, useRef, useState } from "react";

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => {
      setMatches(media.matches);
    };
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
}

export const useIsSm = () => useMediaQuery("(min-width: 640px)");
export const useIsMd = () => useMediaQuery("(min-width: 768px)");
export const useIsLg = () => useMediaQuery("(min-width: 1024px)");
export const useIsXl = () => useMediaQuery("(min-width: 1280px)");
export const useIs2xl = () => useMediaQuery("(min-width: 1536px)");

export type PullRequest = {
  title: string;
  date: string;
};

const useClosedPullRequests: (
  owner: string,
  repo: string
) => [PullRequest[], boolean] = (owner: string, repo: string) => {
  const [pullRequests, setPullRequests] = useState<PullRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchClosedPullRequests = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/repos/${owner}/${repo}/pulls?state=closed`
        );
        const data = await response.json();
        const titles = data.map((pr: any) => ({
          title: pr.title,
          date: pr.closed_at,
        }));
        setPullRequests(titles);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchClosedPullRequests();

    // Periodically fetch closed pull requests every 10 minutes
    const intervalId = setInterval(() => {
      fetchClosedPullRequests();
    }, 600000);

    // Clear interval on unmount
    return () => clearInterval(intervalId);
  }, [owner, repo]);

  return [pullRequests, loading];
};

export default useClosedPullRequests;
