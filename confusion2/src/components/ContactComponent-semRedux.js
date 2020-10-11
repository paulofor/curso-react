import React, { Component } from 'react';
import {
    Breadcrumb, BreadcrumbItem, Button, Form,
    FormGroup, Label, Input, Col, FormFeedback
} from 'reactstrap'
import { Link } from 'react-router-dom'

class Contact extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstname : '',
            lastname : '',
            telnum : '' ,
            email : '' ,
            agree: false,
            contactType: 'Tel.',
            message : '',
            touched : {
                firstname : false,
                lastname : false,
                telnum : false,
                email : false,
                message : false,
                contactType : false
            }

        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    handleBlur = (field) => (evt) => {
        this.setState({
            touched : { ...this.state.touched , [field] : true}
        });
    }

    validate(firstname, lastname, telnum, email) {
        const error = {
            firstname : '',
            lastname : '',
            telnum : '' ,
            email : '' ,
        };


        if (this.state.touched.lastname && lastname.length < 3) {
            error.lastname = 'Último nome precisa ser maior que 3 letras'
        } else if (this.state.touched.lastname && lastname.length > 10) {
            error.lastname = 'Último nome precisa ser menor que 10 letras'
        };


        if (this.state.touched.firstname && firstname.length < 3) {
            error.firstname = 'Primeiro nome precisa ser maior que 3 letras'
        } else if (this.state.touched.firstname && firstname.length > 10) {
            error.firstname = 'Primeiro nome precisa ser menor que 10 letras'
        }



        const reg = /^\d+$/;
        if (this.state.touched.telnum && !reg.test(telnum))
            error.telnum = 'Telefone deve conter apenas números';

        if (this.state.touched.email && email.split('').filter(x => x === '@').length !== 1) {
            error.email = 'Deve conter @'
        }

        return error;

    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name] : value
        })
    }

    handleSubmit(event) {
        console.log('State:' , this.state);
        alert('Current State: ' + JSON.stringify(this.state));
        event.preventDefault();
    }


    render() {
        const erros = this.validate(this.state.firstname, this.state.lastname, this.state.telnum, this.state.email);
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Contact Us</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Contact Us</h3>
                        <hr />
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12">
                        <h3>Location Information</h3>
                    </div>
                    <div className="col-12 col-sm-4 offset-sm-1">
                        <h5>Our Address</h5>
                        <address>
                            121, Clear Water Bay Road<br />
                            Clear Water Bay, Kowloon<br />
                            HONG KONG<br />
                            <i className="fa fa-phone"></i>: +852 1234 5678<br />
                            <i className="fa fa-fax"></i>: +852 8765 4321<br />
                            <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
                        </address>
                    </div>
                    <div className="col-12 col-sm-6 offset-sm-1">
                        <h5>Map of our Location</h5>
                    </div>
                    <div className="col-12 col-sm-11 offset-sm-1">
                        <div className="btn-group" role="group">
                            <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                            <a role="button" className="btn btn-info"><i className="fa fa-skype"></i> Skype</a>
                            <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
                        </div>
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12">
                        <h3>Send us Your Feedback</h3>
                    </div>
                    <div className="col-12 col-md-9">
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Label htmlFor="firstname" md={2}>
                                    First Name
                                </Label>
                                <Col md={10}>
                                    <Input type="text" id="firstname" name="firstname" 
                                        valid={erros.firstname === ''}
                                        invalid={erros.firstname !== ''}
                                        onChange={this.handleInputChange}
                                        onBlur={this.handleBlur('firstname')}
                                        placeholder="Primeiro Nome" value={this.state.firstname}></Input>
                                        <FormFeedback>{erros.firstname}</FormFeedback>
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label htmlFor="lastname" md={2}>
                                    Last Name
                                </Label>
                                <Col md={10}>
                                    <Input type="text" id="lastname" name="lastname" 
                                        valid={erros.lastname === ''}
                                        invalid={erros.lastname !== ''}
                                        onChange={this.handleInputChange}
                                        onBlur={this.handleBlur('lastname')}
                                        placeholder="Último Nome" value={this.state.lastname}></Input>
                                    <FormFeedback>{erros.lastname}</FormFeedback>
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label htmlFor="telnum" md={2}>
                                    Telefone de contato
                                </Label>
                                <Col md={10}>
                                    <Input type="tel" id="telnum" name="telnum" 
                                        valid={erros.telnum === ''}
                                        invalid={erros.telnum !== ''}
                                        onChange={this.handleInputChange}
                                        onBlur={this.handleBlur('telnum')}
                                        placeholder="Tel. Contato" value={this.state.telnum}></Input>
                                    <FormFeedback>{erros.telnum}</FormFeedback>
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label htmlFor="email" md={2}>
                                    Email
                                </Label>
                                <Col md={10}>
                                    <Input type="email" id="email" name="email" 
                                        onChange={this.handleInputChange}
                                        onBlur={this.handleBlur('email')}
                                        placeholder="Email" value={this.state.email}></Input>
                                    <FormFeedback>{erros.email}</FormFeedback>
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Col md={{size: 6, offset: 2}}>
                                    <FormGroup check>
                                        <Label check>
                                            <Input onChange={this.handleInputChange} type="checkbox" name="agree" checked="{this.state.agree}"/>{' '}
                                            <strong>May we contact you ?</strong>
                                        </Label>
                                    </FormGroup>
                                </Col>
                                <Col md={{size: 3, offset: 1}}>
                                    <Input onChange={this.handleInputChange} type="select" name="contactType" value={this.state.contactType}>
                                        <option>Tel.</option>
                                        <option>Email</option>
                                    </Input>
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label htmlFor="message" md={2}>
                                    Mensagem
                                </Label>
                                <Col md={10}>
                                    <Input onChange={this.handleInputChange} type="textarea" id="message" name="message" rows="12" value={this.state.message}/>

                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Col md={{size:10, offset:2}}>
                                    <Button type="submit" color="primary">Enviar</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }



}

export default Contact;