import React from 'react';
import { ProductList } from './ProductList';
import './styles.css'
import Header from './Header'
import { Link } from 'react-router-dom'


class Product extends React.Component {



    render() {

        const list = ProductList && ProductList.map((item, index) => {
            return (
                <div key={index}>
                    <div className="col-md-4 col-sm-6">
                        <div className="card">
                            <img className="card-img-top" src={item.image} alt={item.name} width="100%" className="image-width" />
                            <div className="card-body">
                                <div className="card-title"><b>Product</b> : {item.name} </div>
                                <div className="card-title"><b>Rating</b> :{item.rating} </div>
                                <div className="card-title"><b>Description</b> : {item.description}</div>
                                <div className="card-title"><b>Price</b>:{item.price} </div>
                                <Link to={`/checkout/${item.price}`}><button type="button" className="btn btn-success">Checkout</button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })

        return (

            <>
                <Header />


                <div className="container">

                    <nav>
                        <ol class="breadcrumb">
                            <li className="breadcrumb-item active" aria-current="page">Home</li>
                        </ol>
                    </nav>

                    <div className="row">
                        {list}
                    </div>
                </div>

            </>
        )
    }
}

export default Product;