import React, { Component } from 'react';
import axios from '../../../axios';

import Post from '../../../components/Post/Post';
import classes from './Posts.css';

class Posts extends Component {
    state = {
        posts: []
    }

    componentDidMount() {
        axios.get('/posts')
            .then(response => {
                //console.log(response.data);
                // get only the first 6 posts and store them in posts constant
                const posts = response.data.slice(0,6);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post, // distribute the properties of the post
                        author: 'John Rambo' // hardcode the author's name
                    }
                })

                this.setState({ posts: updatedPosts });
            })
            .catch(error => {
                console.log(error);
                // this.setState({ error: true })
            })
    }

    postSelectedHandler = (id) => {
        this.setState({ selectedPostId: id });
    }

    render () {
        let posts = <p style={{textAlign:'center'}}>Something went wrong!</p>   
        // if there's no error, display the post
        if(!this.state.error) {
            posts = this.state.posts.map(post => {
                return (
                    <Post 
                        key={post.id} 
                        title={post.title} 
                        author={post.author}
                        clicked={() => this.postSelectedHandler(post.id)}/>
                )
            })
        }
        return (
            <section className="Posts">
                {posts}
            </section>
        )
    }
}

export default Posts;