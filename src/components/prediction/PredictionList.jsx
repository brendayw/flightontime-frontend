import PredictionCard from "./PredictionCard";
import PredictionResults from "./PredictionResults";

function PredictionList({ predictions }) {
  return (
    <section className='flex flex-col gap-4'>
      <PredictionResults />

      {/* {predictions.map((p, index) => ( */}
        <PredictionCard  />
      {/* ))} */}
    </section>
  );
}

export default PredictionList;