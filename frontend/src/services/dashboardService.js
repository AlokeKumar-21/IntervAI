import { getInterviewHistory } from "./interviewService";

export const fetchDashboardData = async (profile) => {
  const history = await getInterviewHistory();

  const interviews = history.interviews || [];

  const bestScore =
    interviews.length > 0
      ? Math.max(
          ...interviews.map(
            (item) => item.overallFeedback?.overallScore || 0
          )
        )
      : 0;

  return {
    interviewsTaken: interviews.length,
    bestScore,
    latestInterview: interviews[0] || null,
    profile,
  };
};