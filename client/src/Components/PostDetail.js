import React, { Component } from 'react';
import $ from 'jquery';

// Handles the UI for editing and deleting a post, and well as showing post details.
class PostDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: 0,
            title: this.props.title,
            content: this.props.content
        };
        this.editPost = this.editPost.bind(this);
        this.postDetails = this.postDetails.bind(this);
        this.deletePost = this.deletePost.bind(this);
        this.changeMode = this.changeMode.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleUpdatePost = this.handleUpdatePost.bind(this);
        this.handleDeletePost = this.handleDeletePost.bind(this);
    }

    // changes whether the UI is in details, edit, or delete mode.
    changeMode(event) {
        this.setState({ mode: parseInt(event.target.name, 10) });
    }

    // Updates the state when user types in the input fields
    handleTextChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    // These functions call handleFetch with their respective methods.
    handleUpdatePost(event) {
        event.preventDefault();
        this.props.handleFetch("PUT", {
            title: this.state.title,
            content: this.state.content,
            pk: this.props.pk
        });
        $(`#postDetailModal${this.props.pk}`).modal('hide');
    }

    handleDeletePost(event) {
        event.preventDefault();
        this.props.handleFetch("DELETE", {
            pk: this.props.pk
        });
        $(`#postDetailModal${this.props.pk}`).modal('hide');
    }

    // UI for deleting a post.
    deletePost() {
        return (
            <div>
                <div className="modal-header">
                    <h5 className="modal-title" id="postDetailModalLabel">Post Details</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <h4>Are You sure you want to delete this post?</h4>
                </div>
                <div className="modal-footer">
                    <button name="1" onClick={this.changeMode} type="button" id="saveButton" className="btn btn-primary mr-auto">Edit</button>
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" onClick={this.handleDeletePost} className="btn btn-danger">Delete</button>
                </div>
            </div>
        )
    }

    // UI for editing a post.
    editPost() {
        return (
            <form onSubmit={this.handleUpdatePost}>
                <div className="modal-header">
                    <h5 className="modal-title" id="postDetailModalLabel">Edit Post</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <div className="form-group">
                        <input maxLength="255" required value={this.state.title} name="title" onChange={this.handleTextChange} type="text" class="form-control" placeholder="Post Title"></input>
                    </div>
                    <div className="form-group">
                        <textarea required value={this.state.content} name="content" onChange={this.handleTextChange} type="text" class="form-control" placeholder="Post Content"></textarea>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" name="2" onClick={this.changeMode} className="btn btn-danger mr-auto">Delete</button>
                    <button type="button" name="0" onClick={this.changeMode} className="btn btn-primary">Details</button>
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="submit" id="saveButton" className="btn btn-primary">Save</button>
                </div>
            </form>
        );
    }

    // UI for post details.
    postDetails() {
        return (
            <div>
                <div className="modal-header">
                    <h5 className="modal-title" id="postDetailModalLabel">Post Details</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <h4 class="text-left">{this.state.title}</h4>
                    <hr></hr>
                    <p class="text-left preserveWhiteSpace">{this.state.content}</p>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button name="1" onClick={this.changeMode} type="button" id="saveButton" className="btn btn-primary">Edit</button>
                </div>
            </div>
        );
    }

    render() {
        // Renders the correct UI based on the mode.
        let renderPart = () => {
            switch (this.state.mode) {
                case 0:
                    return this.postDetails();
                case 1:
                    return this.editPost();
                case 2:
                    return this.deletePost();
                default:
            }
        }

        return (
            <div>
                <div className="modal fade" id={`postDetailModal${this.props.pk}`} tabindex="-1" role="dialog" aria-labelledby="postDetailModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            {renderPart()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PostDetail;