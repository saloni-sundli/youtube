import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI, 
  dangerouslyAllowBrowser: true
});

export default openai;

/* const handleGPTSearchClick = async () => {

    const gptQuery =
      "Act as a Movie Recommendation system and suggest some movies for the query : " +
      searchText.current.value +
      ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: harry potter, blade runner, mission impossible, inception, shutter island";
    const gptResults = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-3.5-turbo",
    });

    if (!gptResults.choices) {
      console.log("error");
    } // TODO: write error handling ...

    const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");

    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie)); // ! array of promises 

    const tmdbResults = await Promise.all(promiseArray);

    localStorage.setItem("gpt",JSON.stringify({movieNames:gptMovies, movieResults:tmdbResults}));

    console.log(tmdbResults)
    console.log(gptMovies)

    dispatch(addGptMovieResult({movieNames:gptMovies, movieResults:tmdbResults}));
  }; */