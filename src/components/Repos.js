import React, {useContext} from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts';
const Repos = () => {
    const {githubRepos} = useContext(GithubContext);
    // console.log(githubRepos);
    let languages = githubRepos.reduce((total, item) => {
        const {languages} = item;
        if(!languages) return total;
        (!total[languages]) ? total[languages] = 1 : total[languages] = total[languages] + 1;
        console.log('hello'+languages);
        total[languages] = 30;
        return total;
    }, {})

  // STEP 2 - Chart Data
    const chartData = [
      {
        label: "Javascript",
        value: "20"
      },
      {
        label: "CSS",
        value: "13"
      },
      {
        label: "HTML",
        value: "180"
      }
    ];
  return (
    <section className="section">
        <Wrapper className="section-center">
          <Pie3D data={chartData}/>;
            {/* <ExampleChart data={chartData}/>; */}
        </Wrapper>
    </section>
  );
   
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
