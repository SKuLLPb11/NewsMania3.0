import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
        return (
            <div className="card my-3" id="card-col" style={{ height: "28rem", width: "20rem" }}>
                <img src={imageUrl} style={{ height: 200 }} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}...</h5>
                    <p className="card-text">{description}...</p>
                    <div>
                    <p className="card-text"><small className="text-muted">By {author ? author : "Unknown"} at {new Date(date).toGMTString()}</small></p>
                    </div>
                    

                       
                        <div  id="source" >
                        <span  class="translate badge rounded-pill bg-light" id="text-c">
                        {source}
                        </span>
                        </div>
                        <a href={newsUrl} target="_blank" id="btn-align" className="btn btn-dark">Read More</a>
                </div>
            </div>
        )
    }
}

export default NewsItem
