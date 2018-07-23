import React, { Component } from 'react';
import $ from 'jquery';

// Contains the modal for creating a post.
class CreatePost extends Component {
    constructor() {
        super();
        this.state = {
            title: "",
            content: ""
        }

        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleCreatePost = this.handleCreatePost.bind(this);
    }

    handleTextChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    // Calls the handleFetch function.
    handleCreatePost(event) {
        event.preventDefault();
        this.props.handleFetch("POST", this.state);
        $("#createPostModal").modal('hide');
        this.setState({title: "", content: ""});
    }

    render() {
        return (
            <div>
                <div className="modal fade" id="createPostModal" tabIndex="-1" role="dialog" aria-labelledby="createPostModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="createPostModalLabel">Create Post</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <form onSubmit={this.handleCreatePost}>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <input 
                                            maxLength="255" 
                                            required 
                                            value={this.state.title} 
                                            name="title" onChange={this.handleTextChange} 
                                            type="text" className="form-control" 
                                            placeholder="Post Title">
                                        </input>
                                    </div>
                                    <div className="form-group">
                                        <textarea 
                                            required 
                                            value={this.state.content} 
                                            name="content" 
                                            onChange={this.handleTextChange} 
                                            type="text" 
                                            className="form-control" 
                                            placeholder="Post Content">
                                        </textarea>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="submit" id="saveButton" className="btn btn-primary">Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreatePost;