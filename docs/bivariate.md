# Bivariate

E.g. weight vs age or budget vs target. It has 2 numbers (weight and age) and a label (name) that we want to relate.

## Narratives

- `correlation`:
  - "weight is strongly correlated with age" if `correlation >= 0.7`
  - "weight is moderately correlated with age" if `correlation >= 0.4`
  - "weight is weakly correlated with age" if `correlation >= 0.2`
  - "weight is not correlated with age" if `-0.2 < correlation < 0.2`
  - "weight is weakly negatively correlated with age" if `-0.4 < correlation <= -0.2`
  - "weight is moderately negatively correlated with age" if `-0.7 < correlation <= -0.4`
  - "weight is strongly negatively correlated with age" if `correlation <= -0.7`
- `regression`:
  - "weight increases 1.4 with each unit increase in age" if `regression > 0` and `p_regression < 0.05`
  - "weight decreases 1.4 with each unit increase in age" if `regression < 0` and `p_regression < 0.05`
- `spatialOutliers`:
  - "3% of the data points are outliers" based on `pSpatialOutliers=0.01`
- `corners`:
  - "<name> has the highest weight and age"
  - "<name> has the lowest weight and age"
  - "<name> has the highest age and lowest weight"
  - "<name> has the lowest age and highest weight"
- `regressionOutliers`:
  - "2% of data has higher weight than expected from age. 4% has lower weight" based on `pRegressionOutliers=0.01`
- `distribution`:
  - "For the lowest 80% of age, weight ranges from 50 to 80" where `maxYDistribution = 0.80` #TODO Check if we need can be more flexible lowest
  - "A height between 130-150 and weight between 50-80 covers 65% of the population`where maxDistribution = 0.65`

<!--
- Multi-bivariate: colored scatterplot based on label
  - Compare correlation coefficients across categories. Which are the most relevant?
  - Compare regression coefficients across categories. Which are the biggest drivers?
  - Compare overlap across categories and identify which ones overlap most, which overlap least
-->

## Usage

## Model

## Source
