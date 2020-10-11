import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle,  Breadcrumb, BreadcrumbItem } from 'reactstrap'

import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';


function RenderDish(props) {
    return (
        <div></div>
    );
}

function RenderComments(props) {
    return (
        <div></div>
    );
}



const DishDetail = (props) => {
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        )
    }
    else if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        )

    }

    else if (props.dish != null) {
        const dish = props.dish;
        return (
            <div className="container">
            <div className="row">
                <Breadcrumb>

                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>                
            </div>
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <RenderDish dish={props.dish} />
                </div>
                <div className="col-12 col-md-5 m-1">
                    <RenderComments 
                            comments={props.comments} 
                            addComment={props.addComment} 
                            dishId={props.dish.id}/>
                </div>
            </div>
            </div>
        );
    } else {
        return (
            <div>
            </div>
        )
    }
}


export default DishDetail;