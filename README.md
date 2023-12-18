# [WorkshelfFrontend](https://master.d1ub3efs995f8a.amplifyapp.com/)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.5.

# Movie and Series App

This Angular application interacts with The Movie Database (TMDb) API, providing information about movies and series. You can explore popular lists, get specific details, and perform searches.

## Configuration

### Get a TMDb API Key

Before using the application, you'll need a valid API key from TMDb. Follow these steps:

1. Sign up at [TMDb Developer](https://www.themoviedb.org/settings/api).
2. Copy your generated API key.

### Set Up API Key

Update the `api-constants.ts` file with your API key:

// api-constants.ts

export const API_KEY = 'YOUR_API_KEY';
export const API_URL = 'https://api.themoviedb.org/3';


### Custom Methods

  getSeries(): Observable<any> {
    const url = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&page=1`;
    return this.http.get<any[]>(url);
  }
  
  getMovies(): Observable<any> {
    const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=b1138baa2f255e1ed451defcd6454564`;
    return this.http.get<any[]>(url);
  }

  getMovieById(id:any):Observable<any>{
    return this.http.get("https://api.themoviedb.org/3/movie/"+id+"?api_key=b1138baa2f255e1ed451defcd6454564")
  }

  getMovieDetails(movieId: string): Observable<Movie> {
    const url = `https://api.themoviedb.org/3/movie/"+id+"?api_key=b1138baa2f255e1ed451defcd6454564`;
    return this.http.get<Movie>(url);
  }

  getSeriesDetails(seriesId: string): Observable<Series> {
    const url = `${API_URL}/tv/${seriesId}?api_key=${API_KEY}`;
    return this.http.get<Series>(url);
  }

  getPopularMovies(): Observable<any> {
    const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=b1138baa2f255e1ed451defcd6454564`;
    return this.http.get<any[]>(url);
  }

  getPopularSeries(): Observable<any> {
    const url = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=b1138baa2f255e1ed451defcd6454564`;
    return this.http.get<any[]>(url);
  }
