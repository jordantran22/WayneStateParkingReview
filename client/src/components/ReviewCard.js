import React from 'react';
import ReactStars from 'react-stars';

const QuickViewCard = () => {
    return (
        <div className="review-card">
            {/* <img src={structure.image} /> */}
            <div className='review-card__reviewer-info'>
                <div className='placeholder-profile-picture'></div>
                <h3>placeholder</h3> {/* placeholder reviewer name */}
                <div className='rating'>
                    <ReactStars color2={"var(--clr-WSU-dark-gold)"} color1={"#E5E5E5"} count={5} size={30} edit={false} value={4.5} />
                    <span className='rating__count'>03/24/2022</span>
                </div>
            </div>
            <div className="review-card__review">{/*reviewInfo.text*/}
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla consectetur 
                imperdiet nulla, sit amet pharetra est vulputate vitae. Quisque tincidunt nulla 
                a congue sagittis. Cras volutpat lacus ut elit convallis, vel elementum justo viverra. 
                Aliquam dictum posuere libero, at faucibus nisl feugiat eu."
            </div>
        </div>
    )
}

export default QuickViewCard