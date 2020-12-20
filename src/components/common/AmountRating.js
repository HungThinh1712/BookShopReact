import React from 'react';

const AmountRating = (props) => {
    return (
        <div style={{padding:'5px'}} >
				<div style={{display:'flex',flexDirection:'row'}}>
					<div style={{marginTop:'-5px'}}>
						{props.value} 
					</div>
					{props.value===1 ? <div style={{marginRight:'3px',marginTop:'-2px'}} className="fa fa-star checked"></div> : <div style={{}} className="fa fa-star checked"></div>}
					<div  style={{width:'10vw'}}>
						<div className="progress" style={{height:'8px', marginTop:'3px',marginLeft:'5px'}}>
						  <div className="progress-bar progress-bar-success" role="progressbar" aria-valuenow="7" aria-valuemin="0" aria-valuemax="10" style={{width:`${props.amount}%`}}>
						  </div>
						</div>
					</div>
					<div style={{marginLeft:'10px',marginTop:'-4px'}}>{props.amount}</div>
				</div>
			</div>
    );
};

export default AmountRating;