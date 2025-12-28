import PredictionCard from "./PredictionCard";

function PredictionList({ predictions }) {
  return (
    <section>
      <h3>Predicciones | Total {predictions.length} resultados</h3>

      {predictions.map((p, index) => (
        <PredictionCard key={index} prediction={p} />
      ))}
    </section>
  );
}

export default PredictionList;