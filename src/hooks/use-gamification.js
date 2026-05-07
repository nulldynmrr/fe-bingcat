export function useGamification(xp) {
  const calculateLevel = (currentXp) => {
    return Math.floor(currentXp / 500) + 1;
  };

  const calculateProgress = (currentXp) => {
    const nextLevelXp = calculateLevel(currentXp) * 500;
    const previousLevelXp = (calculateLevel(currentXp) - 1) * 500;
    const progress = ((currentXp - previousLevelXp) / 500) * 100;
    return progress;
  };

  return {
    level: calculateLevel(xp),
    progressPercentage: calculateProgress(xp),
    nextLevelAt: calculateLevel(xp) * 500,
  };
}
