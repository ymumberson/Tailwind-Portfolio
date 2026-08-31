# Personal Portfolio

My personal portfolio and a small playground for experimenting with web technologies.

The site brings together my experience and larger projects alongside a collection of smaller interactive experiments. The playground is where I try out ideas and technologies that I find interesting, particularly around graphics, simulation, game development, data visualisation, and machine learning.

**Live site:** [ymumberson.com](https://www.ymumberson.com)

![Portfolio homepage](./public/screenshots/RapierDemo.gif)

## About

I built this site as both a portfolio and an ongoing development project. Rather than being a purely static portfolio, it includes a collection of interactive demos that give me a place to experiment with different technologies and approaches.

The main portfolio includes:

* An overview of my background and technical interests
* Professional and academic experience
* Larger projects and university work
* A playground containing smaller experiments and prototypes

The project is something I expect to keep evolving as I learn and build new things.

## Playground

The playground currently contains several small projects and experiments:

| Project                    | Description                                                                                                                                                                                |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Rapier Physics**         | An interactive physics simulation using Rapier and React Three Fiber. Objects can be spawned and interacted with in a 3D scene, with controls for object count, spawn rate, and debugging. |
| **Wordle**                 | A small recreation of Wordle, including local word validation and definitions for completed games.                                                                                         |
| **React Three Fiber Demo** | A 3D scene demonstrating GLB model loading and interactive camera controls. The model was created in Blender.                                                                              |
| **MongoDB Example**        | A small full-stack example demonstrating how a Next.js application can retrieve data from MongoDB Atlas.                                                                                   |
| **Weather**                | A small application that retrieves current weather data from the OpenWeather API.                                                                                                          |
| **Digit Classification**   | An interactive neural network experiment using the MNIST dataset to classify hand-drawn digits.                                                                                            |
| **Tic-Tac-Toe**            | A React implementation of Tic-Tac-Toe with a computer-controlled opponent.                                                                                                                 |

The playground is deliberately varied. Some projects are practical examples, while others are experiments for understanding how a particular technology works.

## Tech Stack

* **Next.js** and **React** for the application
* **TypeScript** for application code
* **Tailwind CSS** for styling
* **Three.js** and **React Three Fiber** for 3D graphics
* **Rapier** for physics simulation
* **TensorFlow.js** for the browser-based machine learning experiment
* **MongoDB** for the database example
* **Recharts** and **react-calendar-heatmap** for data visualisation
* **Jest** for unit testing
* **Playwright** for end-to-end testing

## Project Structure

```text
.
├── __tests__/          # Unit tests
├── e2e/                # End-to-end tests
├── public/             # Static assets
├── src/
│   ├── app/            # Next.js application and routes
│   │   ├── api/
│   │   ├── components/
│   │   ├── playground/
│   │   ├── projects/
│   │   └── sections/
│   ├── content/        # Portfolio and playground content
│   └── lib/            # Shared utilities and integrations
├── next.config.ts
├── tailwind.config.ts
├── playwright.config.ts
└── package.json
```

Portfolio content is kept separately from much of the application code, with JSON files used for the homepage, projects, and playground content.

## Running Locally

### Prerequisites

* Node.js
* npm

### Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/ymumberson/Personal-Portfolio.git
cd Personal-Portfolio
npm install
```

Start the development server:

```bash
npm run dev
```

The site will then be available at:

```text
http://localhost:3000
```

### Other commands

```bash
npm run build      # Create a production build
npm run start      # Start the production server
npm run lint       # Run ESLint
npm test           # Run the Jest test suite
npm run test:ci    # Run Jest in CI mode
```

## Development

Most of the portfolio content is separated into `src/content`, making it possible to update things such as the homepage, projects, and playground descriptions without having to change the components that render them.

The main application is organised into reusable sections and routes under `src/app`.

## Testing

The repository contains both unit tests and end-to-end testing infrastructure.

* **Jest** is used for unit tests.
* **Playwright** is used for end-to-end tests.

Run the unit tests with:

```bash
npm test
```

## Deployment

The portfolio is deployed using Vercel.

The live version is available at:

**[ymumberson.com](https://www.ymumberson.com)**

## Why I Built It

This project started as a way of building my own portfolio, but I wanted it to be more than a collection of static pages. I wanted interactive projects that I could show people on my phone when they ask **So what do you actually do for a living?**

I enjoy working on projects where there is something technical to explore, particularly graphics, simulation, visualisation, and interactive software. The playground gives me somewhere to experiment with those ideas in the browser and keep the results in one place.

As a result, the project is a mix of portfolio, experimentation, and ongoing learning rather than a finished product.
