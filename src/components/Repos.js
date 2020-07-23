import React, {useContext} from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts';
const Repos = () => {
    const {githubRepos} = useContext(GithubContext);
    // console.log(githubRepos);
    let languages = githubRepos.reduce((total, item) => {
        const {language, stargazers_count} = item;
        if(!language) return total;
        (!total[language]) ? total[language] = {label: language, value: 1, stars: stargazers_count} : total[language] = {...total[language], value : total[language].value + 1, stars: total[language].stars + stargazers_count};
        
        //total[language] = 30;
        return total;
    }, {})

    //console.log(languages);
    var mostUsed = Object.values(languages)
                    .sort((b,a) => {
                        return b.value - a.value;
                    })
                    .slice(0, 5);

    // most stars per language
    var mostPopular = Object.values(languages)
                        .sort((b,a) => {
                            return b.stars - a.stars
                        })
                        .map((item) => {
                            return {...item, value: item.stars}
                        }).slice(0, 5)
      
                        //console.log(mostPopular)
    
    // stars, forks
    let { stars, forks } = githubRepos.reduce((total, item) => {
        const { stargazers_count, name, forks } = item;
        total.stars[stargazers_count] = { label: name, value: stargazers_count}
        total.forks[forks] = { label: name, value: forks}
        return total
    }, 
    {
      stars :{},
      forks:{}
    }
    );

    stars = Object.values(stars).slice(-5).reverse();
    forks = Object.values(forks).slice(-5).reverse();



    // STEP 2 - Chart Data -- Dummy Data
    // const chartData = [
    //   {
    //     label: "Javascript",
    //     value: "20"
    //   },
    //   {
    //     label: "CSS",
    //     value: "13"
    //   },
    //   {
    //     label: "HTML",
    //     value: "180"
    //   }
    // ];
  return (
    <section className="section">
        <Wrapper className="section-center">
          <Pie3D data={mostUsed}/>
          <Column3D data={stars}/>
          <Doughnut2D data={mostPopular}/>
          <Bar3D data={forks}/>
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
