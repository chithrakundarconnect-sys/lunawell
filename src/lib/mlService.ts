export async function getPeriodPrediction(
  lastPeriodDate: string,
  cycleLength: number
) {
  try {
    const response = await fetch("http://127.0.0.1:8000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lastPeriodDate,
        cycleLength,
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("ML API Error:", error);
    return null;
  }
}