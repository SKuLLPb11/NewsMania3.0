import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import propTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {

    static defaultProps =
        {
            country: 'in',
            pageSize: 8,
            category: 'general',
        }
    static propTypes = {
        country: propTypes.string,
        pageSize: propTypes.number,
        category: propTypes.string,

    }
    capitalizeFirstLowercaseRest = str => {
        return (
            str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
        );
    };
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults:0
        }
        document.title = `${this.capitalizeFirstLowercaseRest(this.props.category)}-NewsMania`;
    }
    fetchMoreData = async() => {
        this.setState({page: this.state.page+1})
         let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&category=${this.props.category}&apiKey=ae77e307149e4774a0bbf7ee7bddedcb&
         
         
         page=1&pageSize=${this.props.pageSize}`;
        
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        this.setState({ 
            articles: this.state.articles.concat(parsedData.articles), 
            totalResults: parsedData.totalResults,loading:false })
      

      };
    async updateNews() {
        this.props.setProgress(0);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&category=${this.props.category}&apiKey=ae77e307149e4774a0bbf7ee7bddedcb&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false })
        this.props.setProgress(100);
    }

    async componentDidMount() {
        this.updateNews();
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&category=${this.props.category}&apiKey=ae77e307149e4774a0bbf7ee7bddedcb&page=1&pageSize=${this.props.pageSize}`;
        // this.setState({ loading: true });
        // let data = await fetch(url);
        // let parsedData = await data.json()
        // console.log(parsedData);
        // this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults,loading:false })
    }

    handlePrevClick = async () => {
        // console.log("Previous");
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ae77e307149e4774a0bbf7ee7bddedcb&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        // this.setState({ loading: true });
        // let data = await fetch(url);
        // let parsedData = await data.json()
        // console.log(parsedData);
        // this.setState({
        //     page: this.state.page - 1,
        //     articles: parsedData.articles,
        //     loading: false
        // })
        // this.setState({ page: this.state.page - 1 })
        // this.updateNews();

    }

    handleNextClick = async () => {
        // if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / 20))) {
        //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ae77e307149e4774a0bbf7ee7bddedcb&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        //     this.setState({ loading: true });
        //     let data = await fetch(url);
        //     let parsedData = await data.json()
        //     console.log(parsedData);
        //     this.setState({
        //         page: this.state.page + 1,
        //         articles: parsedData.articles,
        //         loading: false
        //     })

        // }
        this.setState({ page: this.state.page + 1 })
        this.updateNews();
    }

    render() {
        return (
            <div className="container my-3 ">
                <h1 style={{marginTop : '56px'}}className="text-center" id="title-col">NewsMania - Top  {this.capitalizeFirstLowercaseRest(this.props.category)} Headlines </h1>
                {this.state.loading && <Spinner/>}
                <div className="container" id="scroll">
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner/>}
                >
                    <div className="row">
                        {!this.state.loading && this.state.articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 80) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                </InfiniteScroll>
                </div>
                <div className="container d-flex justify-content-between " id="bt-al" >
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>

            </div>
        )
    }
}


export default News
