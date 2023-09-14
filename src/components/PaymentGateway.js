import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'





function PaymentGateway() {
    let navigate = useNavigate()



    // const dispatch = useDispatch()
    let paymentdetails ={}

    const [amount, setAmount] = useState('');
    const [cardholdername, setCardholdername] = useState('');
    const [cardnumber, setCardnumber] = useState('');
    const [expirationdate, setExpirationdate] = useState('');
    const [cvv, setCvv] = useState('');



    const handleChangeItem =(event)=>{
        let name = event.target.name;
        let value = event.target.value;
        switch(name){
            case 'amount' : 
            setAmount(value);
                break;
            case 'cardholdername' : 
            setCardholdername(value);
                break;
            case 'cardnumber' : 
            setCardnumber(value);
                break;
            case 'expirationdate' : 
            setExpirationdate(value);
                break;
            case 'cvv' : 
            setCvv(value);
                break;
            default:
                break;
                
        }
        
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        paymentdetails.amount= amount
        paymentdetails.cardholdername= cardholdername
        paymentdetails.cardnumber= cardnumber
        paymentdetails.expirationdate= expirationdate
        paymentdetails.cvv= cvv
        alert('Tickets purchased')
        
    }

    const cancel=()=>{
     navigate('/cart')
    }
  return (
    <div>
       <form onSubmit={handleSubmit}>
        <div className="col-4 p-5">
        <div className="row mb-2">
                <input type="text" className="form-control" 
                name='amount' value={amount} onChange={handleChangeItem}
                placeholder="Enter Amount" aria-label="First name"/>
            </div>
            <div className="row mb-2">
                <input type="text" className="form-control" 
                name="cardholdername" value={cardholdername} onChange={handleChangeItem} 
                placeholder="Enter Cardholder Name" aria-label="Last name"/>
            </div>
            <div className="row mb-2">
                <input type="text" className="form-control" 
                name="cardnumber" value={cardnumber} onChange={handleChangeItem} 
                placeholder="Enter Card Number" aria-label="Last name"/>
            </div>
            <div className="row mb-2">
                <input type="text" className="form-control" 
                name="expirationdate" value={expirationdate} onChange={handleChangeItem} 
                placeholder="Enter Expiration date (MM/YY)" aria-label="Last name"/>
            </div>
            <div className="row mb-2">
                <input type="text" className="form-control" 
                name='cvv' value={cvv} onChange={handleChangeItem} 
                placeholder="Enter CVV at tha back of the card" aria-label="Last name"/>
            </div>
            <div className='row text-center mb-1'>
            <div className="col-12">
                <button type="submit"
                className="btn btn-primary" onClick={handleSubmit}>Submit</button>
            </div>
        </div>
        <div className='row text-center mb-1'>
            <div className="col-12">
                <button type="submit"
                className="btn btn-primary" onClick={cancel}>Cancel</button>
            </div>
        </div>
        
            
        </div>
        
    </form>
    </div>
  )
}

export default PaymentGateway
