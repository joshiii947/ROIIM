import React from 'react'
import Header from './Header'
import './styles.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import qs from 'qs'


class Checkout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            firstname: "",
            lastname:"",
            email: "",
            contactNo: "",
            state: "",
            city:"",
            country:"",
            amount:''
        }
    }
    componentDidMount=()=>{
        this.setState({
            amount:this.props.match.params.id
        })
    }


    handleChange=(event)=>{
        this.setState({
            [event.target.name]:event.target.value
        })
    }


     handleSubmit = (event) => {
       event.preventDefault()
       let firstName=this.state.firstname
       let lastName=this.state.lastname
       let email=this.state.email
        
    
        window.paysafe.checkout.setup("cHVibGljLTc3NTE6Qi1xYTItMC01ZjAzMWNiZS0wLTMwMmQwMjE1MDA4OTBlZjI2MjI5NjU2M2FjY2QxY2I0YWFiNzkwMzIzZDJmZDU3MGQzMDIxNDUxMGJjZGFjZGFhNGYwM2Y1OTQ3N2VlZjEzZjJhZjVhZDEzZTMwNDQ=", {
            "currency": "USD",
            "amount": parseInt(this.state.amount),
            "locale": "en_US",
            "customer": {
                "firstName": firstName,
                "lastName": lastName,
                "email": email,
                "phone": "1234567890",
                "dateOfBirth": {
                    "day": 1,
                    "month": 7,
                    "year": 1990
                }
            },
            "billingAddress": {
                "nickName": "John Dee",
                "street": "20735 Stevens Creek Blvd",
                "street2": "Montessori",
                "city": "Cupertino",
                "zip": "95014",
                "country": "US",
                "state": "CA"
            },
            "environment": "TEST",
            "merchantRefNum": "1559900597607",
            "canEditAmount": true,
            "merchantDescriptor": {   
                "dynamicDescriptor": "XYZ",
                "phone": "1234567890"
                },
            "displayPaymentMethods":["skrill","card"],
            "paymentMethodDetails": {
                "paysafecard": {
                    "consumerId": "1232323"
                },
                "paysafecash": {
                    "consumerId": "123456"
                },
                "sightline": {
                    "consumerId": "123456",
                    "SSN": "123456789",
                    "last4ssn": "6789",
                    "accountId":"1009688222"
                },
                "vippreferred":{
                    "consumerId": "550726575",
                    "accountId":"1679688456"
                }
            }
        }, function(instance, error, result) {
            if (result && result.paymentHandleToken) {
                console.log(result)
                console.log(result.paymentHandleToken);
                // make AJAX call to Payments API
                const requestbody={
                    token:result.paymentHandleToken,
                    amount:result.amount
                }

                const config = {
                    headers: {
                      'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }

                axios.post('http://localhost:8080/payment/addresponse',requestbody,config)
                .then((result)=>{
                    if(result['data']=='COMPLETED'){
                        instance.showSuccessScreen('Payment SUCCESSFULL')
                    }
                    else{
                        instance.showFailureScreen('Payment was declied .Try again with same or another payment method')
                    }
                    setTimeout(window.location.replace('/'),5000);
                })
                .catch((err)=>console.log(err))
                
            } else {
                console.error(error);
                // Handle the error
                alert('Error'+error.detailedMessage)
            }
        }, function(stage, expired) {
            switch(stage) {
                case "PAYMENT_HANDLE_NOT_CREATED": // Handle the scenario
                case "PAYMENT_HANDLE_CREATED": // Handle the scenario
                case "PAYMENT_HANDLE_REDIRECT": // Handle the scenario
                case "PAYMENT_HANDLE_PAYABLE": // Handle the scenario
                default: // Handle the scenario
            }
        });

}    

    render() {

        return (
            <>

                <Header />

                <div className="container">

                    <nav>
                        <ol class="breadcrumb">
                            <li className="breadcrumb-item " aria-current="page"><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Checkout</li>
                        </ol>
                    </nav>

                    <h5 >Total Amount :{this.props.match.params.id} </h5>

                    <div className="col-md-8">
                        <form>
                            <div className="form-group">
                                <label htmlFor="name">FirstName</label>
                                <input type="text" className="form-control" name="firstname" value={this.state.firstname} onChange={this.handleChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastname">LastName</label>
                                <input type="text" className="form-control" name="lastname" value={this.state.lastname} onChange={this.handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" className="form-control" name="email" value={this.state.email} onChange={this.handleChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Phone no</label>
                                <input type="number" className="form-control" name="contactNo" value={this.state.contactNo} onChange={this.handleChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="city">City</label>
                                <input type="text" className="form-control" name="city" value={this.state.city} onChange={this.handleChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="country">Country</label>
                                <input type="text" className="form-control" name="country" value={this.state.country} onChange={this.handleChange} required />
                            </div>
                            
                            <button type="button" className="btn btn-success" onClick={this.handleSubmit}>SUBMIT</button>
                        </form>
                    </div>
                </div>

            </>
        )
    }
}

export default Checkout;