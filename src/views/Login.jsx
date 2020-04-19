import React, { Component } from "react";
import { Grid, Row, Col, FormGroup } from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
const ValidPassRegex = RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/);
const validForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
        (val) => val.length > 0 && (valid = false)
    );
    return valid;
}
class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
             user: null,
             pass: null,
        
            errors: {
                user: '',
                pass: ''
            }
        };
         this.handleChange = this.handleChange.bind(this);
         this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;
        switch (name) {
            case 'user':
                errors.user = value.length < 5 ? 'User Name Must Be Greater Than 5 Character !' : '';
                break;
            case 'pass':
                //errors.pass = value.length < 8 ? 'Password Must Be 8 Character Long !' : '';
                errors.pass = ValidPassRegex.test(value) ? '' : 'Your password must be at least 6 characters long, contain at least one number and have a mixture of uppercase and lowercase letters.';
                break;
            default:
                break;
        }
        this.setState({ errors, [name]: value });
    }
    handleSubmit(event) {
        event.preventDefault();
        if (validForm(this.state.errors)) {
            const data = { user: this.state.user, pass: this.state.pass }

            fetch('/api/createAccount', {
                method: 'POST',

                body: JSON.stringify(data), // data can be `string` or {object}!

                headers: { 'Content-Type': 'application/json' }
            })

                .then(res => res.json())

                .catch(error => console.error('Error:', error))

                .then(response => console.log('Success:', response));
        }else{
            console.log('Invalid Form');
        }
    }
    render() {
        const {errors} = this.state;
        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col md={8}>
                            <FormGroup controlId="formControlsTextarea" bsSize="large">
                                <Card
                                    title="Login"
                                    content={
                                        <form onSubmit={this.handleSubmit}>
                                            <div className="form-group">
                                          <label htmlFor="username">User Name </label>
                                           <input type="text" id="user" name = "user" className="form-control" placeholder="email" onChange={ this.handleChange} noValidate/> <br/>
                                           {errors.user.length > 0 && <span className='error btn btn-danger btn-xs '>{errors.user}</span>}
                                           </div>
                                           <div className="form-group">
                                           <label htmlFor="password">Password </label>
                                           <input type="password"  id = "pass" name = "pass" className="form-control" placeholder="password" onChange={this.handleChange} noValidate/> <br/>
                                           {errors.pass.length > 0 && <span className='error btn btn-danger btn-xs'>{errors.pass}</span>}
                                           </div>
                                           <Button bsStyle="info" type="submit" pullRight round fill >
                                                Login Profile
                                            </Button>
                                            <div className="clearfix" />
                                        </form>
                                    }
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default Login;
