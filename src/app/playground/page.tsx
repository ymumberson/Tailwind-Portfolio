import Card from "../components/Card";

export default function Playground() {
    return (
      <div className="sm:px-16 xl:px-48">
        <h1 className="text-center mb-4 text-3xl font-extrabold tracking-light leading-none text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
          Playground
        </h1>
        <p className="mx-auto mb-8 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 max-w-lg">
          These are small coding experiements to learn something new, with a focus on being interactive.
        </p>
        <div className="flex flex-col items-center gap-2">
            <Card title="Rapier" href="/playground/rapier" hrefText="See project" description="Testing out the Rapier physics engine." topics={['Typescript', 'React', 'Rapier', 'Physics', 'ReactThreeFiber']}/>
            <Card title="Wordle" href="/playground/wordle" hrefText="See project" description="Making a simple clone of Wordle." topics={['Typescript', 'React']}/>
            <Card title="React Three Fiber Demo" href="/playground/react-three-fiber" hrefText="See project" description="A short demo of React Three Fiber." topics={['Typescript', 'React', 'ReactThreeFiber']}/>
            <Card title="MongoDB Example" href="/playground/mongo-db-example" hrefText="See project" description="A simple example of using MongoDB Atlas." topics={['Typescript', 'React', 'MongoDB']}/>
            <Card title="Weather" href="/playground/weather" hrefText="See project" description="Fetching current weather data from https://openweathermap.org/ and displaying it." topics={['Typescript', 'React', 'REST API']}/>
            <Card title="Digit Classification" href="/playground/digit-classification" hrefText="See project" description="Attempting to classify hand-drawn digits by using a Neural Network trained on the MNIST hand-drawn digits dataset. Digits can be from 0 to 9, however, the model will always predict one of these values. This is the reason that even the empty canvas predicts to a digit." topics={['Typescript', 'React', 'Machine Learning', 'TensorflowJS', 'MNIST', 'Classification']}/>
            <Card title="Tic-Tac-Toe" href="/playground/tic-tac-toe" hrefText="See project" description="Following the Tic-Tac-Toe tutorial from https://react.dev/learn/tutorial-tic-tac-toe" topics={['Typescript', 'React', 'Bot']}/>
        </div>
      </div>
    );
}