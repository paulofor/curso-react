import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Contact from './ContactComponent';
//import { DISHES } from '../shared/dishes';
//import { COMMENTS } from '../shared/comments';
//import { LEADERS } from '../shared/leaders';
//import { PROMOTIONS } from '../shared/promotions';

import { postComment, fetchComments, fetchDishes, fetchPromos } from '../redux/ActionCreator'
import { actions } from 'react-redux-form'

import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { TransitionGroup, CSSTransition } from 'react-transition-group'

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      leaders: state.leaders,
      promotions: state.promotions
    }
}

const mapDispatchToProps = (dispatch) => ({
    postComment : (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
    fetchDishes: () => {dispatch(fetchDishes())},
    resetFeedbackForm: () => {dispatch(actions.reset('feedback'))},
    fetchPromos: () => {dispatch(fetchPromos())},
    fetchComments: () => { dispatch(fetchComments())}
})


class Main extends Component {

 

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchPromos();
    this.props.fetchComments();
  }


  render() {
    const HomePage = () => {
      console.log('Dish1' , this.props.dishes);
      //console.log('Dish2' ,this.props.dishes.filter((dish) => dish.featured)[0]);
      return (
        <Home 
        dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]} 
        dishesLoading={this.props.dishes.isLoading}
        dishesErrMess={this.props.dishes.errMess}

        promotion={this.props.promotions.promotions.filter((promotion) => promotion.featured)[0]}
        promosLoading={this.props.promotions.isLoading}
        promosErrMess={this.props.promotions.errMess}

        leader={this.props.leaders.filter((leader) => leader.featured)[0]}/>
      )
    }

    const DishWithId = ({match}) => {
      return (
        <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10) )[0]}
        isLoading={this.props.dishes.isLoading}
        errMess={this.props.dishes.errMess}
        comment={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10)[0] )}
        commentsLoading={this.props.comments.isLoading}
        commentsErrMess={this.props.comments.errMess}
        postComment={this.props.postComment}
        />
      )
    }

    return (
      <div>
        <Header />
        <TransitionGroup>
            <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
              <Switch location={this.props.location}>
                  <Route path='/home' component={HomePage} />
                  <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
                  <Route path='/menu/:dishId' component={DishWithId} />
                  <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
                  <Redirect to="/home" />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));
