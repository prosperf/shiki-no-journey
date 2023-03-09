export const scrambleArray = (array: Array<any>) => {
  const positions: any[] = [...array];
  const randomized_positions: any[] = [];
  for (let i = 0; i < array.length; i++) {
    let test_val = Math.random();
    if (test_val < 0.4) {
      randomized_positions.push(...positions.splice(0, 1));
    } else if (test_val < 0.65) {
      randomized_positions.push(...positions.splice(1, 1));
    } else if (test_val < 0.85) {
      randomized_positions.push(...positions.splice(2, 1));
    } else if (test_val < 0.95) {
      randomized_positions.push(...positions.splice(3, 1));
    } else {
      randomized_positions.push(...positions.splice(4, 1));
    }
  }

  return randomized_positions;
};

export const gridGenerator = (
  x: number,
  y: number,
  origin: "left" | "top" | "corner"
) => {
  let positions = [];
  if (origin === "left" || origin === "top") {
    for (let i = 0; i < (origin === "left" ? x : y); i++) {
      for (let j = 0; j < (origin === "left" ? y : x); j++) {
        positions.push({
          x: origin === "left" ? i : j,
          y: origin === "left" ? j : i,
        });
      }
    }
    return scrambleArray(positions);
  }

  for (let i = 0; i < Math.min(x, y); i++) {
    let x_poses = [];
    let y_poses = [];
    for (let j = 0; j < i * 2 + 1; j++) {
      x_poses.push(i);
      y_poses.push(i);
    }

    for (let j = 0; j < i; j++) {
      x_poses[x_poses.length - 1 - j] -= i - j;
      y_poses[j] -= i - j;
    }

    for (let j = 0; j < i * 2 + 1; j++) {
      positions.push({ x: x_poses[j], y: y_poses[j] });
    }
  }

  const lesser = x < y ? x : y;
  const greater = x > y ? x : y;

  if (greater !== lesser) {
    if (greater === x) {
      for (let i = lesser; i < x; i++) {
        for (let j = 0; j < y; j++) {
          positions.push({ x: i, y: j });
        }
      }
    } else {
      for (let i = lesser; i < y; i++) {
        for (let j = 0; j < x; j++) {
          positions.push({ x: j, y: i });
        }
      }
    }
  }

  return scrambleArray(positions);
};
