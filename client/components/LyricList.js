import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';

class LyricList extends Component{

    onLike(id, likes, content){
        console.log(id);
        this.props.mutate({
            variables: {id},
            optimisticResponse: {
                __typename: 'Mutation',
                likeLyric: {
                    content: content,
                    id: id,
                    likes: likes + 1,
                    __typename: 'LyricType',
                }
            }
        })
    }

    renderLyrics(){
        return this.props.lyrics.map(({id, content, likes}) => {
            return(
                <li key={id} className={'collection-item'}>
                    {content}
                    <div className={'vote-box'}> 
                        <i 
                            className={'material-icons'}
                            onClick={() => this.onLike(id, likes, content)}   
                            >thumb_up
                        </i>
                        {likes}
                    </div>
                </li>
            )
        })
    }

    render(){
        return(
            <ul className={'collection'}>
                {this.renderLyrics()}
            </ul>
        )
    }
}

const mutation = gql`
    mutation LikeLyrics($id: ID){
        likeLyric(id: $id){
            id
            likes
            content
        }
}  
`;

export default graphql(mutation)(LyricList);