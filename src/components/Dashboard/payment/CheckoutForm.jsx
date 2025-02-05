
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { axiosSecure } from '../../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';

const CheckoutForm = () => {
    const stripe = useStripe();
  const elements = useElements();
  const [clientSecret,setClientSecret] = useState('')
  
  const {user} = useContext(AuthContext)
  const {id} = useParams()
  const {data: property = []
    ,isLoading,refetch} = useQuery({
    queryKey:['plant',id],
    queryFn: async ()=>{
      const {data} = await axios(`${import.meta.env.VITE_API_URL}/purchase/${id}`)
      return data
    }
    
  }

)
const price = parseInt(property.price);
useEffect(()=>{
  axiosSecure.post('/create-payment-intent',{price:price})
  .then(res =>{
    console.log(res.data.clientSecret);
    setClientSecret(res.data.clientSecret)
  })
},[axiosSecure,price])



    const handleSubmit = async e =>{
        e.preventDefault();
        if(!stripe || !elements){
            return 
        }
        const card = elements.getElement(CardElement)
        if (card === null) {
            return;
          }
          const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card,
          });

          if(error){
            console.log('payment error', error);
          }
          else{
            console.log('payment methode', paymentMethod);
          }
        //   confirm payment
        const {paymentIntent, error : confirmError} = await stripe.confirmCardPayment(clientSecret, {
            payment_method : {
                card : card,
                billing_details : {
                    email : user?.email || 'annonimous',
                    name: user?.displayName || 'annonimous'
                } 
            }
        })
        if(confirmError){
            console.log('confirm error');
        }
        else{
            console.log('payment intent',paymentIntent);
            if(paymentIntent.status === 'succeeded'){
              toast.success(`Payment Successful. Transection Id : ${paymentIntent.id}`)
              // save in the database
              const payment = {
                propertyName : property?.propertyName,
                location : property?.location,
                buyerName : user?.displayName,
                agentEmail:property?.agentEmail,
                email : user?.email,
                price : price,
                transectionId : paymentIntent.id,
                date : new Date(),
                status:'bought'
              }
              try{
                await axios.post(`${import.meta.env.VITE_API_URL}/payment`, payment)
            toast.success('payment added successfully')
            }catch(err){
                console.log(err);
            }
            }
        }

    }
    return (
        <form onSubmit={handleSubmit}>
           <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button className='btn btn-primary my-4' type="submit" disabled={!stripe}>
        Pay
      </button>
        </form>
    );
};

export default CheckoutForm;