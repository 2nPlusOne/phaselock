/** The proximity of a guess to the target value. */
enum GuessProximity {
  VeryClose = 5,
  Close = 15,
  Medium = 25,
  // Anything above Medium is considered Far.
}

/**
 * Calculates the score for a given guess.
 *
 * @param target The target value.
 * @param guess The guess value.
 * @returns The score for the guess.
 */
export const calculateScore = (target: number, guess: number) => {
  const difference = Math.abs(target - guess);
  if (difference <= GuessProximity.VeryClose) {
    return 4;
  } else if (difference <= GuessProximity.Close) {
    return 2;
  } else if (difference <= GuessProximity.Medium) {
    return 1;
  } else {
    return 0;
  }
};
