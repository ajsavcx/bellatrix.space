import datetime
from datetime import timezone, timedelta
import numpy as np
from typing import List, Dict
from pydantic import BaseModel

class RiskTrendPoint(BaseModel):
    timestamp: str
    risk_score: float

class SatelliteAnalytics(BaseModel):
    norad_id: str
    trend_data: List[RiskTrendPoint]
    forecast_summary: str
    avg_altitude: float
    stability_index: float
    # New Detailed Fields
    conjunction_risk: str
    next_pass_window: str
    orbital_decay: float # mm/year
    solar_activity_impact: str
    maneuver_suggestion: str

def generate_risk_trend(norad_id: str, days: int = 7) -> SatelliteAnalytics:
    """
    Generates a mock/heuristic risk trend for a satellite over the specified number of days.
    In a real app, this would pull from historical database logs of position/conjunctions.
    """
    now = datetime.datetime.now(timezone.utc)
    trend = []
    
    # Base risk factor derived from ID for consistency
    seed = int(norad_id) % 100
    np.random.seed(seed)
    
    base_risk = np.random.uniform(10, 50)
    
    for i in range(days):
        dt = now - timedelta(days=(days - 1 - i))
        # Add some "volatility" to the risk
        daily_variation = np.random.normal(0, 5)
        score = max(0, min(100, base_risk + daily_variation + (i * 0.5))) # Gradual increase simulation
        
        trend.append(RiskTrendPoint(
            timestamp=dt.strftime("%Y-%m-%d"),
            risk_score=round(score, 2)
        ))
    
    # Calculate dummy stability index
    stability = 100 - (np.std([p.risk_score for p in trend]) * 5)
    
    # Detailed Metadata
    conjunctions = ["Minimal", "Elevated", "Nominal", "Potential Warning"]
    solar_impacts = ["Low - Ionospheric Stability", "Moderate - Atmospheric Drag", "High - Geomagnetic Storm"]
    maneuvers = ["Hold Station", "Prograde Boost Recommended", "Inclination Adjustment", "None Required"]

    return SatelliteAnalytics(
        norad_id=norad_id,
        trend_data=trend,
        forecast_summary="The orbital path remains stable with a slight upward trend in local debris density.",
        avg_altitude=round(np.random.uniform(400, 800), 1), # Placeholder
        stability_index=round(max(0, stability), 2),
        conjunction_risk=conjunctions[seed % len(conjunctions)],
        next_pass_window=f"T+{np.random.randint(5, 120)}m",
        orbital_decay=round(np.random.uniform(0.1, 2.5), 2),
        solar_activity_impact=solar_impacts[seed % len(solar_impacts)],
        maneuver_suggestion=maneuvers[seed % len(maneuvers)]
    )

def get_global_stats() -> Dict:
    """
    Returns aggregate statistics for all tracked satellites.
    """
    return {
        "total_tracked": 27432,
        "high_risk_count": 142,
        "conjunctions_24h": 854,
        "system_health": "Optimal",
        "last_update": datetime.datetime.now(timezone.utc).isoformat()
    }
