const calculateRisk = (asteroid) => {
  let riskScore = 0;

  const diameter =
    asteroid.estimated_diameter.meters.estimated_diameter_max;

  const velocity = parseFloat(
    asteroid.close_approach_data[0].relative_velocity.kilometers_per_hour
  );

  const missDistance = parseFloat(
    asteroid.close_approach_data[0].miss_distance.kilometers
  );

  if (diameter > 140) riskScore += 50;
  if (velocity > 25000) riskScore += 30;
  if (missDistance < 5000000) riskScore += 40;

  let riskLevel = "Low";
  if (riskScore > 70) riskLevel = "High";
  else if (riskScore > 30) riskLevel = "Medium";

  return {
    name: asteroid.name,
    diameter: Math.round(diameter),
    velocity: Math.round(velocity),
    missDistance: Math.round(missDistance),
    riskScore,
    riskLevel
  };
};

module.exports = { calculateRisk };
