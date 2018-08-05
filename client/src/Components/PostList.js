import React, { Component } from 'react';
import CreatePost from './CreatePost';
import Post from './Post';

// Container for the post list
class PostList extends Component {
    constructor() {
        super();
        this.state = {
            posts: [] // Array of post objects. Each object should have: title, content, created, and pk.
        };
        this.handleFetch = this.handleFetch.bind(this);
    }

    // Sends http requests to the server. The method and data is dependent on 
    // where the function was called. Can accept get, post, put, and delete.
    handleFetch(method, data) {
        let options = {
            method: method,
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        }

        if (method === "GET") delete options.body;

        fetch("/api/posts/", options)
            .then(res => res.json())
            .then(obj => {
                if (method === "POST") { // If the request was successful...
                    this.setState({ posts: [...this.state.posts, obj] })
                } else if (method === "GET") {
                    this.setState({ posts: obj })
                } else if (method === "PUT") {
                    this.setState((prev) => {
                        prev.posts[prev.posts.findIndex(item => item.pk === obj.pk)] = obj;
                        return prev;
                    });
                } else if (method === "DELETE") {
                    this.setState((prev) => {
                        let index = prev.posts.findIndex(item => item.pk === obj.pk);
                        prev.posts.splice(index, 1);
                        return prev;
                   });
                } else {
                    alert("Invalid Method"); // If an invalid method is used...
                }
            })
            .catch(() => alert("Something went wrong")); // If there was a server error...
    }

    // Called when component renders.
    componentDidMount() {
        this.handleFetch("GET");
    }

    render() {
        return (
            <div>
                <div className="container text-center">
                    <div className="jumbotron text-center">
                        <CreatePost handleFetch={this.handleFetch} />
                        <h1>My Blog</h1>
                        <br></br>
                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#createPostModal">
                            Create Post
                        </button>
                        <div className="container pullMargin">
                            <br></br>
                            <div className="row">
                                <div className="col-7 text-left">Post Title</div>
                                <div className="col-5 text-right">Date Created</div>
                            </div>
                        </div>
                        <hr></hr>
                        {this.state.posts.length > 0 ?
                            <div className="postContainer">
                                {this.state.posts.map(
                                    item => <Post 
                                    key={item.pk} 
                                    pk={item.pk}
                                    content={item.content} 
                                    created={item.created} 
                                    title={item.title} 
                                    handleFetch={this.handleFetch} 
                                    />).reverse()}
                            </div>
                            :
                            <h4>No posts have been created</h4>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default PostList;