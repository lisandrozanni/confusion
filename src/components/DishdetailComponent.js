import React, { Component } from 'react';
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Col,
  Row
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

function RenderDish({ dish }) {
  return (
    <div className="col-12 col-md-5 m-1">
      <FadeTransform
        in
        transformProps={{
          exitTransform: 'scale(0.5) translateY(-50%)'
        }}>
        <Card>
          <CardImg top src={baseUrl + dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      </FadeTransform>
    </div>
  );
}

function RenderComments({ comments, postComment, dishId }) {
  return (
    <div className="col-12 col-md-5 m-1">
      <ul className="list-unstyled">
        <h4>{'Comments'}</h4>
          <Stagger in>
            {comments.map(comment => {
              return (
                <Fade in key={comment.id}>
                  <li>
                    <p>{comment.comment}</p>
                    <p>{'-- ' + comment.author + ', '}  
                    {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                  </li>
                </Fade>
              );
            })}
          </Stagger>
          <CommentForm dishId={dishId} postComment={postComment} />
      </ul>
    </div>
  );
}

const minLength = len => val => val && (val.length >= len);
const maxLength = len => val => !val || (val.length <= len);

// function maxLength(len) {
//   return function(val) {
//     return !val || (val.length <= len);
//   }
// }

class CommentForm extends Component {
  state = {
    isOpen: false
  }
  
  toggleModal = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  handleLogin = values => {
    this.toggleModal();
    this.props.postComment(this.props.dishId, values.rating, values.name, values.comment);
  }
  
  render() {
    return (
      <div>
        <Button outline onClick={this.toggleModal}><span className="fa fa-pencil"></span> Submit Comment</Button>

        <Modal isOpen={this.state.isOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={values => this.handleLogin(values)}>
                <Col className="form-group">
                  <Row>
                    <Label htmlFor="rating">Rating</Label>
                  </Row>
                  <Row>
                    <Control.select model=".rating" id="rating" className="form-control">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </Control.select>
                  </Row>
                </Col>
                <Col className="form-group">
                  <Row>
                    <Label htmlFor="name">Your Name</Label>
                  </Row>
                  <Row>
                    <Control.text model=".name" placeholder="Your Name" id="name" className="form-control"
                      validators={{
                        minLength: minLength(3),
                        maxLength: maxLength(15)
                      }}
                    />
                    <Errors
                      className="text-danger"
                      model=".name"
                      show="touched"
                      messages={{
                        minLength: 'Must be greater than 2 characters',
                        maxLength: 'Must be 15 characters or less'
                      }}
                    />
                  </Row>
                </Col>
                <Col className="form-group">
                  <Row>
                    <Label htmlFor="comment">Comment</Label>
                  </Row>
                  <Row>
                    <Control.textarea model=".comment" id="comment" className="form-control" rows="6" />
                  </Row>
                </Col>
              <Button type="submit" value="submit" color="primary">Submit</Button>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

function DishDetail({ dish, comments, postComment, isLoading, errMess }) {
  if (dish === undefined) return <div></div>;

  if (isLoading) {
    return (
      <div className="container">
        <div className="row">            
          <Loading />
        </div>
      </div>
    );
  } else if (errMess) {
    return (
      <div className="container">
        <div className="row">            
          <h4>{errMess}</h4>
        </div>
      </div>
    );
  } else if (dish != null)

  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
          <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>{dish.name}</h3>
          <hr />
        </div>                
      </div>
      <div className="row">
        <RenderDish dish={dish} />
        <RenderComments
          comments={comments}
          postComment={postComment}
          dishId={dish.id}
        />
      </div>
    </div>
  );
}

export default DishDetail;
