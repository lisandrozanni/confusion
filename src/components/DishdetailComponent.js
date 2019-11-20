import React, { Component } from 'react';
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText
} from 'reactstrap';

class DishDetail extends Component {
  renderDish(dish) {
    return (
      <div className="col-12 col-md-5 m-1">
        <Card>
          <CardImg top src={dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      </div>
    );
  }

  renderComments(comments) {
    return (
      <div className="col-12 col-md-5 m-1">
        <ul className="list-unstyled">
          <h4>{'Comments'}</h4>
            {comments.map(comment => {
              return (
                <li key={comment.id}>
                  <p>{comment.comment}</p>
                  <p>{'-- ' + comment.author + ', '}  
                  {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                </li>
              );
            })}
        </ul>
      </div>
    );
  }

  render() {
    if (this.props.dish === undefined) return <div></div>;

    return (
      <div className="container">
        <div className="row">
          {this.renderDish(this.props.dish)}
          {this.renderComments(this.props.dish.comments)}
        </div>
      </div>
    );
  }
}

export default DishDetail;
