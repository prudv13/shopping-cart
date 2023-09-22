import React from 'react'
import { Button, Card } from 'react-bootstrap';
import Rating from './Rating';
import { CartState } from '../context/Context';

const SingleProduct = ({product}) => {

  const {state: {cart}, dispatch} = CartState()
  return (
    <div className='products'>
      <Card>
      <Card.Img variant='top' src={product.image} alt={product.name} />
      <Card.Body className='py-4'>
        <Card.Title>{product.name}</Card.Title>
        <Card.Subtitle style={{paddingBottom: 10}}>
          <span>₹ {product.price.split(".")[0]}</span>
          {product.fastDelivery ? (
            <div>Fast Delivery</div>
            ) : (
              <div>4 days delivery</div>
            )
          }
          <Rating rating={product.ratings} />
        </Card.Subtitle>
        {
          cart.some(p => p.id === product.id) ?
          (
            <Button 
              variant="danger"
              onClick={() => dispatch({type: 'REMOVE_FROM_CART', payload: product})}
            >Remove from cart</Button>)
          : (
            <Button 
              disabled={!product.inStock} 
              variant="primary"
              onClick={() => dispatch({type: 'ADD_TO_CART', payload: product})}
            >
            {!product.inStock ? "Out of Stock" : "Add to Cart"}
            </Button>
          )
        }
        
      </Card.Body>
      </Card>
    </div>
  )
}

export default SingleProduct;